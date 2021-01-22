package gr.ekke.check4facts.web.rest;

import gr.ekke.check4facts.domain.KombuMessage;
import gr.ekke.check4facts.service.KombuMessageService;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class KombuMessageResource {

    private final Logger log = LoggerFactory.getLogger(KombuMessage.class);

    private static final   String ENTITY_NAME = "kombuMessage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public final KombuMessageService kombuMessageService;

    public KombuMessageResource(KombuMessageService kombuMessageService) {
        this.kombuMessageService = kombuMessageService;
    }

    @GetMapping("/kombu-messages")
    public List<KombuMessage> getAllKombuMessages() {
        log.debug("REST request to get all KombuMessages");
        return kombuMessageService.findAll();
    }

    @GetMapping("/kombu-messages/{id}")
    public ResponseEntity<KombuMessage> getKombuMessage(@PathVariable Integer id) {
        log.debug("REST request to get KombuMessage : {}", id);
        Optional<KombuMessage> kombuMessage = kombuMessageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(kombuMessage);
    }

    @GetMapping("/kombu-messages/task_id/{task_id}")
    public ResponseEntity<KombuMessage> getKombuMessageByTaskId(@PathVariable String task_id) {
        log.debug("REST request to get KombuMessage by task_id: {}", task_id);
        Optional<KombuMessage> kombuMessage = kombuMessageService.findKombuMessageByTaskId(task_id);
        return ResponseUtil.wrapOrNotFound(kombuMessage);
    }
}
