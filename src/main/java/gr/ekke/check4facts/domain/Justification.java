package gr.ekke.check4facts.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Table(name = "justification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
public class Justification implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @NotNull
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "label")
    private String label;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(name = "elapsed_time", columnDefinition = "float8")
    private Double elapsedTime;

    @Column(name = "model")
    private String model;

    @Type(type = "list-array")
    @Column(name = "sources", columnDefinition = "text[]")
    private List<String> sources;

    @ManyToOne
    @JsonBackReference
    private Statement statement;

    public Justification() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Justification text(String text) {
        this.text = text;
        return this;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Justification label(String label) {
        this.label = label;
        return this;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Justification timestamp(Instant timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public Double getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(Double elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public Justification elapsedTime(Double elapsedTime) {
        this.elapsedTime = elapsedTime;
        return this;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Justification model(String model) {
        this.model = model;
        return this;
    }

    public List<String> getSources() {
        return sources;
    }

    public void setSources(List<String> sources) {
        this.sources = sources;
    }

    public Justification sources(List<String> sources) {
        this.sources = sources;
        return this;
    }

    public Statement getStatement() {
        return statement;
    }

    public Justification statement(Statement statement) {
        this.statement = statement;
        return this;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Justification)) return false;
        return id != null && id.equals(((Justification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Justification{" +
            "id=" + getId() +
            ", text='" + getText() + '\'' +
            ", label='" + getLabel() + '\'' +
            ", timestamp=" + getTimestamp() +
            ", elapsedTime=" + getElapsedTime() +
            ", model='" + getModel() + '\'' +
            ", sources=" + getSources() +
            ", statement=" + getStatement().getId() +
        "}";
    }


}
