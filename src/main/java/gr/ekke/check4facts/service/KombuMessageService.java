package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.KombuMessage;
import gr.ekke.check4facts.repository.KombuMessageRepository;
import gr.ekke.check4facts.service.dto.CeleryTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Transactional(readOnly = true)
    public List<CeleryTask> findAllCeleryTasksInLast24Hours() throws JSONException {
        log.debug("Request to get CeleryTasks in last 24 hours");
        List<KombuMessage> kombuMessages = kombuMessageRepository.findAllInLast24Hours();
        List<CeleryTask> celeryTasks = new ArrayList<>();
        for (KombuMessage kombuMessage : kombuMessages) {
            JSONObject jsonObject = new JSONObject(kombuMessage.getPayload());
            JSONObject header = jsonObject.getJSONObject("headers");
            String taskId = header.getString("id");
            JSONObject kwargsrepr = new JSONObject(header.getString("kwargsrepr"));
            String statementId = kwargsrepr.isNull("statement") ? null : kwargsrepr.getJSONObject("statement").getString("id");
            celeryTasks.add(new CeleryTask(taskId, statementId));
        }
        return celeryTasks;
    }
}
