package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.StatementSource;
import gr.ekke.check4facts.repository.StatementSourceRepository;
import gr.ekke.check4facts.repository.search.StatementSourceSearchRepository;
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
 * Service Implementation for managing {@link StatementSource}.
 */
@Service
@Transactional
public class StatementSourceService {

    private final Logger log = LoggerFactory.getLogger(StatementSourceService.class);

    private final StatementSourceRepository statementSourceRepository;

    private final StatementSourceSearchRepository statementSourceSearchRepository;

    public StatementSourceService(StatementSourceRepository statementSourceRepository, StatementSourceSearchRepository statementSourceSearchRepository) {
        this.statementSourceRepository = statementSourceRepository;
        this.statementSourceSearchRepository = statementSourceSearchRepository;
    }

    /**
     * Save a statementSource.
     *
     * @param statementSource the entity to save.
     * @return the persisted entity.
     */
    public StatementSource save(StatementSource statementSource) {
        log.debug("Request to save StatementSource : {}", statementSource);
        StatementSource result = statementSourceRepository.save(statementSource);
        statementSourceSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the statementSources.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StatementSource> findAll() {
        log.debug("Request to get all StatementSources");
        return statementSourceRepository.findAll();
    }


    /**
     * Get one statementSource by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<StatementSource> findOne(Long id) {
        log.debug("Request to get StatementSource : {}", id);
        return statementSourceRepository.findById(id);
    }

    /**
     * Delete the statementSource by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete StatementSource : {}", id);
        statementSourceRepository.deleteById(id);
        statementSourceSearchRepository.deleteById(id);
    }

    /**
     * Search for the statementSource corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<StatementSource> search(String query) {
        log.debug("Request to search StatementSources for query {}", query);
        return StreamSupport
            .stream(statementSourceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
