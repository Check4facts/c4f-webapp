package gr.ekke.check4facts.domain;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "kombu_message")
public class KombuMessage implements Serializable {

    @Id
    private Integer id;

    @Column(name = "visible")
    private Boolean visible;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "payload")
    private String payload;

    @Column(name = "version")
    private Integer version;

    @Column(name = "queue_id")
    private Integer queueId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Integer getQueueId() {
        return queueId;
    }

    public void setQueueId(Integer queueId) {
        this.queueId = queueId;
    }
}
