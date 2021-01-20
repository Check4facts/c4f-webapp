package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.FeatureStatement;
import gr.ekke.check4facts.repository.FeatureStatementRepository;
import gr.ekke.check4facts.repository.search.FeatureStatementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

@Service
@Transactional
public class FeatureStatementService {

    private final Logger log = LoggerFactory.getLogger(FeatureStatementService.class);

    private final FeatureStatementRepository featureStatementRepository;

    private final FeatureStatementSearchRepository featureStatementSearchRepository;

    public FeatureStatementService(FeatureStatementRepository featureStatementRepository, FeatureStatementSearchRepository featureStatementSearchRepository) {
        this.featureStatementRepository = featureStatementRepository;
        this.featureStatementSearchRepository = featureStatementSearchRepository;
    }

    public FeatureStatement save(FeatureStatement featureStatement) {
        log.debug("Request to save FeatureStatement : {}", featureStatement);
        FeatureStatement result = featureStatementRepository.save(featureStatement);
        featureStatementSearchRepository.save(result);
        return result;
    }

    @Transactional(readOnly = true)
    public List<FeatureStatement> findAll() {
        log.debug("Request to get all FeatureStatements");
        return featureStatementRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<FeatureStatement> findOne(Long id) {
        log.debug("Request to get FeatureStatement : {}", id);
        return featureStatementRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<FeatureStatement> getLatestFeatureStatementByStatementId(Long statement_id) {
        log.debug("Request to get FeatureStatement with Max harvestIteration by Statement : {}", statement_id);
        return featureStatementRepository.getLatestFeatureStatementByStatementId(statement_id);
    }

    public Integer setTrueLabel(Long id, Boolean label) {
        log.debug("Request to set trueLabel of FeatureStatement : {} to : {}", id, label);
        return featureStatementRepository.setTrueLabel(id, label);
    }

    public void delete(Long id) {
        log.debug("Request to delete FeatureSource : {}", id);
        featureStatementRepository.deleteById(id);
        featureStatementSearchRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<FeatureStatement> search(String query) {
        log.debug("Request to search FeatureStatements for query {}", query);
        return StreamSupport
            .stream(featureStatementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<FeatureStatement> findAllByStatementId(Long statement_id) {
        log.debug("Request to get all FeatureStatements by Statement id: {}", statement_id);
        return featureStatementRepository.findAllByStatementId(statement_id);
    }

    public Integer countAllByStatementId(Long statement_id) {
        log.debug("Request to count all FeatureStatements by Statement id: {}", statement_id);
        return featureStatementRepository.countAllByStatementId(statement_id);
    }
}
