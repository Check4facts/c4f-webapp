package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.FeatureToggle;
import gr.ekke.check4facts.repository.FeatureToggleRepository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FeatureToggleService {

    private final Logger log = LoggerFactory.getLogger(FeatureToggleService.class);

    private final FeatureToggleRepository featureToggleRepository;

    public FeatureToggleService(FeatureToggleRepository featureToggleRepository) {
        this.featureToggleRepository = featureToggleRepository;
    }

    /**
     * Save a feature toggle.
     *
     * @param featureToggle the entity to save.
     * @return the persisted entity.
     */
    public FeatureToggle save(FeatureToggle featureToggle) {
        log.debug("Request to save FeatureToggle : {}", featureToggle);
        return featureToggleRepository.save(featureToggle);
    }

    /**
     * Get all the feature toggles.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FeatureToggle> findAll() {
        log.debug("Request to get all FeatureToggles");
        return featureToggleRepository.findAll();
    }

    /**
     * Get one feature toggle by key.
     *
     * @param key the key of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public FeatureToggle findOne(String key) {
        log.debug("Request to get FeatureToggle : {}", key);
        return featureToggleRepository.findById(key).orElse(null);
    }

    /**
     * Delete the feature toggle by key.
     *
     * @param key the key of the entity.
     */
    public void delete(String key) {
        log.debug("Request to delete FeatureToggle : {}", key);
        featureToggleRepository.deleteById(key);
    }
}
