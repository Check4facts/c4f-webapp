package gr.ekke.check4facts.service.dto;

import javax.validation.constraints.NotBlank;

public class CeleryTask {
    @NotBlank
    private String id;

    private String statementId;

    public CeleryTask() {
    }

    public CeleryTask(@NotBlank String id, String statementId) {
        this.id = id;
        this.statementId = statementId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStatementId() {
        return statementId;
    }

    public void setStatementId(String statementId) {
        this.statementId = statementId;
    }

    @Override
    public String toString() {
        return "CeleryTask{" +
            "id='" + id + '\'' +
            ", statementId='" + statementId + '\'' +
            '}';
    }
}
