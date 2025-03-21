package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.News;
import gr.ekke.check4facts.service.NewsService;
import gr.ekke.check4facts.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.News}.
 */
@RestController
@RequestMapping("/api")
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    private static final String ENTITY_NAME = "news";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsService newsService;

    public NewsResource(NewsService newsService) {
        this.newsService = newsService;
    }

    /**
     * {@code POST  /news} : Create a new news.
     *
     * @param news the news to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new news, or with status {@code 400 (Bad Request)} if the news has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news")
    public ResponseEntity<News> createNews(@Valid @RequestBody News news) throws URISyntaxException {
        log.debug("REST request to save News : {}", news);
        if (news.getId() != null) {
            throw new BadRequestAlertException("A new news cannot already have an ID", ENTITY_NAME, "idexists");
        }
        News result = newsService.save(news);
        return ResponseEntity.created(new URI("/api/news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /news} : Updates an existing news.
     *
     * @param news the news to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated news,
     * or with status {@code 400 (Bad Request)} if the news is not valid,
     * or with status {@code 500 (Internal Server Error)} if the news couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news")
    public ResponseEntity<News> updateNews(@Valid @RequestBody News news) throws URISyntaxException {
        log.debug("REST request to update News : {}", news);
        if (news.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        News result = newsService.save(news);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, news.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /news} : get all the news.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of news in body.
     */
    @GetMapping("/news")
    public ResponseEntity<List<News>> getAllNews(Pageable pageable) {
        log.debug("REST request to get a page of News");
        Page<News> page = newsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /news/:id} : get the "id" news.
     *
     * @param id the id of the news to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the news, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news/{id}")
    public ResponseEntity<News> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        Optional<News> news = newsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(news);
    }

    /**
     * {@code GET  /news/greeklish/:greeklish} : get the "greeklish" news.
     *
     * @param greeklish the greeklish of the news to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the news, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news/greeklish/{greeklish}")
    public ResponseEntity<News> getNewsByGreeklish(@PathVariable String greeklish) {
        log.debug("REST request to get News with greeklish : {}", greeklish);
        Optional<News> n = newsService.findByGreeklish(greeklish);
        return ResponseUtil.wrapOrNotFound(n);
    }

    /**
     * {@code DELETE  /news/:id} : delete the "id" news.
     *
     * @param id the id of the news to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        log.debug("REST request to delete News : {}", id);
        newsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/news?query=:query} : search for the news corresponding
     * to the query.
     *
     * @param query the query of the news search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/news")
    public ResponseEntity<List<News>> searchNews(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of News for query {}", query);
        Page<News> page = newsService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /news/populate-greeklish} : updates Greeklish for news where greeklish is null.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} when the task is finished, or with status {@code 500 (Internal Server Error)} if an error occurs.
     */
    @GetMapping("/news/populate-greeklish")
    public ResponseEntity<String> populateGreeklishForNews() {
        log.debug("REST request to populate Greeklish for News");
        try {
            int updatedCount = newsService.populateGreeklishForNews();
            return ResponseEntity.ok().body("Updated Greeklish for " + updatedCount + " news");
        } catch (Exception e) {
            log.error("Error updating Greeklish for News", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
