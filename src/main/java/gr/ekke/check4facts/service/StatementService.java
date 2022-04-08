package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Statement;
import gr.ekke.check4facts.repository.ArticleRepository;
import gr.ekke.check4facts.repository.FeatureStatementRepository;
import gr.ekke.check4facts.repository.ResourceRepository;
import gr.ekke.check4facts.repository.StatementRepository;
import gr.ekke.check4facts.repository.search.ArticleSearchRepository;
import gr.ekke.check4facts.repository.search.StatementSearchRepository;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
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

    private final ResourceRepository resourceRepository;

    private  final FeatureStatementRepository featureStatementRepository;

    private final ArticleRepository articleRepository;

    private final ArticleService articleService;

    public StatementService(StatementRepository statementRepository, StatementSearchRepository statementSearchRepository, ResourceRepository resourceRepository, FeatureStatementRepository featureStatementRepository, ArticleRepository articleRepository, ArticleSearchRepository articleSearchRepository, ArticleService articleService) {
        this.statementRepository = statementRepository;
        this.statementSearchRepository = statementSearchRepository;
        this.resourceRepository = resourceRepository;
        this.featureStatementRepository = featureStatementRepository;
        this.articleRepository = articleRepository;
        this.articleService = articleService;
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
     * Get one statement by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Statement> findOne(Long id) {
        log.debug("Request to get Statement : {}", id);
        return statementRepository.findById(id);
    }

    /**
     * Delete the statement by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Statement : {}", id);
        articleRepository.findArticleByStatementId(id).ifPresent(article -> {
            articleService.delete(article.getId());
        });
        resourceRepository.deleteByStatementId(id);
        featureStatementRepository.deleteByStatementId(id);
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
        QueryStringQueryBuilder queryBuilder = queryStringQuery(query).field("mainArticleTitle", 2).field("mainArticleText");
        return statementSearchRepository.search(queryBuilder, pageable);
    }

    public Integer setFactCheckerAccuracy(Long id, Integer accuracy) {
        log.debug("Request to set factCheckerAccuracy of Statement: {} to : {}", id, accuracy);
        return statementRepository.setFactCheckerAccuracy(id, accuracy);
    }
}
