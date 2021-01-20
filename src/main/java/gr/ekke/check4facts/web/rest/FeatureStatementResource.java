package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.FeatureStatement;
import gr.ekke.check4facts.service.FeatureStatementService;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FeatureStatementResource {

    private final Logger log = LoggerFactory.getLogger(FeatureStatementResource.class);

    private static final   String ENTITY_NAME = "featureStatement";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeatureStatementService featureStatementService;

    public FeatureStatementResource(FeatureStatementService featureStatementService) {
        this.featureStatementService = featureStatementService;
    }

    /* FIXME Check if we need to create methods for creating updating from the api.*/

    @GetMapping("/feature-statements")
    public List<FeatureStatement> getAllFeatureStatements() {
        log.debug("REST request to get all FeatureStatements");
        return featureStatementService.findAll();
    }

    @GetMapping("/feature-statements/{id}")
    public ResponseEntity<FeatureStatement> getFeatureStatement(@PathVariable Long id) {
        log.debug("Rest request to get FeatureStatement : {}", id);
        Optional<FeatureStatement> featureStatement = featureStatementService.findOne(id);
        return ResponseUtil.wrapOrNotFound(featureStatement);
    }

    @GetMapping("/feature-statements/latest/statement/{id}")
    public ResponseEntity<FeatureStatement> getLatestFeatureStatementByStatementId(@PathVariable Long id) {
        log.debug("REST Request to get FeatureStatement with Max harvestIteration by Statement : {}", id);
        Optional<FeatureStatement> featureStatement = featureStatementService.getLatestFeatureStatementByStatementId(id);
        return ResponseUtil.wrapOrNotFound(featureStatement);
    }

    @PutMapping("/feature-statements/{id}/{label}")
    public Integer setTrueLabel(@PathVariable Long id, @PathVariable Boolean label) {
        log.debug("Rest request to set trueLabel of FeatureStatement : {} to : {}", id, label);
        return featureStatementService.setTrueLabel(id, label);
    }

    @DeleteMapping("/feature-statements/{id}")
    public ResponseEntity<Void> deleteFeatureStatement(@PathVariable Long id) {
        log.debug("REST request to delete FeatureStatement : {}", id);
        featureStatementService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/_search/feature-statements")
    public List<FeatureStatement> searchFeatureStatements(@RequestParam String query) {
        log.debug("REST request to search FeatureStatements for query {}", query);
        return featureStatementService.search(query);
    }

    @GetMapping("/feature-statements/statement/{id}")
    public List<FeatureStatement> getAllFeatureStatementsByStatementId(@PathVariable Long id) {
        log.debug("REST request to get all FeatureStatements by statement id: {}", id);
        return featureStatementService.findAllByStatementId(id);
    }

    @GetMapping("/feature-statements/count/statement/{id}")
    public Integer countAllFeatureStatementsByStatementId(@PathVariable Long id) {
        log.debug("REST request to count all FeatureStatements by Statement id: {}", id);
        return featureStatementService.countAllByStatementId(id);
    }
}
