package gr.ekke.check4facts.web.rest;

import com.opencsv.CSVReader;
import gr.ekke.check4facts.domain.Article;
import gr.ekke.check4facts.domain.Category;
import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.domain.Topic;
import gr.ekke.check4facts.domain.utils.Converter;
import gr.ekke.check4facts.repository.CategoryRepository;
import gr.ekke.check4facts.repository.TopicRepository;
import gr.ekke.check4facts.service.ArticleService;
import gr.ekke.check4facts.service.StatementService;
import gr.ekke.check4facts.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.apache.commons.compress.utils.IOUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.Statement}.
 */
@RestController
@RequestMapping("/api")
public class StatementResource {

    private static final String ENTITY_NAME = "statement";
    private final Logger log = LoggerFactory.getLogger(StatementResource.class);
    private final StatementService statementService;
    private final ArticleService articleService;
    private final TopicRepository topicRepository;
    private final CategoryRepository categoryRepository;
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public StatementResource(StatementService statementService, ArticleService articleService, TopicRepository topicRepository, CategoryRepository categoryRepository) {
        this.statementService = statementService;
        this.articleService = articleService;
        this.topicRepository = topicRepository;
        this.categoryRepository = categoryRepository;
    }

    /**
     * {@code POST  /statements} : Create a new statement.
     *
     * @param statement the statement to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statement, or with status {@code 400 (Bad Request)} if the statement has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/statements")
    public ResponseEntity<Statement> createStatement(@Valid @RequestBody Statement statement) throws URISyntaxException {
        log.debug("REST request to save Statement : {}", statement);
        if (statement.getId() != null) {
            throw new BadRequestAlertException("A new statement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Statement result = statementService.save(statement);
        return ResponseEntity.created(new URI("/api/statements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /statements} : Updates an existing statement.
     *
     * @param statement the statement to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statement,
     * or with status {@code 400 (Bad Request)} if the statement is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statement couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/statements")
    public ResponseEntity<Statement> updateStatement(@Valid @RequestBody Statement statement) throws URISyntaxException {
        log.debug("REST request to update Statement : {}", statement);
        if (statement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Statement result = statementService.save(statement);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statement.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /statements} : get all the statements.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statements in body.
     */
    @GetMapping("/statements")
    public ResponseEntity<List<Statement>> getAllStatements(Pageable pageable) {
        log.debug("REST request to get a page of Statements");
        Page<Statement> page = statementService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /statements/:id} : get the "id" statement.
     *
     * @param id the id of the statement to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statement, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/statements/{id}")
    public ResponseEntity<Statement> getStatement(@PathVariable Long id) {
        log.debug("REST request to get Statement : {}", id);
        Optional<Statement> statement = statementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(statement);
    }

    /**
     * {@code DELETE  /statements/:id} : delete the "id" statement.
     *
     * @param id the id of the statement to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/statements/{id}")
    public ResponseEntity<Void> deleteStatement(@PathVariable Long id) {
        log.debug("REST request to delete Statement : {}", id);
        statementService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/statements?query=:query} : search for the statement corresponding
     * to the query.
     *
     * @param query    the query of the statement search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/statements")
    public ResponseEntity<List<Statement>> searchStatements(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Statements for query {}", query);
        Page<Statement> page = statementService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @PutMapping("/statements/accuracy/{id}/{accuracy}")
    public Integer setFactCheckerAccuracy(@PathVariable Long id, @PathVariable Integer accuracy) {
        log.debug("REST request to set factCheckerAccuracy of Statement: {} tp : {}", id, accuracy);
        return statementService.setFactCheckerAccuracy(id, accuracy);
    }

    @PostMapping("/statements/import-csv")
    public ResponseEntity<Void> importCSV(@RequestParam("file") MultipartFile multipartFile) throws IOException {
        log.debug("REST Import statements from CSV");

        if (multipartFile.isEmpty()) {
            throw new BadRequestAlertException("The csv file is empty.", ENTITY_NAME, "csvempty");
        } else {
            CSVReader csvReader = new CSVReader(new InputStreamReader(multipartFile.getInputStream(), "UTF-8"));
            Topic immigrationTopic = topicRepository.getOne(1L); // immigration Topic.
            Topic crimeTopic = topicRepository.getOne(1L); // crime Topic.
            Category immigrationCategory = categoryRepository.getOne(2L); // immigration Topic.
            Category crimeCategory = categoryRepository.getOne(3L); // crime Topic.

            csvReader.skip(1); // Skip header.
            Converter converter = new Converter();
            for (String[] nextLine : csvReader) {
                if (nextLine[0].isEmpty()) continue; // Stop if empty line.
                Statement statement = new Statement();
                statement.setText(nextLine[1]);
                statement.setMainArticleTitle(nextLine[2]);
                statement.setMainArticleText(nextLine[3]);
                statement.setMainArticleUrl(nextLine[4]);
                statement.setAuthor(nextLine[10]);
                statement.setStatementDate(converter.stringToInstant(nextLine[12]));
                statement.setRegistrationDate(converter.stringToInstant(nextLine[13]));


                statement.setSubTopics(converter.stringToSubTopics(nextLine[16]));

                statement.setStatementSources(converter.stringsToStatementSources(nextLine[17], nextLine[19]));

                try {
                    statement.setFactCheckerAccuracy(Integer.parseInt(nextLine[21]));
                } catch (NumberFormatException e){
                    // leave null if unknown value or not int
                }


                Article article = new Article();
                article.setArticleDate(statement.getRegistrationDate());
                article.setStatement(statement);
                article.setPublished(true);
                article.setAuthor("EKKE");
                article.setContent(nextLine[23].trim());
                article.setPreviewTitle(statement.getMainArticleTitle());
                article.setPreviewText(statement.getMainArticleText());

                String topicValue = nextLine[15];
                if (topicValue.equals("Μεταναστευτικό/Προσφυγικό")) {
                    statement.setTopic(immigrationTopic);
                    article.setCategory(immigrationCategory);
                } else if (topicValue.equals("Εγκληματικότητα")) {
                    statement.setTopic(crimeTopic);
                    article.setCategory(crimeCategory);
                } else
                    continue;

                if (!statement.getMainArticleUrl().isEmpty()) {
                    try {
                        Document document = Jsoup.connect(statement.getMainArticleUrl()).get();
                        //Get og:image from document
                        Element metaOgImageEl = document.select("meta[property=og:image]").first();
                        if (metaOgImageEl != null) {
                            String previewImgUrl = metaOgImageEl.attr("content");
                            URL imgUrl = new URL(previewImgUrl);
                            URLConnection conn = imgUrl.openConnection();
                            conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36");
                            String contentType = conn.getContentType();
                            BufferedInputStream is = new BufferedInputStream(conn.getInputStream());
                            byte[] imgArray = IOUtils.toByteArray(is);
                            is.close();
                            article.setPreviewImage(imgArray);
                            article.setPreviewImageContentType(contentType);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                statementService.save(statement);
                articleService.save(article);
            }


        }

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, "CSV")).build();
    }
}
