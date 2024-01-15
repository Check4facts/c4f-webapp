package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.domain.CategorizedArticles;
import gr.ekke.check4facts.security.AuthoritiesConstants;
import gr.ekke.check4facts.service.ArticleService;
import gr.ekke.check4facts.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.Article}.
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    private final Logger log = LoggerFactory.getLogger(ArticleResource.class);

    private static final String ENTITY_NAME = "article";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArticleService articleService;

    public ArticleResource(ArticleService articleService) {
        this.articleService = articleService;
    }

    /**
     * {@code POST  /articles} : Create a new article.
     *
     * @param article the article to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new article, or with status {@code 400 (Bad Request)} if the article has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/articles")
    public ResponseEntity<Article> createArticle(@Valid @RequestBody Article article) throws URISyntaxException {
        log.debug("REST request to save Article : {}", article);
        if (article.getId() != null) {
            throw new BadRequestAlertException("A new article cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Article result = articleService.save(article);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /articles} : Updates an existing article.
     *
     * @param article the article to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated article,
     * or with status {@code 400 (Bad Request)} if the article is not valid,
     * or with status {@code 500 (Internal Server Error)} if the article couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/articles")
    public ResponseEntity<Article> updateArticle(@Valid @RequestBody Article article) throws URISyntaxException {
        log.debug("REST request to update Article : {}", article);
        if (article.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Article result = articleService.save(article);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, article.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /articles} : get all the articles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles")
    public ResponseEntity<List<Article>> getAllArticles(Pageable pageable) {
        log.debug("REST request to get a page of Articles");
        Page<Article> page = articleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /articles/:id} : get the "id" article.
     *
     * @param id the id of the article to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the article, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/articles/{id}")
    @PreAuthorize("hasAnyAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAnyAuthority(\"" + AuthoritiesConstants.USER + "\") or @articleService.findOne(#id).orElse(null)?.published == true")
    public ResponseEntity<Article> getArticle(@PathVariable Long id) {
        log.debug("REST request to get Article : {}", id);
        Optional<Article> article = articleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(article);
    }

    /**
     * {@code DELETE  /articles/:id} : delete the "id" article.
     *
     * @param id the id of the article to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/articles/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        log.debug("REST request to delete Article : {}", id);
        articleService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/articles?query=:query} : search for the article corresponding
     * to the query.
     *
     * @param query the query of the article search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/articles/{published}")
    public ResponseEntity<List<Article>> searchArticles(@PathVariable Boolean published, @RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Articles for query {}", query);
        Page<Article> page = articleService.search(query, pageable, published, Arrays.asList("crime", "immigration", "climate_change", "pandemic"));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code SEARCH  /_search/articles?query=:query} : search for the article corresponding
     * to the query.
     *
     * @param query the query of the article search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/articles/front/{published}")
    public ResponseEntity<List<CategorizedArticles>> searchFrontPageArticles(@PathVariable Boolean published, @RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Articles for query {}", query);
        List<CategorizedArticles> page = articleService.searchFrontPageArticles(query, pageable, published);
        // HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().body(page);
    }

    /**
     * {@code SEARCH  /_search/articles/:category?query=:query} : search for the article corresponding
     * to the query in a certain category.
     *
     * @param category the category in which to search articles
     * @param published if true returns only published articles else returns them all.
     * @param query the query of the article search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/articles/{category}/{published}")
    public ResponseEntity<List<Article>> searchArticlesInCategory(@PathVariable String category, @PathVariable Boolean published, @RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Articles of category {} for query {}", category, query);
        Page<Article> page = articleService.searchInCategory(category, published, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /articles/published/:published/category_name/:category} : get all the articles by published category name "category".
     *
     * @param published if true returns only published articles else returns them all.
     * @param category the name of the category
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles/published/{published}/category_name/{category}")
    public ResponseEntity<List<Article>> getAllArticlesByPublishedAndCategory_Name( @PathVariable Boolean published, @PathVariable String category, Pageable pageable) {
        log.debug("REST request to get a page of Articles by Published and Category Name: {}", category);
        Page<Article> page = articleService.findAllByPublishedAndCategory_Name(published, category, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /articles/carousel/:number} : get "number" published articles for carousel.
     *
     * @param number the number of top n articles to fetch.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles/carousel/{number}")
    public ResponseEntity<List<Article>> getCarouselArticles(@PathVariable Integer number) {
        log.debug("REST request to get {} published Articles for carousel", number);
        Page<Article> page = articleService.findAllPublished(PageRequest.of(0, number, Sort.by(Sort.Direction.DESC, "articleDate")));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    /**
     * {@code GET /articles/published} : get all the published articles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles/published")
    public ResponseEntity<List<Article>> getAllPublishedArticles(Pageable pageable) {
        log.debug("REST request to get a page of published Articles");
        Page<Article> page = articleService.findAllPublishedInCategories(Arrays.asList("crime", "immigration", "climate_change", "pandemic"), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET /articles/frontPage} : get all the published articles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of articles in body.
     */
    @GetMapping("/articles/frontPage")
    public ResponseEntity<List<CategorizedArticles>> getFrontPageArticles(Pageable pageable) {
        log.debug("REST request to get a page of published Articles");
        List<CategorizedArticles> categorizedArticles = articleService.findFrontPageArticles();
        // HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().body(categorizedArticles);
    }

    @GetMapping("/articles/image/{id}")
    public ResponseEntity<byte[]> getBase64Image(@PathVariable Long id) {
        Optional<Article> optionalArticle = articleService.findOne(id);

        if (optionalArticle.isPresent()) {
            Article foundArticle = optionalArticle.get();
            byte[] imageBytes = foundArticle.getPreviewImage();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(foundArticle.getPreviewImageContentType()));
            headers.setContentLength(imageBytes.length);

            return new ResponseEntity<>(foundArticle.getPreviewImage(), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
