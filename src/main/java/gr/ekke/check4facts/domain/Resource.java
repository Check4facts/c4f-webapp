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

import gr.ekke.check4facts.domain.enumeration.FileFormat;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "resource")
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "url", nullable = false)
    private String url;

    @NotNull
    @Column(name = "harvest_iteration", nullable = false)
    private Long harvestIteration;


    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "snippet")
    private String snippet;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "html_snippet")
    private String htmlSnippet;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_format")
    private FileFormat fileFormat;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "body")
    private String body;

    @NotNull
    @Column(name = "harvest_date", nullable = false)
    private Instant harvestDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "resources", allowSetters = true)
    private Statement statement;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Resource url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getHarvestIteration() {
        return harvestIteration;
    }

    public Resource harvestIteration(Long harvestIteration) {
        this.harvestIteration = harvestIteration;
        return this;
    }

    public void setHarvestIteration(Long harvestIteration) {
        this.harvestIteration = harvestIteration;
    }

    public String getTitle() {
        return title;
    }

    public Resource title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSnippet() {
        return snippet;
    }

    public Resource snippet(String snippet) {
        this.snippet = snippet;
        return this;
    }

    public void setSnippet(String snippet) {
        this.snippet = snippet;
    }

    public String getHtmlSnippet() {
        return htmlSnippet;
    }

    public Resource htmlSnippet(String htmlSnippet) {
        this.htmlSnippet = htmlSnippet;
        return this;
    }

    public void setHtmlSnippet(String htmlSnippet) {
        this.htmlSnippet = htmlSnippet;
    }

    public FileFormat getFileFormat() {
        return fileFormat;
    }

    public Resource fileFormat(FileFormat fileFormat) {
        this.fileFormat = fileFormat;
        return this;
    }

    public void setFileFormat(FileFormat fileFormat) {
        this.fileFormat = fileFormat;
    }

    public String getBody() {
        return body;
    }

    public Resource body(String body) {
        this.body = body;
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Instant getHarvestDate() {
        return harvestDate;
    }

    public Resource harvestDate(Instant harvestDate) {
        this.harvestDate = harvestDate;
        return this;
    }

    public void setHarvestDate(Instant harvestDate) {
        this.harvestDate = harvestDate;
    }

    public Statement getStatement() {
        return statement;
    }

    public Resource statement(Statement statement) {
        this.statement = statement;
        return this;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resource)) {
            return false;
        }
        return id != null && id.equals(((Resource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Resource{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", harvestIteration=" + getHarvestIteration() +
            ", title='" + getTitle() + "'" +
            ", snippet='" + getSnippet() + "'" +
            ", htmlSnippet='" + getHtmlSnippet() + "'" +
            ", fileFormat='" + getFileFormat() + "'" +
            ", body='" + getBody() + "'" +
            ", harvestDate='" + getHarvestDate() + "'" +
            "}";
    }
}
