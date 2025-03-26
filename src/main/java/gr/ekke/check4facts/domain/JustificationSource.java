package gr.ekke.check4facts.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "justification_source")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class JustificationSource implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @NotNull
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "created_at", columnDefinition = "timestamp")
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "black_listed")
    private Boolean blackListed;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public JustificationSource url(String url) {
        this.url = url;
        return this;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public JustificationSource createdAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public Boolean getBlackListed() {
        return blackListed;
    }

    public void setBlackListed(Boolean blackListed) {
        this.blackListed = blackListed;
    }

    public JustificationSource blackListed(Boolean blackListed) {
        this.blackListed = blackListed;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof JustificationSource)) return false;
        return id != null && id.equals(((JustificationSource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Justification{" +
            "id=" + getId() +
            ", url='" + getUrl() + '\'' +
            ", createdAt='" + getCreatedAt() + '\'' +
            ", blackListed=" + getBlackListed() +
        "}";
    }

}
