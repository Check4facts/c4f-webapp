package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.JustificationSource;
import gr.ekke.check4facts.service.JustificationSourceService;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link gr.ekke.check4facts.domain.JustificationSource}.
 */
@RestController
@RequestMapping("/api")
public class JustificationSourceResource {

    private final Logger log = LoggerFactory.getLogger(JustificationSourceResource.class);

    private static final String ENTITY_NAME = "justification_source";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JustificationSourceService justificationSourceService;

    public JustificationSourceResource(JustificationSourceService justificationSourceService) {
        this.justificationSourceService = justificationSourceService;
    }

    /**
     * {@code POST  /justification-sources} : Create a new justificationSource.
     *
     * @param justification the justificationSource to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new justificationSource, or with status {@code 400 (Bad Request)} if the justificationSource has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/justification-sources")
    public ResponseEntity<JustificationSource> createJustificationSource(@Valid @RequestBody JustificationSource justificationSource) throws URISyntaxException {
        log.debug("REST request to save JustificationSource : {}", justificationSource);
        if (justificationSource.getId() != null) {
            throw new BadRequestAlertException("A new justificationSource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JustificationSource result = justificationSourceService.save(justificationSource);
        return ResponseEntity.created(new URI("/api/justification-sources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code POST  /justification-sources/batch} : Create or update a list of justificationSources.
     *
     * @param justificationSources the list of justificationSources to create or update.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the list of created or updated justificationSources.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/justification-sources/batch")
    public ResponseEntity<List<JustificationSource>> createOrUpdateJustificationSources(@Valid @RequestBody List<JustificationSource> justificationSources) throws URISyntaxException {
        log.debug("REST request to save or update a list of JustificationSources : {}", justificationSources);
        List<JustificationSource> result = justificationSourceService.saveAll(justificationSources);
        return ResponseEntity.created(new URI("/api/justification-sources/batch"))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, "batch"))
            .body(result);
    }


    /**
     * {@code PUT  /justification-sources} : Update an existing justificationSource.
     *
     * @param justificationSource the justificationSource to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated justificationSource,
     * or with status {@code 400 (Bad Request)} if the justificationSource is not valid,
     * or with status {@code 500 (Internal Server Error)} if the justificationSource couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/justification-sources")
    public ResponseEntity<JustificationSource> updateJustificationSource(@Valid @RequestBody JustificationSource justificationSource) throws URISyntaxException {
        log.debug("REST request to update JustificationSource : {}", justificationSource);
        if (justificationSource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JustificationSource result = justificationSourceService.save(justificationSource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, justificationSource.getId().toString()))
            .body(result);
    }


    /**
     * {@code GET  /justification-sources} : Get all the justificationSources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of justificationSources in the body.
     */
    @GetMapping("/justification-sources")
    public List<JustificationSource> getAllJustificationSources() {
        log.debug("REST request to get a page of JustificationSources");
        return justificationSourceService.findAll();
    }

    /**
     * {@code GET  /justification-sources/blacklisted} : Get all blacklisted justificationSources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blacklisted justificationSources in the body.
     */
    @GetMapping("/justification-sources/blacklisted")
    public ResponseEntity<List<JustificationSource>> getBlacklistedJustificationSources() {
        log.debug("REST request to get all blacklisted JustificationSources");
        List<JustificationSource> blacklistedSources = justificationSourceService.findAllByBlackListedTrue();
        return ResponseEntity.ok().body(blacklistedSources);
    }

    /**
     * {@code GET  /justification-sources/whitelisted} : Get all whitelisted justificationSources.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of whitelisted justificationSources in the body.
     */
    @GetMapping("/justification-sources/whitelisted")
    public ResponseEntity<List<JustificationSource>> getWhiteListedJustificationSources() {
        log.debug("REST request to get all whitelisted JustificationSources");
        List<JustificationSource> whiteListedSources = justificationSourceService.findAllByBlackListedFalse();
        return ResponseEntity.ok().body(whiteListedSources);
    }

    /**
     * {@code GET  /justification-sources/:id} : Get the "id" justificationSource.
     *
     * @param id the id of the justificationSource to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the justificationSource, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/justification-sources/{id}")
    public ResponseEntity<JustificationSource> getJustificationSource(@PathVariable Long id) {
        log.debug("REST request to get JustificationSource : {}", id);
        Optional<JustificationSource> justificationSource = justificationSourceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(justificationSource);
    }

    /**
     * {@code DELETE  /justification-sources/:id} : Delete the "id" justificationSource.
     *
     * @param id the id of the justificationSource to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (No Content)}.
     */
    @DeleteMapping("/justification-sources/{id}")
    public ResponseEntity<Void> deleteJustificationSource(@PathVariable Long id) {
        log.debug("REST request to delete JustificationSource : {}", id);
        justificationSourceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

}
