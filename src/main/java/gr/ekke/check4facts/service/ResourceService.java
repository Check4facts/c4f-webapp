package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Resource;
import gr.ekke.check4facts.repository.ResourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Resource}.
 */
@Service
@Transactional
public class ResourceService {

    private final Logger log = LoggerFactory.getLogger(ResourceService.class);

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    /**
     * Save a resource.
     *
     * @param resource the entity to save.
     * @return the persisted entity.
     */
    public Resource save(Resource resource) {
        log.debug("Request to save Resource : {}", resource);
        Resource result = resourceRepository.save(resource);
        return result;
    }

    /**
     * Get all the resources.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Resource> findAll(Pageable pageable) {
        log.debug("Request to get all Resources");
        return resourceRepository.findAll(pageable);
    }


    /**
     * Get one resource by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Resource> findOne(Long id) {
        log.debug("Request to get Resource : {}", id);
        return resourceRepository.findById(id);
    }

    /**
     * Delete the resource by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Resource : {}", id);
        resourceRepository.deleteById(id);
    }

    /**
     * Get all the resources by statement id.
     *
     * @param statement_id the id of the statement
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Resource> findAllByStatementId(Long statement_id, Pageable pageable) {
        log.debug("Request to get all Resources by statement id: {}", statement_id);
        return resourceRepository.findAllByStatementId(statement_id, pageable);
    }

    @Transactional(readOnly = true)
    public List<Resource> findAllLatestByStatementId(Long statement_id) {
        log.debug("Request to get all Resources with max harvestIteration by Statement : {}", statement_id);
        return resourceRepository.findAllLatestByStatementId(statement_id);
    }
}
