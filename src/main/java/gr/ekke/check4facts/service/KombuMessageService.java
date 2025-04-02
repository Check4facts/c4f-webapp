package gr.ekke.check4facts.service;

import gr.ekke.check4facts.domain.KombuMessage;
import gr.ekke.check4facts.repository.KombuMessageRepository;
import gr.ekke.check4facts.service.dto.CeleryTask;
import gr.ekke.check4facts.service.dto.TaskStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class KombuMessageService {

    private final Logger log = LoggerFactory.getLogger(KombuMessage.class);

    private final KombuMessageRepository kombuMessageRepository;

    @Value("${spring.profiles.active}")
    private List<String> activeProfiles;

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
    public List<TaskStatus> findAllActiveTasksInLast24Hours(String authToken) throws JSONException {
        log.debug("Request to get TaskStatus of active CeleryTasks in last 24 hours");
        List<KombuMessage> kombuMessages = kombuMessageRepository.findAllInLast24Hours();
        List<CeleryTask> celeryTasks = new ArrayList<>();
        boolean isInDevelopment = activeProfiles.contains("dev");
        // String baseUrlTemplate = "https://check4facts.gr/ml/batch-task-status";
        String baseUrlTemplate = isInDevelopment ? "http://localhost:9090/batch-task-status" : "https://check4facts.gr/ml/batch-task-status";
        for (KombuMessage kombuMessage : kombuMessages) {
            JSONObject jsonObject = new JSONObject(kombuMessage.getPayload());
            JSONObject header = jsonObject.getJSONObject("headers");
            String taskId = header.getString("id");
            JSONObject kwargsrepr = new JSONObject(header.getString("kwargsrepr"));
            String statementId = kwargsrepr.isNull("statement") ? null : kwargsrepr.getJSONObject("statement").getString("id");
            celeryTasks.add(new CeleryTask(taskId, statementId));
        }
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + authToken);
        HttpEntity<Object> requestEntity = new HttpEntity<>(celeryTasks, headers);
        ResponseEntity<List<TaskStatus>> responseEntity = restTemplate.exchange(baseUrlTemplate, HttpMethod.POST, requestEntity, new ParameterizedTypeReference<List<TaskStatus>>() {});

        List<TaskStatus> taskStatuses = responseEntity.getBody();
        assert taskStatuses != null;
        taskStatuses.removeIf(taskStatus -> taskStatus.getStatus().equals("SUCCESS"));

        return taskStatuses;
    }
}
