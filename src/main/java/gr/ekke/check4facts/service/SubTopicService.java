package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.SubTopic;
import gr.ekke.check4facts.repository.SubTopicRepository;
import gr.ekke.check4facts.repository.search.SubTopicSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link SubTopic}.
 */
@Service
@Transactional
public class SubTopicService {

    private final Logger log = LoggerFactory.getLogger(SubTopicService.class);

    private final SubTopicRepository subTopicRepository;

    private final SubTopicSearchRepository subTopicSearchRepository;

    public SubTopicService(SubTopicRepository subTopicRepository, SubTopicSearchRepository subTopicSearchRepository) {
        this.subTopicRepository = subTopicRepository;
        this.subTopicSearchRepository = subTopicSearchRepository;
    }

    /**
     * Save a subTopic.
     *
     * @param subTopic the entity to save.
     * @return the persisted entity.
     */
    public SubTopic save(SubTopic subTopic) {
        log.debug("Request to save SubTopic : {}", subTopic);
        SubTopic result = subTopicRepository.save(subTopic);
        subTopicSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the subTopics.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SubTopic> findAll() {
        log.debug("Request to get all SubTopics");
        return subTopicRepository.findAll();
    }


    /**
     * Get one subTopic by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<SubTopic> findOne(Long id) {
        log.debug("Request to get SubTopic : {}", id);
        return subTopicRepository.findById(id);
    }

    /**
     * Delete the subTopic by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete SubTopic : {}", id);
        subTopicRepository.deleteById(id);
        subTopicSearchRepository.deleteById(id);
    }

    /**
     * Search for the subTopic corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<SubTopic> search(String query) {
        log.debug("Request to search SubTopics for query {}", query);
        return StreamSupport
            .stream(subTopicSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
