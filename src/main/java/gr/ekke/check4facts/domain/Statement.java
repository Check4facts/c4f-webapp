package gr.ekke.check4facts.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Statement.
 */
@Entity
@Table(name = "statement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "statement")
public class Statement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "author")
    private String author;

    @Column(name = "statement_date")
    private Instant statementDate;

    @Column(name = "registration_date")
    private Instant registrationDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "main_article_text")
    private String mainArticleText;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "main_article_url")
    private String mainArticleUrl;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "statement_id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SubTopic> subTopics = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "statement_id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<StatementSource> statementSources = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "statement_id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Resource> resources = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "statements", allowSetters = true)
    private Topic topic;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Statement text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public Statement author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Instant getStatementDate() {
        return statementDate;
    }

    public Statement statementDate(Instant statementDate) {
        this.statementDate = statementDate;
        return this;
    }

    public void setStatementDate(Instant statementDate) {
        this.statementDate = statementDate;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public Statement registrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getMainArticleText() {
        return mainArticleText;
    }

    public Statement mainArticleText(String mainArticleText) {
        this.mainArticleText = mainArticleText;
        return this;
    }

    public void setMainArticleText(String mainArticleText) {
        this.mainArticleText = mainArticleText;
    }

    public String getMainArticleUrl() {
        return mainArticleUrl;
    }

    public Statement mainArticleUrl(String mainArticleUrl) {
        this.mainArticleUrl = mainArticleUrl;
        return this;
    }

    public void setMainArticleUrl(String mainArticleUrl) {
        this.mainArticleUrl = mainArticleUrl;
    }

    public Set<SubTopic> getSubTopics() {
        return subTopics;
    }

    public Statement subTopics(Set<SubTopic> subTopics) {
        this.subTopics = subTopics;
        return this;
    }

    public Statement addSubTopics(SubTopic subTopic) {
        this.subTopics.add(subTopic);
        subTopic.setStatement(this);
        return this;
    }

    public Statement removeSubTopics(SubTopic subTopic) {
        this.subTopics.remove(subTopic);
        subTopic.setStatement(null);
        return this;
    }

    public void setSubTopics(Set<SubTopic> subTopics) {
        this.subTopics = subTopics;
    }

    public Set<StatementSource> getStatementSources() {
        return statementSources;
    }

    public Statement statementSources(Set<StatementSource> statementSources) {
        this.statementSources = statementSources;
        return this;
    }

    public Statement addStatementSources(StatementSource statementSource) {
        this.statementSources.add(statementSource);
        statementSource.setStatement(this);
        return this;
    }

    public Statement removeStatementSources(StatementSource statementSource) {
        this.statementSources.remove(statementSource);
        statementSource.setStatement(null);
        return this;
    }

    public void setStatementSources(Set<StatementSource> statementSources) {
        this.statementSources = statementSources;
    }

    public Set<Resource> getResources() {
        return resources;
    }

    public Statement resources(Set<Resource> resources) {
        this.resources = resources;
        return this;
    }

    public Statement addResources(Resource resource) {
        this.resources.add(resource);
        resource.setStatement(this);
        return this;
    }

    public Statement removeResources(Resource resource) {
        this.resources.remove(resource);
        resource.setStatement(null);
        return this;
    }

    public void setResources(Set<Resource> resources) {
        this.resources = resources;
    }

    public Topic getTopic() {
        return topic;
    }

    public Statement topic(Topic topic) {
        this.topic = topic;
        return this;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Statement)) {
            return false;
        }
        return id != null && id.equals(((Statement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Statement{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", author='" + getAuthor() + "'" +
            ", statementDate='" + getStatementDate() + "'" +
            ", registrationDate='" + getRegistrationDate() + "'" +
            ", mainArticleText='" + getMainArticleText() + "'" +
            ", mainArticleUrl='" + getMainArticleUrl() + "'" +
            "}";
    }
}