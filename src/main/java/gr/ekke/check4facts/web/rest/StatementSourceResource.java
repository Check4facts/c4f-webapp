package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.StatementSource;
import gr.ekke.check4facts.service.StatementSourceService;
import gr.ekke.check4facts.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.StatementSource}.
 */
@RestController
@RequestMapping("/api")
public class StatementSourceResource {

    private final Logger log = LoggerFactory.getLogger(StatementSourceResource.class);

    private static final String ENTITY_NAME = "statementSource";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatementSourceService statementSourceService;

    public StatementSourceResource(StatementSourceService statementSourceService) {
        this.statementSourceService = statementSourceService;
    }

    /**
     * {@code POST  /statement-sources} : Create a new statementSource.
     *
     * @param statementSource the statementSource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statementSource, or with status {@code 400 (Bad Request)} if the statementSource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/statement-sources")
    public ResponseEntity<StatementSource> createStatementSource(@Valid @RequestBody StatementSource statementSource) throws URISyntaxException {
        log.debug("REST request to save StatementSource : {}", statementSource);
        if (statementSource.getId() != null) {
            throw new BadRequestAlertException("A new statementSource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatementSource result = statementSourceService.save(statementSource);
        return ResponseEntity.created(new URI("/api/statement-sources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /statement-sources} : Updates an existing statementSource.
     *
     * @param statementSource the statementSource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statementSource,
     * or with status {@code 400 (Bad Request)} if the statementSource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statementSource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/statement-sources")
    public ResponseEntity<StatementSource> updateStatementSource(@Valid @RequestBody StatementSource statementSource) throws URISyntaxException {
        log.debug("REST request to update StatementSource : {}", statementSource);
        if (statementSource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatementSource result = statementSourceService.save(statementSource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statementSource.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /statement-sources} : get all the statementSources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statementSources in body.
     */
    @GetMapping("/statement-sources")
    public List<StatementSource> getAllStatementSources() {
        log.debug("REST request to get all StatementSources");
        return statementSourceService.findAll();
    }

    /**
     * {@code GET  /statement-sources/:id} : get the "id" statementSource.
     *
     * @param id the id of the statementSource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statementSource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/statement-sources/{id}")
    public ResponseEntity<StatementSource> getStatementSource(@PathVariable Long id) {
        log.debug("REST request to get StatementSource : {}", id);
        Optional<StatementSource> statementSource = statementSourceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(statementSource);
    }

    /**
     * {@code DELETE  /statement-sources/:id} : delete the "id" statementSource.
     *
     * @param id the id of the statementSource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/statement-sources/{id}")
    public ResponseEntity<Void> deleteStatementSource(@PathVariable Long id) {
        log.debug("REST request to delete StatementSource : {}", id);
        statementSourceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/statement-sources?query=:query} : search for the statementSource corresponding
     * to the query.
     *
     * @param query the query of the statementSource search.
     * @return the result of the search.
     */
    @GetMapping("/_search/statement-sources")
    public List<StatementSource> searchStatementSources(@RequestParam String query) {
        log.debug("REST request to search StatementSources for query {}", query);
        return statementSourceService.search(query);
    }

    /**
     * {@code GET  /statement-sources/statement/:id} : get all the statementSources by statement id.
     *
     * @param id the id of the statement
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statementSources in body.
     */
    @GetMapping("/statement-sources/statement/{id}")
    public List<StatementSource> getAllStatementSourcesByStatementId(@PathVariable Long id) {
        log.debug("REST request to get all StatementSources by statement id: {}", id);
        return statementSourceService.findAllByStatementId(id);
    }
}
