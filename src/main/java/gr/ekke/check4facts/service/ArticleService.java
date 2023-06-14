package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.domain.CategorizedArticles;
import gr.ekke.check4facts.domain.Category;
import gr.ekke.check4facts.repository.ArticleRepository;
import gr.ekke.check4facts.repository.CategoryRepository;
import gr.ekke.check4facts.repository.search.ArticleSearchRepository;

import org.apache.lucene.search.TermQuery;
import org.elasticsearch.index.query.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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

    public ArticleService(ArticleRepository articleRepository, ArticleSearchRepository articleSearchRepository, EntityManager em, CategoryRepository categoryRepository) {
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
        Article result = articleRepository.saveAndFlush(article);
        em.refresh(result);
        articleSearchRepository.save(result);
        return result;
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
            categorizedArticles.add(new CategorizedArticles(cat.getName(), articleRepository.findFirst4ByPublishedTrueAndCategory_NameOrderByArticleDateDesc(cat.getName())));
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
        List<CategorizedArticles> categorizedArticles = new ArrayList();
        // Get All categories
        List<Category> categoryNames = categoryRepository.findAll();
        // Find first 6 articles of each category and add them to a list
        categoryNames.forEach(cat -> {
            categorizedArticles.add(new CategorizedArticles(cat.getName(), searchInCategory(cat.getName(), published, query, pageable).toList()));
        });
        return categorizedArticles;
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
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> search(String query, Pageable pageable, Boolean published, List<String> categories) {
        log.debug("Request to search for a page of Articles for query {}", query);
        MultiMatchQueryBuilder queryBuilder = multiMatchQuery(query).field("previewTitle", 2).field("previewText");
        // QueryStringQueryBuilder queryBuilder = queryStringQuery(query).field("previewTitle", 2).field("previewText");

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
     * @param published if true returns only published articles else returns them all.
     * @param category the name of the category
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> findAllByPublishedAndCategory_Name(Boolean published, String category, Pageable pageable) {
        log.debug("Request to get all Articles by Published and Category Name: {}", category);
        return published ? articleRepository.findAllByPublishedAndCategory_Name(true, category, pageable) : articleRepository.findAllByCategory_Name(category, pageable);
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
     * @param category the category in which to search articles
     * @param published if true returns only published articles else returns them all.
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Article> searchInCategory(String category, Boolean published, String query, Pageable pageable) {
        log.debug("REST request to search for a page of Articles of category {} for query {}", category, query);
        MultiMatchQueryBuilder queryBuilder = multiMatchQuery(query).field("previewTitle", 2).field("previewText");
        // QueryStringQueryBuilder queryBuilder = queryStringQuery(query).field("previewTitle", 2).field("previewText");
        return published
            ? articleSearchRepository.search(
                boolQuery()
                    .must(termQuery("published", true))
                    .must(termQuery("category.name", category))
                    .must(queryBuilder), pageable)
            : articleSearchRepository.search(
                boolQuery()
                    .must(termQuery("category.name", category))
                    .must(queryBuilder), pageable);
    }
}
