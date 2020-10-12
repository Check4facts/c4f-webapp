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

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "preview_title", nullable = false)
    private String previewTitle;

    @Lob
    @Column(name = "preview_image")
    private byte[] previewImage;

    @Column(name = "preview_image_content_type")
    private String previewImageContentType;

    @Column(name = "article_date")
    private Instant articleDate;

    @Column(name = "fact_creator")
    private String factCreator;

    @Column(name = "author")
    private String author;

    @Column(name = "published")
    private Boolean published;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "content", nullable = false)
    private String content;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "preview_text", nullable = false)
    private String previewText;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "articles", allowSetters = true)
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Instant getArticleDate() {
        return articleDate;
    }

    public Article articleDate(Instant articleDate) {
        this.articleDate = articleDate;
        return this;
    }

    public void setArticleDate(Instant articleDate) {
        this.articleDate = articleDate;
    }

    public String getFactCreator() {
        return factCreator;
    }

    public Article factCreator(String factCreator) {
        this.factCreator = factCreator;
        return this;
    }

    public void setFactCreator(String factCreator) {
        this.factCreator = factCreator;
    }

    public String getAuthor() {
        return author;
    }

    public Article author(String author) {
        this.author = author;
        return this;
    }

    public void setAuthor(String author) {
        this.author = author;
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

    public String getPreviewText() {
        return previewText;
    }

    public Article previewText(String previewText) {
        this.previewText = previewText;
        return this;
    }

    public void setPreviewText(String previewText) {
        this.previewText = previewText;
    }

    public Category getCategory() {
        return category;
    }

    public Article category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
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
            ", previewTitle='" + getPreviewTitle() + "'" +
            ", previewImage='" + getPreviewImage() + "'" +
            ", previewImageContentType='" + getPreviewImageContentType() + "'" +
            ", articleDate='" + getArticleDate() + "'" +
            ", factCreator='" + getFactCreator() + "'" +
            ", author='" + getAuthor() + "'" +
            ", published='" + isPublished() + "'" +
            ", content='" + getContent() + "'" +
            ", previewText='" + getPreviewText() + "'" +
            "}";
    }
}
