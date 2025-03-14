package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.Justification;
import gr.ekke.check4facts.service.JustificationService;
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
 * REST controller for managing {@link gr.ekke.check4facts.domain.Justification}.
 */
@RestController
@RequestMapping("/api")
public class JustificationResource {

    private final Logger log = LoggerFactory.getLogger(JustificationResource.class);

    private static final String ENTITY_NAME = "justification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JustificationService justificationService;

    public JustificationResource(JustificationService justificationService) {
        this.justificationService = justificationService;
    }

    /**
     * {@code POST  /justification} : Create a new justification.
     *
     * @param justification the justification to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new justification, or with status {@code 400 (Bad Request)} if the justification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/justification")
    public ResponseEntity<Justification> createJustification(@Valid @RequestBody Justification justification) throws URISyntaxException {
        log.debug("REST request to save Justification : {}", justification);
        if (justification.getId() != null) {
            throw new BadRequestAlertException("A new justification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Justification result = justificationService.save(justification);
        return ResponseEntity.created(new URI("/api/justification/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /justification} : Updates an existing justification.
     *
     * @param justification the justification to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated justification,
     * or with status {@code 400 (Bad Request)} if the justification is not valid,
     * or with status {@code 500 (Internal Server Error)} if the justification couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/justification")
    public ResponseEntity<Justification> updateJustification(@Valid @RequestBody Justification justification) throws URISyntaxException {
        log.debug("REST request to update Justification : {}", justification);
        if (justification.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Justification result = justificationService.save(justification);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, justification.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /justification} : get all the justification.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of justification in body.
     */
    @GetMapping("/justification")
    public ResponseEntity<List<Justification>> getAllJustification(Pageable pageable) {
        log.debug("REST request to get a page of Justification");
        Page<Justification> page = justificationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /justification/:id} : get the "id" justification.
     *
     * @param id the id of the justification to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the justification, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/justification/{id}")
    public ResponseEntity<Justification> getJustification(@PathVariable Long id) {
        log.debug("REST request to get Justification : {}", id);
        Optional<Justification> justification = justificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(justification);
    }

    /**
     * {@code DELETE  /justification/:id} : delete the "id" justification.
     *
     * @param id the id of the justification to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/justification/{id}")
    public ResponseEntity<Void> deleteJustification(@PathVariable Long id) {
        log.debug("REST request to delete Justification : {}", id);
        justificationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
