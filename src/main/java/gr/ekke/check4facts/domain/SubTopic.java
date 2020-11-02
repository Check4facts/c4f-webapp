package gr.ekke.check4facts.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SubTopic.
 */
@Entity
@Table(name = "sub_topic")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "subtopic")
public class SubTopic implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "subTopics")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Statement> statements = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SubTopic name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Statement> getStatements() {
        return statements;
    }

    public SubTopic statements(Set<Statement> statements) {
        this.statements = statements;
        return this;
    }

    public SubTopic addStatements(Statement statement) {
        this.statements.add(statement);
        statement.getSubTopics().add(this);
        return this;
    }

    public SubTopic removeStatements(Statement statement) {
        this.statements.remove(statement);
        statement.getSubTopics().remove(this);
        return this;
    }

    public void setStatements(Set<Statement> statements) {
        this.statements = statements;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubTopic)) {
            return false;
        }
        return id != null && id.equals(((SubTopic) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubTopic{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
