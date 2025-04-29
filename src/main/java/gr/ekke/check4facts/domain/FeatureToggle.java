package gr.ekke.check4facts.domain;

import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "feature_toggle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FeatureToggle {

    @Id
    @Column(name = "key", nullable = false)
    private String key;

    @Column(name = "enabled")
    private Boolean enabled;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public FeatureToggle key(String key) {
        this.key = key;
        return this;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public FeatureToggle enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    @Override
    public String toString() {
        return "FeatureToggle{" +
            "key='" + key + '\'' +
            ", enabled=" + enabled +
            '}';
    }
}
