package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.JustificationSource;
import gr.ekke.check4facts.repository.JustificationSourceRepository;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link JustificationSource}.
 */
@Service
@Transactional
public class JustificationSourceService {

    private final Logger log = LoggerFactory.getLogger(JustificationService.class);

    private final JustificationSourceRepository justificationSourceRepository;

    public JustificationSourceService(JustificationSourceRepository justificationSourceRepository) {
        this.justificationSourceRepository = justificationSourceRepository;
    }

    /**
     * Save a justificationSource.
     *
     * @param justificationSource the entity to save.
     * @return the persisted entity.
     */
    public JustificationSource save(JustificationSource justificationSource) {
        log.debug("Request to save JustificationSource : {}", justificationSource);
        return justificationSourceRepository.save(justificationSource);
    }

    /**
     * Save a list of justificationSources.
     *
     * @param justificationSources the list of entities to save.
     * @return the list of persisted entities.
     */
    @Transactional
    public List<JustificationSource> saveAll(List<JustificationSource> justificationSources) {
        log.debug("Request to save a list of JustificationSources : {}", justificationSources);
        return justificationSourceRepository.saveAll(justificationSources);
    }

    /**
     * Get a justificationSource by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<JustificationSource> findOne(Long id) {
        log.debug("Request to get JustificationSource with id : {}", id);
        return justificationSourceRepository.findById(id);
    }

    /**
     * Get all the justificationSources.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<JustificationSource> findAll() {
        log.debug("Request to get all JustificationSources");
        return justificationSourceRepository.findAll();
    }

    /**
     * Get all the justificationSources where blackListed is true.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<JustificationSource> findAllByBlackListedTrue() {
        log.debug("Request to get all JustificationSources where blackListed is true");
        return justificationSourceRepository.findAllByBlackListedTrue();
    }

    /**
     * Get all the justificationSources where blackListed is false.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<JustificationSource> findAllByBlackListedFalse() {
        log.debug("Request to get all JustificationSources where blackListed is false");
        return justificationSourceRepository.findAllByBlackListedFalse();
    }

    /**
     * Delete the justificationSource by id.
     *
     * @param id the id of the entity to delete.
     */
    public void delete(Long id) {
        log.debug("Request to delete JustificationSource with id : {}", id);
        justificationSourceRepository.deleteById(id);
    }

}
