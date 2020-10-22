package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.SubTopic;
import gr.ekke.check4facts.service.SubTopicService;
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
 * REST controller for managing {@link gr.ekke.check4facts.domain.SubTopic}.
 */
@RestController
@RequestMapping("/api")
public class SubTopicResource {

    private final Logger log = LoggerFactory.getLogger(SubTopicResource.class);

    private static final String ENTITY_NAME = "subTopic";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubTopicService subTopicService;

    public SubTopicResource(SubTopicService subTopicService) {
        this.subTopicService = subTopicService;
    }

    /**
     * {@code POST  /sub-topics} : Create a new subTopic.
     *
     * @param subTopic the subTopic to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subTopic, or with status {@code 400 (Bad Request)} if the subTopic has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-topics")
    public ResponseEntity<SubTopic> createSubTopic(@Valid @RequestBody SubTopic subTopic) throws URISyntaxException {
        log.debug("REST request to save SubTopic : {}", subTopic);
        if (subTopic.getId() != null) {
            throw new BadRequestAlertException("A new subTopic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubTopic result = subTopicService.save(subTopic);
        return ResponseEntity.created(new URI("/api/sub-topics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-topics} : Updates an existing subTopic.
     *
     * @param subTopic the subTopic to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subTopic,
     * or with status {@code 400 (Bad Request)} if the subTopic is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subTopic couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-topics")
    public ResponseEntity<SubTopic> updateSubTopic(@Valid @RequestBody SubTopic subTopic) throws URISyntaxException {
        log.debug("REST request to update SubTopic : {}", subTopic);
        if (subTopic.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubTopic result = subTopicService.save(subTopic);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subTopic.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-topics} : get all the subTopics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subTopics in body.
     */
    @GetMapping("/sub-topics")
    public List<SubTopic> getAllSubTopics() {
        log.debug("REST request to get all SubTopics");
        return subTopicService.findAll();
    }

    /**
     * {@code GET  /sub-topics/:id} : get the "id" subTopic.
     *
     * @param id the id of the subTopic to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subTopic, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-topics/{id}")
    public ResponseEntity<SubTopic> getSubTopic(@PathVariable Long id) {
        log.debug("REST request to get SubTopic : {}", id);
        Optional<SubTopic> subTopic = subTopicService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subTopic);
    }

    /**
     * {@code DELETE  /sub-topics/:id} : delete the "id" subTopic.
     *
     * @param id the id of the subTopic to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-topics/{id}")
    public ResponseEntity<Void> deleteSubTopic(@PathVariable Long id) {
        log.debug("REST request to delete SubTopic : {}", id);
        subTopicService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/sub-topics?query=:query} : search for the subTopic corresponding
     * to the query.
     *
     * @param query the query of the subTopic search.
     * @return the result of the search.
     */
    @GetMapping("/_search/sub-topics")
    public List<SubTopic> searchSubTopics(@RequestParam String query) {
        log.debug("REST request to search SubTopics for query {}", query);
        return subTopicService.search(query);
    }

    /**
     * {@code GET  /sub-topics/statement/:id} : get all the subTopics by statement id.
     *
     * @param id the id of the statement
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subTopics in body.
     */
    @GetMapping("/sub-topics/statement/{id}")
    public List<SubTopic> getAllSubTopics(@PathVariable Long id) {
        log.debug("REST request to get all SubTopics by statement id: {}", id);
        return subTopicService.findAllByStatementId(id);
    }
}
