package gr.ekke.check4facts.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "news")
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String title;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "preview_text", nullable = false)
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String previewText;

    @Column(name = "date")
    private Instant date;

    @Lob
    @NotNull
    @Column(name = "content", nullable = false)
    @Field(type = FieldType.Text, analyzer = "greek", searchAnalyzer = "greek")
    private String content;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public News title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPreviewText() {
        return previewText;
    }

    public News previewText(String previewText) {
        this.previewText = previewText;
        return this;
    }

    public void setPreviewText(String previewText) {
        this.previewText = previewText;
    }

    public Instant getDate() {
        return date;
    }

    public News date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public News content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
