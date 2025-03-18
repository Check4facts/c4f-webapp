package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.Justification;
import gr.ekke.check4facts.repository.JustificationRepository;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Justification}.
 */
@Service
@Transactional
public class JustificationService {

    private final Logger log = LoggerFactory.getLogger(JustificationService.class);

    private final JustificationRepository justificationRepository;

    public JustificationService(JustificationRepository justificationRepository) {
        this.justificationRepository = justificationRepository;
    }

    public Justification save(Justification justification) {
        log.debug("Request to save Justification : {}", justification);
        Justification result = justificationRepository.save(justification);
        return result;
    }

    @Transactional(readOnly = true)
    public Page<Justification> findAll(Pageable pageable) {
        log.debug("Request to get all Justifications");
        return justificationRepository.findAllByTimestampDesc(pageable);
    }

    @Transactional(readOnly = true)
    public List<Justification> findAllByStatementIdOrderByTimestampDesc(Long statementId) {
        log.debug("Request to get all Justifications for Statement wit id: {}", statementId);
        return justificationRepository.findAllByStatementIdOrderByTimestampDesc(statementId);
    }

    @Transactional(readOnly = true)
    public Optional<Justification> findOne(Long id) {
        log.debug("Request to get Justfication : {}", id);
        return justificationRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Justification> findFirstByStatementIdOrderByTimestampDesc(Long statementId) {
        log.debug("Request to get latest Justfication by Statement with id : {}", statementId);
        return justificationRepository.findFirstByStatementIdOrderByTimestampDesc(statementId);
    }

    public void delete(Long id) {
        log.debug("Request to delete Justification : {}", id);
        justificationRepository.deleteById(id);
    }
}
