package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.News;
import gr.ekke.check4facts.domain.utils.GreekToSeoFriendlyUrl;
import gr.ekke.check4facts.repository.NewsRepository;
import gr.ekke.check4facts.repository.search.NewsSearchRepository;
import gr.ekke.check4facts.service.dto.NewsDTO;

import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;
import javax.persistence.EntityManager;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
@Transactional
public class NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsService.class);

    private final EntityManager em;

    private final NewsRepository newsRepository;

    private final NewsSearchRepository newsSearchRepository;

    public NewsService(EntityManager em, NewsRepository newsRepository, NewsSearchRepository newsSearchRepository) {
        this.em =  em;
        this.newsRepository = newsRepository;
        this.newsSearchRepository = newsSearchRepository;
    }

    /**
     * Save a news.
     *
     * @param news the entity to save.
     * @return the persisted entity.
     */
    public News save(News news) {
        log.debug("Request to save News : {}", news);
        news.setGreeklish(GreekToSeoFriendlyUrl.convert(news.getTitle()));
        News result = newsRepository.saveAndFlush(news);
        newsSearchRepository.saveCustom(result);
        em.refresh(result);
        return result;
    }

    /**
     * Get all the news.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<News> findAll(Pageable pageable) {
        log.debug("Request to get all News");
        return filterNewsContent(newsRepository.findAllNewsOrderByDateDesc(pageable));
    }

    private Page<News> filterNewsContent(Page<News> news) {
        for (News n : news) {
            n.setContent(null);
        }
        return news;
    }


    /**
     * Get one news by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<News> findOne(Long id) {
        log.debug("Request to get News : {}", id);
        return newsRepository.findById(id);
    }


    /**
     * Get one news by greeklish.
     *
     * @param greeklish the greeklish of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<News> findByGreeklish(String greeklish) {
        log.debug("Request to get News : {}", greeklish);
        return newsRepository.findByGreeklish(greeklish);
    }


    /**
     * Delete the news by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete News : {}", id);
        newsRepository.deleteById(id);
        newsSearchRepository.deleteById(id);
    }

    /**
     * Search for the news corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<News> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Statements for query {}", query);
        MultiMatchQueryBuilder queryBuilder;
        try {
            Integer.parseInt(query);
            queryBuilder = multiMatchQuery(query)
                    .field("id");
        } catch (NumberFormatException e) {
            queryBuilder = multiMatchQuery(query)
                    .field("title")
                    .field("previewText")
                    .field("content")
                    .type(MultiMatchQueryBuilder.Type.BEST_FIELDS)
                    .operator(Operator.OR);
        }
        Page<News> news = newsSearchRepository.search(queryBuilder, pageable);
        System.out.println("News: " + news);

        return news;
    }

    public int populateGreeklishForNews() {
        log.debug("Request to populate Greeklish for News");

        List<NewsDTO> news = newsRepository.findNewsWithNullGreeklish();
        int updatedCount = 0;

        for (NewsDTO n : news) {
            String greeklish = GreekToSeoFriendlyUrl.convert(n.getTitle());
            log.debug("Greeklish for News : {} is : {}", n.getId(), greeklish);
            newsRepository.updateGreeklishForNews(greeklish, n.getId());
            updatedCount++;
        }

        return updatedCount;
    }
}
