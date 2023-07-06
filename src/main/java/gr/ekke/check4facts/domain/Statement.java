package gr.ekke.check4facts.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A Statement.
 */
@Entity
@Table(name = "statement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "statement")
@TypeDef(name = "list-array", typeClass = ListArrayType.class)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id", scope = Statement.class)
public class Statement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "text", nullable = false)
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String text;

    @Column(name = "author")
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String author;

    @Column(name = "statement_date")
    private Instant statementDate;

    @Column(name = "publication_date")
    private Instant publicationDate;

    @Column(name = "registration_date")
    private Instant registrationDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "main_article_title")
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String mainArticleTitle;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "main_article_text")
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String mainArticleText;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "main_article_url")
    private String mainArticleUrl;

    @Column(name = "fact_checker_accuracy")
    private Integer factCheckerAccuracy;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "statement_id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonManagedReference
    private Set<StatementSource> statementSources = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "statements", allowSetters = true)
    private Topic topic;

    @Basic
    @Type(type = "list-array")
    @Column(name = "sub_topics", columnDefinition = "varchar(255)[]")
    private List<String> subTopics;

    @OneToOne(mappedBy = "statement")
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Statement() {
    }    

    public Statement(Integer factCheckerAccuracy, String author, String mainArticleUrl) {
        this.author = author;
        this.mainArticleUrl = mainArticleUrl;
        this.factCheckerAccuracy = factCheckerAccuracy;
    }

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

    public Statement text(String text) {
        this.text = text;
        return this;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Statement author(String author) {
        this.author = author;
        return this;
    }

    public Instant getStatementDate() {
        return statementDate;
    }

    public void setStatementDate(Instant statementDate) {
        this.statementDate = statementDate;
    }

    public Statement statementDate(Instant statementDate) {
        this.statementDate = statementDate;
        return this;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Statement registrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
        return this;
    }

    public String getMainArticleTitle() {
        return mainArticleTitle;
    }

    public void setMainArticleTitle(String mainArticleTitle) {
        this.mainArticleTitle = mainArticleTitle;
    }

    public Statement mainArticleTitle(String mainArticleTitle) {
        this.mainArticleTitle = mainArticleTitle;
        return this;
    }

    public String getMainArticleText() {
        return mainArticleText;
    }

    public void setMainArticleText(String mainArticleText) {
        this.mainArticleText = mainArticleText;
    }

    public Statement mainArticleText(String mainArticleText) {
        this.mainArticleText = mainArticleText;
        return this;
    }

    public String getMainArticleUrl() {
        return mainArticleUrl;
    }

    public void setMainArticleUrl(String mainArticleUrl) {
        this.mainArticleUrl = mainArticleUrl;
    }

    public Statement mainArticleUrl(String mainArticleUrl) {
        this.mainArticleUrl = mainArticleUrl;
        return this;
    }

    public Integer getFactCheckerAccuracy() {
        return factCheckerAccuracy;
    }

    public void setFactCheckerAccuracy(Integer factCheckerAccuracy) {
        this.factCheckerAccuracy = factCheckerAccuracy;
    }

    public Statement factCheckerAccuracy(Integer factCheckerAccuracy) {
        this.factCheckerAccuracy = factCheckerAccuracy;
        return this;
    }

    public Set<StatementSource> getStatementSources() {
        return statementSources;
    }

    public void setStatementSources(Set<StatementSource> statementSources) {
        if (statementSources != null) {
            this.statementSources.addAll(statementSources);
        }
    }

    public Statement statementSources(Set<StatementSource> statementSources) {
        this.statementSources.addAll(statementSources);
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

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public Statement topic(Topic topic) {
        this.topic = topic;
        return this;
    }

    public List<String> getSubTopics() {
        return subTopics;
    }

    public void setSubTopics(List<String> subTopics) {
        this.subTopics = subTopics;
    }

    public Statement subTopics(List<String> subTopics) {
        this.subTopics = subTopics;
        return this;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Instant getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Instant publicationDate) {
        this.publicationDate = publicationDate;
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
                ", publicationDate='" + getPublicationDate() + "'" +
                ", registrationDate='" + getRegistrationDate() + "'" +
                ", mainArticleTitle='" + getMainArticleTitle() + "'" +
                ", mainArticleText='" + getMainArticleText() + "'" +
                ", mainArticleUrl='" + getMainArticleUrl() + "'" +
                ", factCheckerAccuracy='" + getFactCheckerAccuracy() + "'" +
                ", subTopics='" + getSubTopics() + "'" +
                "}";
    }
}
