package gr.ekke.check4facts.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "article")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "category", nullable = false)
    private String category;

    @NotNull
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "last_modified")
    private Instant lastModified;

    @Lob
    @Column(name = "preview_image")
    private byte[] previewImage;

    @Column(name = "preview_image_content_type")
    private String previewImageContentType;

    @NotNull
    @Column(name = "preview_title", nullable = false)
    private String previewTitle;

    @Column(name = "published")
    private Boolean published;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public Article category(String category) {
        this.category = category;
        return this;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public Article content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getLastModified() {
        return lastModified;
    }

    public Article lastModified(Instant lastModified) {
        this.lastModified = lastModified;
        return this;
    }

    public void setLastModified(Instant lastModified) {
        this.lastModified = lastModified;
    }

    public byte[] getPreviewImage() {
        return previewImage;
    }

    public Article previewImage(byte[] previewImage) {
        this.previewImage = previewImage;
        return this;
    }

    public void setPreviewImage(byte[] previewImage) {
        this.previewImage = previewImage;
    }

    public String getPreviewImageContentType() {
        return previewImageContentType;
    }

    public Article previewImageContentType(String previewImageContentType) {
        this.previewImageContentType = previewImageContentType;
        return this;
    }

    public void setPreviewImageContentType(String previewImageContentType) {
        this.previewImageContentType = previewImageContentType;
    }

    public String getPreviewTitle() {
        return previewTitle;
    }

    public Article previewTitle(String previewTitle) {
        this.previewTitle = previewTitle;
        return this;
    }

    public void setPreviewTitle(String previewTitle) {
        this.previewTitle = previewTitle;
    }

    public Boolean isPublished() {
        return published;
    }

    public Article published(Boolean published) {
        this.published = published;
        return this;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", category='" + getCategory() + "'" +
            ", content='" + getContent() + "'" +
            ", lastModified='" + getLastModified() + "'" +
            ", previewImage='" + getPreviewImage() + "'" +
            ", previewImageContentType='" + getPreviewImageContentType() + "'" +
            ", previewTitle='" + getPreviewTitle() + "'" +
            ", published='" + isPublished() + "'" +
            "}";
    }
}
