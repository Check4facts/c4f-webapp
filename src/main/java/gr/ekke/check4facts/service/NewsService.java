package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.News;
import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.repository.NewsRepository;
import gr.ekke.check4facts.repository.search.NewsSearchRepository;

import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link News}.
 */
@Service
@Transactional
public class NewsService {

    private final Logger log = LoggerFactory.getLogger(NewsService.class);

    private final NewsRepository newsRepository;

    private final NewsSearchRepository newsSearchRepository;

    public NewsService(NewsRepository newsRepository, NewsSearchRepository newsSearchRepository) {
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
        News result = newsRepository.save(news);
        newsSearchRepository.save(result);
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
}
