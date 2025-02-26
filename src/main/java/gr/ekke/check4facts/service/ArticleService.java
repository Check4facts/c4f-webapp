package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.domain.CategorizedArticles;
import gr.ekke.check4facts.domain.Category;
import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.domain.utils.GreekToSeoFriendlyUrl;
import gr.ekke.check4facts.repository.ArticleRepository;
import gr.ekke.check4facts.repository.CategoryRepository;
import gr.ekke.check4facts.repository.search.ArticleSearchRepository;
import gr.ekke.check4facts.service.dto.ArticleDTO;
import net.coobird.thumbnailator.Thumbnails;

import org.apache.lucene.search.TermQuery;
import org.elasticsearch.index.query.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Article}.
 */
@Service
@Transactional
public class ArticleService {

    private final Logger log = LoggerFactory.getLogger(ArticleService.class);

    private final ArticleRepository articleRepository;

    private final EntityManager em;

    private final ArticleSearchRepository articleSearchRepository;

    private final CategoryRepository categoryRepository;

    public ArticleService(ArticleRepository articleRepository, ArticleSearchRepository articleSearchRepository,
            EntityManager em, CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.articleSearchRepository = articleSearchRepository;
        this.categoryRepository = categoryRepository;
        this.em = em;
    }

    /**
     * Save a article.
     *
     * @param article the entity to save.
     * @return the persisted entity.
     */
    public Article save(Article article) {
        log.debug("Request to save Article : {}", article);

        if (article.getPreviewImage() != null) {
            article.setPreviewImage(processImage(article.getPreviewImage(), false));
            article.setImageThumbPreview(processImage(article.getPreviewImage(), true));
        } else {
            article.setPreviewImage(null);
            article.setImageThumbPreview(null);
        }
        article.setPreviewImageContentType("image/webp");
        article.setGreeklish(GreekToSeoFriendlyUrl.convert(article.getPreviewTitle()));

        Article result = articleRepository.saveAndFlush(article);
        em.refresh(result);
        articleSearchRepository.saveCustom(result);
        return result;
    }

    private byte[] processImage(byte[] imageBytes, Boolean type) {

        try {
            float thumbQuality = 0.8f;
            float quality = 0.8f; // Adjust the quality factor as needed (0.0f to 1.0f)

            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            BufferedImage originalImage = ImageIO.read(inputStream);

            if (type) {
                Thumbnails.of(originalImage)
                        .height(600)
                        .outputQuality(thumbQuality)
                        .outputFormat("webp")
                        .toOutputStream(baos);
            } else {
                Thumbnails.of(originalImage)
                        .scale(1)
                        .outputQuality(quality)
                        .outputFormat("webp")
                        .toOutputStream(baos);
            }
            return baos.toByteArray();

        } catch (IOException e) {
            // Handle the exception appropriately
            // For example, log the error or throw a custom exception
            e.printStackTrace();
            return imageBytes; // Return the original image if processing fails
        }
    }

