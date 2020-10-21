package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.service.StatementService;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.Statement}.
 */
@RestController
@RequestMapping("/api")
public class StatementResource {

    private final Logger log = LoggerFactory.getLogger(StatementResource.class);

    private static final String ENTITY_NAME = "statement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatementService statementService;

    public StatementResource(StatementService statementService) {
        this.statementService = statementService;
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
     * @param query the query of the statement search.
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
}
