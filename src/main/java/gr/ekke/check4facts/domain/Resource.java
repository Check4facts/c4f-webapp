package gr.ekke.check4facts.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

import gr.ekke.check4facts.domain.enumeration.FileFormat;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "title")
    private String title;

    @Column(name = "title_fertile_terms")
    private Integer titleFertileTerms;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "sim_sentence")
    private String simSentence;

    @Column(name = "sim_sentence_fertile_terms")
    private Integer simSentenceFertileTerms;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "sim_paragraph")
    private String simParagraph;

    @Column(name = "sim_paragraph_fertile_terms")
    private Integer simParagraphFertileTerms;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_format")
    private FileFormat fileFormat;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "body")
    private String body;

    @Column(name = "number_of_sentences")
    private Integer numberOfSentences;

    @NotNull
    @Column(name = "harvest_date", nullable = false)
    private Instant harvestDate;

    @ManyToOne
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

    public String getSimSentence() {
        return simSentence;
    }

    public Resource simSentence(String simSentence) {
        this.simSentence = simSentence;
        return this;
    }

    public void setSimSentence(String simSentence) {
        this.simSentence = simSentence;
    }

    public String getSimParagraph() {
        return simParagraph;
    }

    public Resource simParagraph(String simParagraph) {
        this.simParagraph = simParagraph;
        return this;
    }

    public void setSimParagraph(String simParagraph) {
        this.simParagraph = simParagraph;
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

    public Integer getTitleFertileTerms() {
        return titleFertileTerms;
    }

    public Resource titleFertileTerms(Integer titleFertileTerms) {
        this.titleFertileTerms = titleFertileTerms;
        return this;
    }

    public void setTitleFertileTerms(Integer titleFertileTerms) {
        this.titleFertileTerms = titleFertileTerms;
    }

    public Integer getSimSentenceFertileTerms() {
        return simSentenceFertileTerms;
    }

    public Resource simSentenceFertileTerms(Integer simSentenceFertileTerms) {
        this.simSentenceFertileTerms = simSentenceFertileTerms;
        return this;
    }

    public void setSimSentenceFertileTerms(Integer simSentenceFertileTerms) {
        this.simSentenceFertileTerms = simSentenceFertileTerms;
    }

    public Integer getSimParagraphFertileTerms() {
        return simParagraphFertileTerms;
    }

    public Resource simParagraphFertileTerms(Integer simParagraphFertileTerms) {
        this.simParagraphFertileTerms = simParagraphFertileTerms;
        return this;
    }

    public void setSimParagraphFertileTerms(Integer simParagraphFertileTerms) {
        this.simParagraphFertileTerms = simParagraphFertileTerms;
    }

    public Integer getNumberOfSentences() {
        return numberOfSentences;
    }

    public Resource numberOfSentences(Integer numberOfSentences) {
        this.numberOfSentences = numberOfSentences;
        return this;
    }

    public void setNumberOfSentences(Integer numberOfSentences) {
        this.numberOfSentences = numberOfSentences;
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

    @Override
    public String toString() {
        return "Resource{" +
            "id=" + id +
            ", url='" + url + '\'' +
            ", harvestIteration=" + harvestIteration +
            ", title='" + title + '\'' +
            ", titleFertileTerms=" + titleFertileTerms +
            ", simSentence='" + simSentence + '\'' +
            ", simSentenceFertileTerms=" + simSentenceFertileTerms +
            ", simParagraph='" + simParagraph + '\'' +
            ", simParagraphFertileTerms=" + simParagraphFertileTerms +
            ", fileFormat=" + fileFormat +
            ", body='" + body + '\'' +
            ", numberOfSentences=" + numberOfSentences +
            ", harvestDate=" + harvestDate +
            ", statement=" + statement +
            '}';
    }
}