    /**
     * Get all the articles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> findAll(Pageable pageable) {
        log.debug("Request to get all Articles");
        return articleRepository.findAll(pageable);
    }

    /**
     * Get 8 articles per category.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CategorizedArticles> findFrontPageArticles() {
        log.debug("Request to get front Page Articles");
        List<CategorizedArticles> categorizedArticles = new ArrayList();
        // Get All categories
        List<Category> categoryNames = categoryRepository.findAll();
        // Find first 6 articles of each category and add them to a list
        categoryNames.forEach(cat -> {
            List<Article> listArt = new ArrayList<Article>();
            for (Article article : articleRepository
                    .findTop4LatestArticlesByCategoryName(cat.getName(), PageRequest.of(0, 4))) {
                listArt.add(getFilteredArticle(article));
            }
            categorizedArticles.add(new CategorizedArticles(cat.getName(), listArt));
        });
        return categorizedArticles;
    }

    /**
     * Search for 8 articles per category.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CategorizedArticles> searchFrontPageArticles(String query, Pageable pageable, Boolean published) {
        log.debug("Request to get front Page Articles");
        List<CategorizedArticles> categorizedArticles = new ArrayList<>();
        // Get All categories
        List<Category> categoryNames = categoryRepository.findAll();
        // Find first 6 articles of each category and add them to a list
        categoryNames.forEach(cat -> {
            categorizedArticles.add(new CategorizedArticles(cat.getName(),
                    searchInCategory(cat.getName(), published, query, pageable).toList().stream()
                            .map(article -> articleRepository.findById(article.getId()))
                            .filter(Optional::isPresent)
                            .map(Optional::get)
                            .map(this::getFilteredArticle)
                            .collect(Collectors.toList())));
        });
        return categorizedArticles;
    }

    /**
     * Search for suggestions based on user input.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Article> searchForSuggestions(String query) {
        MultiMatchQueryBuilder queryBuilder;
        queryBuilder = multiMatchQuery(query)
                .field("previewTitle", 2).field("previewText");
        BoolQueryBuilder boolQueryBuilder = boolQuery().must(queryBuilder)
                .must(termQuery("published", true));
        List<Article> suggestedArticles = StreamSupport.stream(articleSearchRepository.search(boolQueryBuilder).spliterator(), false)
                .map(this::getFilteredSuggestion)
                .collect(Collectors.toList());
        return suggestedArticles;
    }

    /**
     * Get one article by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Article> findOne(Long id) {
        log.debug("Request to get Article : {}", id);
        return articleRepository.findById(id);
    }

    /**
     * Get one article by greeklish.
     *
     * @param greeklish the greeklish of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Article> findByGreeklish(String greeklish) {
        log.debug("Request to get Article with greeklish : {}", greeklish);
        return articleRepository.findByGreeklish(greeklish);
    }

    /**
     * Delete the article by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Article : {}", id);
        articleRepository.deleteById(id);
        articleSearchRepository.deleteById(id);
    }

    /**
     * Search for the article corresponding to the query.
     *
     * @param query    the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> search(String query, Pageable pageable, Boolean published, List<String> categories) {
        log.debug("Request to search for a page of Articles for query {}", query);
        MultiMatchQueryBuilder queryBuilder = multiMatchQuery(query).field("previewTitle", 2).field("previewText");
        // QueryStringQueryBuilder queryBuilder =
        // queryStringQuery(query).field("previewTitle", 2).field("previewText");

        BoolQueryBuilder boolQueryBuilder = boolQuery().must(queryBuilder)
                .must(termQuery("published", true))
                .must(termsQuery("category.name", categories));
        if (published) {
            boolQueryBuilder = boolQueryBuilder.must(termQuery("published", true));
        }
        return articleSearchRepository.search(boolQueryBuilder, pageable);
    }

    /**
     * Get all the articles by category name.
     *
     * @param published if true returns only published articles else returns them
     *                  all.
     * @param category  the name of the category
     * @param pageable  the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> findAllByPublishedAndCategory_Name(Boolean published, String category, Pageable pageable) {
        log.debug("Request to get all Articles by Published and Category Name: {}", category);
        List<Article> articleList;
        if (published) {
            articleList = articleRepository.findAllByPublishedAndCategory_Name(true, category, pageable)
                    .stream()
                    .map(this::getFilteredArticle)
                    .collect(Collectors.toList());
        } else {
            articleList = articleRepository.findAllByCategory_Name(category, pageable)
                    .stream()
                    .map(this::getFilteredArticle)
                    .collect(Collectors.toList());
        }
        return new PageImpl<>(articleList, pageable, articleList.size());
    }

    /**
     * Get all published articles
     *
     * @param pageable the pagination information.
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Article> findAllPublished(Pageable pageable) {
        log.debug("Request to get all published Articles");
        return articleRepository.findAllByPublishedTrue(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Article> findAllPublishedInCategories(List<String> categories, Pageable pageable) {
        log.debug("Request to get all published Articles in categories");
        return articleRepository.findAllByPublishedTrueAndCategory_NameIn(categories, pageable);
    }

    /**
     * Search for the article corresponding to the query in a certain category.
     *
     * @param category  the category in which to search articles
     * @param published if true returns only published articles else returns them
     *                  all.
     * @param query     the query of the search.
     * @param pageable  the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> searchInCategory(String category, Boolean published, String query, Pageable pageable) {
        log.debug("REST request to search for a page of Articles of category {} for query {}", category, query);
        MultiMatchQueryBuilder queryBuilder = multiMatchQuery(query).field("previewTitle", 2).field("previewText");

        Page<Article> articlesPage = published
                ? articleSearchRepository.search(
                        boolQuery()
                                .must(termQuery("published", true))
                                .must(termQuery("category.name", category))
                                .must(queryBuilder),
                        pageable)
                : articleSearchRepository.search(
                        boolQuery()
                                .must(termQuery("category.name", category))
                                .must(queryBuilder),
                        pageable);

        List<Article> articles = articlesPage.getContent()
                .stream()
                .map(article -> articleRepository.findById(article.getId()))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .map(this::getFilteredArticle)
                .collect(Collectors.toList());

        return new PageImpl<>(articles, pageable, articlesPage.getTotalElements());
    }

    public int populateGreeklishForArticles() {
        log.debug("Request to populate Greeklish for Articles");

        List<ArticleDTO> articles = articleRepository.findArticlesWithNullGreeklish();
        int updatedCount = 0;

        for (ArticleDTO article : articles) {
            String greeklish = GreekToSeoFriendlyUrl.convert(article.getPreviewTitle());
            log.debug("Greeklish for Article : {} is : {}", article.getId(), greeklish);
            articleRepository.updateGreeklishForArticle(greeklish, article.getId());
            
            // TODO: Find a better way to update the greeklish field in the search index
            // Article partialUpdatedArticle = new Article();
            // partialUpdatedArticle.setId(article.getId());
            // partialUpdatedArticle.setGreeklish(greeklish);
            // articleSearchRepository.save(partialUpdatedArticle);
            updatedCount++;
        }

        return updatedCount;
    }

    private Article getFilteredArticle(Article article) {
        article.setPreviewImage(null);
        article.setContent(null);
        return article;
    }
    
    private Article getFilteredSuggestion(Article article) {
        Article suggestion = new Article();
        suggestion.setId(article.getId());
        suggestion.setPreviewTitle(article.getPreviewTitle());
        suggestion.setGreeklish(article.getGreeklish());
        return suggestion;
    }

}
