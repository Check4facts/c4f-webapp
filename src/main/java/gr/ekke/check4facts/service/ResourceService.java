package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Resource;
import gr.ekke.check4facts.repository.ResourceRepository;
import gr.ekke.check4facts.repository.search.ResourceSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private final ResourceSearchRepository resourceSearchRepository;

    public ResourceService(ResourceRepository resourceRepository, ResourceSearchRepository resourceSearchRepository) {
        this.resourceRepository = resourceRepository;
        this.resourceSearchRepository = resourceSearchRepository;
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
        resourceSearchRepository.save(result);
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
        resourceSearchRepository.deleteById(id);
    }

    /**
     * Search for the resource corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Resource> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Resources for query {}", query);
        return resourceSearchRepository.search(queryStringQuery(query), pageable);
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
}
