package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.repository.StatementRepository;
import gr.ekke.check4facts.repository.search.StatementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Statement}.
 */
@Service
@Transactional
public class StatementService {

    private final Logger log = LoggerFactory.getLogger(StatementService.class);

    private final StatementRepository statementRepository;

    private final StatementSearchRepository statementSearchRepository;

    public StatementService(StatementRepository statementRepository, StatementSearchRepository statementSearchRepository) {
        this.statementRepository = statementRepository;
        this.statementSearchRepository = statementSearchRepository;
    }

    /**
     * Save a statement.
     *
     * @param statement the entity to save.
     * @return the persisted entity.
     */
    public Statement save(Statement statement) {
        log.debug("Request to save Statement : {}", statement);
        Statement result = statementRepository.save(statement);
        statementSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the statements.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Statement> findAll(Pageable pageable) {
        log.debug("Request to get all Statements");
        return statementRepository.findAll(pageable);
    }


    /**
     * Get all the statements with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Statement> findAllWithEagerRelationships(Pageable pageable) {
        return statementRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one statement by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Statement> findOne(Long id) {
        log.debug("Request to get Statement : {}", id);
        return statementRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the statement by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Statement : {}", id);
        statementRepository.deleteById(id);
        statementSearchRepository.deleteById(id);
    }

    /**
     * Search for the statement corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Statement> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Statements for query {}", query);
        return statementSearchRepository.search(queryStringQuery(query), pageable);
    }

    public Integer setFactCheckerLabel(Long id, Boolean label) {
        log.debug("Request to set factCheckerLabel of Statement: {} to : {}", id, label);
        return statementRepository.setFactCheckerLabel(id, label);
    }

    public Integer setFactCheckerAccuracy(Long id, Integer accuracy) {
        log.debug("Request to set factCheckerAccuracy of Statement: {} to : {}", id, accuracy);
        return statementRepository.setFactCheckerAccuracy(id, accuracy);
    }
}
