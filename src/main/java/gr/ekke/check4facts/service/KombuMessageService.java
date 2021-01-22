package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.KombuMessage;
import gr.ekke.check4facts.repository.KombuMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class KombuMessageService {

    private final Logger log = LoggerFactory.getLogger(KombuMessage.class);

    private final KombuMessageRepository kombuMessageRepository;

    public KombuMessageService(KombuMessageRepository kombuMessageRepository) {
        this.kombuMessageRepository = kombuMessageRepository;
    }

    @Transactional(readOnly = true)
    public List<KombuMessage> findAll() {
        log.debug("Request to get all KombuMessages");
        return kombuMessageRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<KombuMessage> findOne(Integer id) {
        log.debug("Request to get KombuMessage : {}", id);
        return kombuMessageRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<KombuMessage> findKombuMessageByTaskId(String task_id) {
        log.debug("Request to get KombuMessage by task_id : {}", task_id);
        return kombuMessageRepository.findKombuMessageByTaskId(task_id);
    }
}
