package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.FeatureToggle;
import gr.ekke.check4facts.service.FeatureToggleService;
import gr.ekke.check4facts.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class FeatureToggleResource {

    private final Logger log = LoggerFactory.getLogger(FeatureToggleResource.class);

    private static final String ENTITY_NAME = "featureToggle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FeatureToggleService featureToggleService;

    public FeatureToggleResource(FeatureToggleService featureToggleService) {
        this.featureToggleService = featureToggleService;
    }

    /**
     * {@code POST  /feature-toggles} : Create a new feature toggle.
     *
     * @param featureToggle the feature toggle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new feature toggle, or with status {@code 400 (Bad Request)} if the feature toggle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/feature-toggles")
    public ResponseEntity<FeatureToggle> createFeatureToggle(@Valid @RequestBody FeatureToggle featureToggle) throws URISyntaxException {
        log.debug("REST request to save FeatureToggle : {}", featureToggle);
        if (featureToggle.getKey() != null) {
            throw new BadRequestAlertException("A new feature toggle cannot already have a key", ENTITY_NAME, "keyexists");
        }
        FeatureToggle result = featureToggleService.save(featureToggle);
        return ResponseEntity.created(new URI("/api/feature-toggles/" + result.getKey()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getKey()))
            .body(result);
    }

    /**
     * {@code PUT  /feature-toggles} : Updates an existing feature toggle.
     *
     * @param featureToggle the feature toggle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated feature toggle,
     * or with status {@code 400 (Bad Request)} if the feature toggle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the feature toggle couldn't be updated.
     */
    @PutMapping("/feature-toggles")
    public ResponseEntity<FeatureToggle> updateFeatureToggle(@Valid @RequestBody FeatureToggle featureToggle) throws URISyntaxException {
        log.debug("REST request to update FeatureToggle : {}", featureToggle);
        if (featureToggle.getKey() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FeatureToggle result = featureToggleService.save(featureToggle);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, featureToggle.getKey()))
            .body(result);
    }

    /**
     * {@code GET  /feature-toggles} : get all the feature toggles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of feature toggles in body.
     */
    @GetMapping("/feature-toggles")
    public ResponseEntity<List<FeatureToggle>> getAllFeatureToggles() {
        log.debug("REST request to get all FeatureToggles");
        List<FeatureToggle> featureToggles = featureToggleService.findAll();
        return ResponseEntity.ok().body(featureToggles);
    }

    /**
     * {@code GET  /feature-toggles/:key} : get the "key" feature toggle.
     *
     * @param key the key of the feature toggle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the feature toggle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/feature-toggles/{key}")
    public ResponseEntity<FeatureToggle> getFeatureToggle(@PathVariable String key) {
        log.debug("REST request to get FeatureToggle : {}", key);
        FeatureToggle featureToggle = featureToggleService.findOne(key);
        return ResponseEntity.ok().body(featureToggle);
    }

    /**
     * {@code DELETE  /feature-toggles/:key} : delete the "key" feature toggle.
     *
     * @param key the key of the feature toggle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/feature-toggles/{key}")
    public ResponseEntity<Void> deleteFeatureToggle(@PathVariable String key) {
        log.debug("REST request to delete FeatureToggle : {}", key);
        featureToggleService.delete(key);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, key)).build();
    }
}
