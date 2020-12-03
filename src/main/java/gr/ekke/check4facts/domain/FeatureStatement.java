package gr.ekke.check4facts.domain;

import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "feature_statement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Document(indexName = "featurestatement")
@TypeDef(
    name = "list-array",
    typeClass = ListArrayType.class
)
public class FeatureStatement implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "s_subjectivity")
    private Double sSubjectivity;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_subjectivity_counts", columnDefinition = "int[]")
    private List<Integer> sSubjectivityCounts;

    @Column(name = "s_sentiment")
    private Double sSentiment;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_sentiment_counts", columnDefinition = "int[]")
    private List<Integer> sSentimentCounts;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_anger", columnDefinition = "float8[]")
    private List<Double> sEmotionAnger;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_disgust", columnDefinition = "float8[]")
    private List<Double> sEmotionDisgust;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_fear", columnDefinition = "float8[]")
    private List<Double> sEmotionFear;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_happiness", columnDefinition = "float8[]")
    private List<Double> sEmotionHappiness;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_sadness", columnDefinition = "float8[]")
    private List<Double> sEmotionSadness;

    @Basic
    @Type(type = "list-array")
    @Column(name = "s_emotion_surprise", columnDefinition = "float8[]")
    private List<Double> sEmotionSurprise;

    @Column(name = "r_title_similarity")
    private Double rTitleSimilarity;

    @Column(name = "r_title_subjectivity")
    private Double rTitleSubjectivity;

    @Type(type = "list-array")
    @Column(name = "r_title_subjectivity_counts", columnDefinition = "float8[]")
    private List<Double> rTitleSubjectivityCounts;

    @Column(name = "r_title_sentiment")
    private Double rTitleSentiment;

    @Type(type = "list-array")
    @Column(name = "r_title_sentiment_counts", columnDefinition = "float8[]")
    private List<Double> rTitleSentimentCounts;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_anger", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionAnger;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_disgust", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionDisgust;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_fear", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionFear;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_happiness", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionHappiness;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_sadness", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionSadness;

    @Type(type = "list-array")
    @Column(name = "r_title_emotion_surprise", columnDefinition = "float8[]")
    private List<Double> rTitleEmotionSurprise;

    @Column(name = "r_body_similarity")
    private Double rBodySimilarity;

    @Column(name = "r_body_subjectivity")
    private Double rBodySubjectivity;

    @Type(type = "list-array")
    @Column(name = "r_body_subjectivity_counts", columnDefinition = "float8[]")
    private List<Double> rBodySubjectivityCounts;

    @Column(name = "r_body_sentiment")
    private Double rBodySentiment;

    @Type(type = "list-array")
    @Column(name = "r_body_sentiment_counts", columnDefinition = "float8[]")
    private List<Double> rBodySentimentCounts;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_anger", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionAnger;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_disgust", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionDisgust;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_fear", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionFear;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_happiness", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionHappiness;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_sadness", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionSadness;

    @Type(type = "list-array")
    @Column(name = "r_body_emotion_surprise", columnDefinition = "float8[]")
    private List<Double> rBodyEmotionSurprise;

    @Column(name = "r_sim_par_similarity")
    private Double rSimParSimilarity;

    @Column(name = "r_sim_par_subjectivity")
    private Double rSimParSubjectivity;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_subjectivity_counts", columnDefinition = "float8[]")
    private List<Double> rSimParSubjectivityCounts;

    @Column(name = "r_sim_par_sentiment")
    private Double rSimParSentiment;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_sentiment_counts", columnDefinition = "float8[]")
    private List<Double> rSimParSentimentCounts;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_anger", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionAnger;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_disgust", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionDisgust;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_fear", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionFear;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_happiness", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionHappiness;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_sadness", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionSadness;

    @Type(type = "list-array")
    @Column(name = "r_sim_par_emotion_surprise", columnDefinition = "float8[]")
    private List<Double> rSimParEmotionSurprise;

    @Column(name = "r_sim_sent_similarity")
    private Double rSimSentSimilarity;

    @Column(name = "r_sim_sent_subjectivity")
    private Double rSimSentSubjectivity;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_subjectivity_counts", columnDefinition = "float8[]")
    private List<Double> rSimSentSubjectivityCounts;

    @Column(name = "r_sim_sent_sentiment")
    private Double rSimSentSentiment;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_sentiment_counts", columnDefinition = "float8[]")
    private List<Double> rSimSentSentimentCounts;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_anger", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionAnger;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_disgust", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionDisgust;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_fear", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionFear;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_happiness", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionHappiness;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_sadness", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionSadness;

    @Type(type = "list-array")
    @Column(name = "r_sim_sent_emotion_surprise", columnDefinition = "float8[]")
    private List<Double> rSimSentEmotionSurprise;


    @Column(name = "predict_label")
    private Boolean predictLabel;

    @Column(name = "predict_proba")
    private Double predictProba;

    @Column(name = "true_label")
    private Boolean trueLabel;

    @NotNull
    @Column(name = "harvest_iteration", nullable = false)
    private Long harvestIteration;

    @ManyToOne
    private Statement statement;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Double getsSubjectivity() {
        return sSubjectivity;
    }

    public FeatureStatement sSubjectivity(Double sSubjectivity) {
        this.sSubjectivity = sSubjectivity;
        return this;
    }

    public void setsSubjectivity(Double sSubjectivity) {
        this.sSubjectivity = sSubjectivity;
    }

    public List<Integer> getsSubjectivityCounts() {
        return sSubjectivityCounts;
    }

    public FeatureStatement sSubjectivityCounts(List<Integer> sSubjectivityCounts) {
        this.sSubjectivityCounts = sSubjectivityCounts;
        return this;
    }

    public void setsSubjectivityCounts(List<Integer> sSubjectivityCounts) {
        this.sSubjectivityCounts = sSubjectivityCounts;
    }

    public Double getsSentiment() {
        return sSentiment;
    }

    public FeatureStatement sSentiment(Double sSentiment) {
        this.sSentiment = sSentiment;
        return this;
    }

    public void setsSentiment(Double sSentiment) {
        this.sSentiment = sSentiment;
    }

    public List<Integer> getsSentimentCounts() {
        return sSentimentCounts;
    }

    public FeatureStatement sSentimentCounts(List<Integer>sSentimentCounts) {
        this.sSentimentCounts = sSentimentCounts;
        return this;
    }

    public void setsSentimentCounts(List<Integer> sSentimentCounts) {
        this.sSentimentCounts = sSentimentCounts;
    }

    public List<Double> getsEmotionAnger() {
        return sEmotionAnger;
    }

    public FeatureStatement sEmotionAnger(List<Double> sEmotionAnger) {
        this.sEmotionAnger = sEmotionAnger;
        return this;
    }

    public void setsEmotionAnger(List<Double> sEmotionAnger) {
        this.sEmotionAnger = sEmotionAnger;
    }

    public List<Double> getsEmotionDisgust() {
        return sEmotionDisgust;
    }

    public FeatureStatement sEmotionDisgust(List<Double> sEmotionDisgust) {
        this.sEmotionDisgust = sEmotionDisgust;
        return this;
    }

    public void setsEmotionDisgust(List<Double> sEmotionDisgust) {
        this.sEmotionDisgust = sEmotionDisgust;
    }

    public List<Double> getsEmotionFear() {
        return sEmotionFear;
    }

    public FeatureStatement sEmotionFear(List<Double> sEmotionFear) {
        this.sEmotionFear = sEmotionFear;
        return this;
    }

    public void setsEmotionFear(List<Double> sEmotionFear) {
        this.sEmotionFear = sEmotionFear;
    }

    public List<Double> getsEmotionHappiness() {
        return sEmotionHappiness;
    }

    public FeatureStatement sEmotionHappiness(List<Double> sEmotionHappiness) {
        this.sEmotionHappiness = sEmotionHappiness;
        return this;
    }

    public void setsEmotionHappiness(List<Double> sEmotionHappiness) {
        this.sEmotionHappiness = sEmotionHappiness;
    }

    public List<Double> getsEmotionSadness() {
        return sEmotionSadness;
    }

    public FeatureStatement sEmotionSadness(List<Double> sEmotionSadness) {
        this.sEmotionSadness = sEmotionSadness;
        return this;
    }

    public void setsEmotionSadness(List<Double> sEmotionSadness) {
        this.sEmotionSadness = sEmotionSadness;
    }

    public List<Double> getsEmotionSurprise() {
        return sEmotionSurprise;
    }

    public FeatureStatement sEmotionSurprise(List<Double> sEmotionSurprise) {
        this.sEmotionSurprise = sEmotionSurprise;
        return this;
    }

    public void setsEmotionSurprise(List<Double> sEmotionSurprise) {
        this.sEmotionSurprise = sEmotionSurprise;
    }

    public Double getrTitleSimilarity() {
        return rTitleSimilarity;
    }

    public FeatureStatement rTitleSimilarity(Double rTitleSimilarity) {
        this.rTitleSimilarity = rTitleSimilarity;
        return this;
    }

    public void setrTitleSimilarity(Double rTitleSimilarity) {
        this.rTitleSimilarity = rTitleSimilarity;
    }

    public Double getrTitleSubjectivity() {
        return rTitleSubjectivity;
    }

    public FeatureStatement rTitleSubjectivity(Double rTitleSubjectivity) {
        this.rTitleSubjectivity = rTitleSubjectivity;
        return this;
    }

    public void setrTitleSubjectivity(Double rTitleSubjectivity) {
        this.rTitleSubjectivity = rTitleSubjectivity;
    }

    public List<Double> getrTitleSubjectivityCounts() {
        return rTitleSubjectivityCounts;
    }

    public FeatureStatement rTitleSubjectivityCounts(List<Double> rTitleSubjectivityCounts) {
        this.rTitleSubjectivityCounts = rTitleSubjectivityCounts;
        return this;
    }

    public void setrTitleSubjectivityCounts(List<Double> rTitleSubjectivityCounts) {
        this.rTitleSubjectivityCounts = rTitleSubjectivityCounts;
    }

    public Double getrTitleSentiment() {
        return rTitleSentiment;
    }

    public FeatureStatement rTitleSentiment(Double rTitleSentiment) {
        this.rTitleSentiment = rTitleSentiment;
        return this;
    }

    public void setrTitleSentiment(Double rTitleSentiment) {
        this.rTitleSentiment = rTitleSentiment;
    }

    public List<Double> getrTitleSentimentCounts() {
        return rTitleSentimentCounts;
    }

    public FeatureStatement rTitleSentimentCounts(List<Double> rTitleSentimentCounts) {
        this.rTitleSentimentCounts = rTitleSentimentCounts;
        return this;
    }

    public void setrTitleSentimentCounts(List<Double> rTitleSentimentCounts) {
        this.rTitleSentimentCounts = rTitleSentimentCounts;
    }

    public List<Double> getrTitleEmotionAnger() {
        return rTitleEmotionAnger;
    }

    public FeatureStatement rTitleEmotionAnger(List<Double> rTitleEmotionAnger) {
        this.rTitleEmotionAnger = rTitleEmotionAnger;
        return this;
    }

    public void setrTitleEmotionAnger(List<Double> rTitleEmotionAnger) {
        this.rTitleEmotionAnger = rTitleEmotionAnger;
    }

    public List<Double> getrTitleEmotionDisgust() {
        return rTitleEmotionDisgust;
    }

    public FeatureStatement rTitleEmotionDisgust(List<Double> rTitleEmotionDisgust) {
        this.rTitleEmotionDisgust = rTitleEmotionDisgust;
        return this;
    }

    public void setrTitleEmotionDisgust(List<Double> rTitleEmotionDisgust) {
        this.rTitleEmotionDisgust = rTitleEmotionDisgust;
    }

    public List<Double> getrTitleEmotionFear() {
        return rTitleEmotionFear;
    }

    public FeatureStatement rTitleEmotionFear(List<Double> rTitleEmotionFear) {
        this.rTitleEmotionFear = rTitleEmotionFear;
        return this;
    }

    public void setrTitleEmotionFear(List<Double> rTitleEmotionFear) {
        this.rTitleEmotionFear = rTitleEmotionFear;
    }

    public List<Double> getrTitleEmotionHappiness() {
        return rTitleEmotionHappiness;
    }

    public FeatureStatement rTitleEmotionHappiness(List<Double> rTitleEmotionHappiness) {
        this.rTitleEmotionHappiness = rTitleEmotionHappiness;
        return this;
    }

    public void setrTitleEmotionHappiness(List<Double> rTitleEmotionHappiness) {
        this.rTitleEmotionHappiness = rTitleEmotionHappiness;
    }

    public List<Double> getrTitleEmotionSadness() {
        return rTitleEmotionSadness;
    }

    public FeatureStatement rTitleEmotionSadness(List<Double> rTitleEmotionSadness) {
        this.rTitleEmotionSadness = rTitleEmotionSadness;
        return this;
    }

    public void setrTitleEmotionSadness(List<Double> rTitleEmotionSadness) {
        this.rTitleEmotionSadness = rTitleEmotionSadness;
    }

    public List<Double> getrTitleEmotionSurprise() {
        return rTitleEmotionSurprise;
    }

    public FeatureStatement rTitleEmotionSurprise(List<Double> rTitleEmotionSurprise) {
        this.rTitleEmotionSurprise = rTitleEmotionSurprise;
        return this;
    }

    public void setrTitleEmotionSurprise(List<Double> rTitleEmotionSurprise) {
        this.rTitleEmotionSurprise = rTitleEmotionSurprise;
    }

    public Double getrBodySimilarity() {
        return rBodySimilarity;
    }

    public FeatureStatement rBodySimilarity(Double rBodySimilarity) {
        this.rBodySimilarity = rBodySimilarity;
        return this;
    }

    public void setrBodySimilarity(Double rBodySimilarity) {
        this.rBodySimilarity = rBodySimilarity;
    }

    public Double getrBodySubjectivity() {
        return rBodySubjectivity;
    }

    public FeatureStatement rBodySubjectivity(Double rBodySubjectivity) {
        this.rBodySubjectivity = rBodySubjectivity;
        return this;
    }

    public void setrBodySubjectivity(Double rBodySubjectivity) {
        this.rBodySubjectivity = rBodySubjectivity;
    }

    public List<Double> getrBodySubjectivityCounts() {
        return rBodySubjectivityCounts;
    }

    public FeatureStatement rBodySubjectivityCounts(List<Double> rBodySubjectivityCounts) {
        this.rBodySubjectivityCounts = rBodySubjectivityCounts;
        return this;
    }

    public void setrBodySubjectivityCounts(List<Double> rBodySubjectivityCounts) {
        this.rBodySubjectivityCounts = rBodySubjectivityCounts;
    }

    public Double getrBodySentiment() {
        return rBodySentiment;
    }

    public FeatureStatement rBodySentiment(Double rBodySentiment) {
        this.rBodySentiment = rBodySentiment;
        return this;
    }

    public void setrBodySentiment(Double rBodySentiment) {
        this.rBodySentiment = rBodySentiment;
    }

    public List<Double> getrBodySentimentCounts() {
        return rBodySentimentCounts;
    }

    public FeatureStatement rBodySentimentCounts(List<Double> rBodySentimentCounts) {
        this.rBodySentimentCounts = rBodySentimentCounts;
        return this;
    }

    public void setrBodySentimentCounts(List<Double> rBodySentimentCounts) {
        this.rBodySentimentCounts = rBodySentimentCounts;
    }

    public List<Double> getrBodyEmotionAnger() {
        return rBodyEmotionAnger;
    }

    public FeatureStatement rBodyEmotionAnger(List<Double> rBodyEmotionAnger) {
        this.rBodyEmotionAnger = rBodyEmotionAnger;
        return this;
    }

    public void setrBodyEmotionAnger(List<Double> rBodyEmotionAnger) {
        this.rBodyEmotionAnger = rBodyEmotionAnger;
    }

    public List<Double> getrBodyEmotionDisgust() {
        return rBodyEmotionDisgust;
    }

    public FeatureStatement rBodyEmotionDisgust(List<Double> rBodyEmotionDisgust) {
        this.rBodyEmotionDisgust = rBodyEmotionDisgust;
        return this;
    }

    public void setrBodyEmotionDisgust(List<Double> rBodyEmotionDisgust) {
        this.rBodyEmotionDisgust = rBodyEmotionDisgust;
    }

    public List<Double> getrBodyEmotionFear() {
        return rBodyEmotionFear;
    }

    public FeatureStatement rBodyEmotionFear(List<Double> rBodyEmotionFear) {
        this.rBodyEmotionFear = rBodyEmotionFear;
        return this;
    }

    public void setrBodyEmotionFear(List<Double> rBodyEmotionFear) {
        this.rBodyEmotionFear = rBodyEmotionFear;
    }

    public List<Double> getrBodyEmotionHappiness() {
        return rBodyEmotionHappiness;
    }

    public FeatureStatement rBodyEmotionHappiness(List<Double> rBodyEmotionHappiness) {
        this.rBodyEmotionHappiness = rBodyEmotionHappiness;
        return this;
    }

    public void setrBodyEmotionHappiness(List<Double> rBodyEmotionHappiness) {
        this.rBodyEmotionHappiness = rBodyEmotionHappiness;
    }

    public List<Double> getrBodyEmotionSadness() {
        return rBodyEmotionSadness;
    }

    public FeatureStatement rBodyEmotionSadness(List<Double> rBodyEmotionSadness) {
        this.rBodyEmotionSadness = rBodyEmotionSadness;
        return this;
    }

    public void setrBodyEmotionSadness(List<Double> rBodyEmotionSadness) {
        this.rBodyEmotionSadness = rBodyEmotionSadness;
    }

    public List<Double> getrBodyEmotionSurprise() {
        return rBodyEmotionSurprise;
    }

    public FeatureStatement rBodyEmotionSurprise(List<Double> rBodyEmotionSurprise) {
        this.rBodyEmotionSurprise = rBodyEmotionSurprise;
        return this;
    }

    public void setrBodyEmotionSurprise(List<Double> rBodyEmotionSurprise) {
        this.rBodyEmotionSurprise = rBodyEmotionSurprise;
    }

    public Double getrSimParSimilarity() {
        return rSimParSimilarity;
    }

    public FeatureStatement rSimParSimilarity(Double rSimParSimilarity) {
        this.rSimParSimilarity = rSimParSimilarity;
        return this;
    }

    public void setrSimParSimilarity(Double rSimParSimilarity) {
        this.rSimParSimilarity = rSimParSimilarity;
    }

    public Double getrSimParSubjectivity() {
        return rSimParSubjectivity;
    }

    public FeatureStatement rSimParSubjectivity(Double rSimParSubjectivity) {
        this.rSimParSubjectivity = rSimParSubjectivity;
        return this;
    }

    public void setrSimParSubjectivity(Double rSimParSubjectivity) {
        this.rSimParSubjectivity = rSimParSubjectivity;
    }

    public List<Double> getrSimParSubjectivityCounts() {
        return rSimParSubjectivityCounts;
    }

    public FeatureStatement rSimParSubjectivityCounts(List<Double> rSimParSubjectivityCounts) {
        this.rSimParSubjectivityCounts = rSimParSubjectivityCounts;
        return this;
    }

    public void setrSimParSubjectivityCounts(List<Double> rSimParSubjectivityCounts) {
        this.rSimParSubjectivityCounts = rSimParSubjectivityCounts;
    }

    public Double getrSimParSentiment() {
        return rSimParSentiment;
    }

    public FeatureStatement rSimParSentiment(Double rSimParSentiment) {
        this.rSimParSentiment = rSimParSentiment;
        return this;
    }

    public void setrSimParSentiment(Double rSimParSentiment) {
        this.rSimParSentiment = rSimParSentiment;
    }

    public List<Double> getrSimParSentimentCounts() {
        return rSimParSentimentCounts;
    }

    public FeatureStatement rSimParSentimentCounts(List<Double> rSimParSentimentCounts) {
        this.rSimParSentimentCounts = rSimParSentimentCounts;
        return this;
    }

    public void setrSimParSentimentCounts(List<Double> rSimParSentimentCounts) {
        this.rSimParSentimentCounts = rSimParSentimentCounts;
    }

    public List<Double> getrSimParEmotionAnger() {
        return rSimParEmotionAnger;
    }

    public FeatureStatement rSimParEmotionAnger(List<Double> rSimParEmotionAnger) {
        this.rSimParEmotionAnger = rSimParEmotionAnger;
        return this;
    }

    public void setrSimParEmotionAnger(List<Double> rSimParEmotionAnger) {
        this.rSimParEmotionAnger = rSimParEmotionAnger;
    }

    public List<Double> getrSimParEmotionDisgust() {
        return rSimParEmotionDisgust;
    }

    public FeatureStatement rSimParEmotionDisgust(List<Double> rSimParEmotionDisgust) {
        this.rSimParEmotionDisgust = rSimParEmotionDisgust;
        return this;
    }

    public void setrSimParEmotionDisgust(List<Double> rSimParEmotionDisgust) {
        this.rSimParEmotionDisgust = rSimParEmotionDisgust;
    }

    public List<Double> getrSimParEmotionFear() {
        return rSimParEmotionFear;
    }

    public FeatureStatement rSimParEmotionFear(List<Double> rSimParEmotionFear) {
        this.rSimParEmotionFear = rSimParEmotionFear;
        return this;
    }

    public void setrSimParEmotionFear(List<Double> rSimParEmotionFear) {
        this.rSimParEmotionFear = rSimParEmotionFear;
    }

    public List<Double> getrSimParEmotionHappiness() {
        return rSimParEmotionHappiness;
    }

    public FeatureStatement rSimParEmotionHappiness(List<Double> rSimParEmotionHappiness) {
        this.rSimParEmotionHappiness = rSimParEmotionHappiness;
        return this;
    }

    public void setrSimParEmotionHappiness(List<Double> rSimParEmotionHappiness) {
        this.rSimParEmotionHappiness = rSimParEmotionHappiness;
    }

    public List<Double> getrSimParEmotionSadness() {
        return rSimParEmotionSadness;
    }

    public FeatureStatement rSimParEmotionSadness(List<Double> rSimParEmotionSadness) {
        this.rSimParEmotionSadness = rSimParEmotionSadness;
        return this;
    }

    public void setrSimParEmotionSadness(List<Double> rSimParEmotionSadness) {
        this.rSimParEmotionSadness = rSimParEmotionSadness;
    }

    public List<Double> getrSimParEmotionSurprise() {
        return rSimParEmotionSurprise;
    }

    public FeatureStatement rSimParEmotionSurprise(List<Double> rSimParEmotionSurprise) {
        this.rSimParEmotionSurprise =rSimParEmotionSurprise;
        return this;
    }

    public void setrSimParEmotionSurprise(List<Double> rSimParEmotionSurprise) {
        this.rSimParEmotionSurprise = rSimParEmotionSurprise;
    }

    public Double getrSimSentSimilarity() {
        return rSimSentSimilarity;
    }

    public FeatureStatement rSimSentSimilarity(Double rSimSentSimilarity) {
        this.rSimSentSimilarity = rSimSentSimilarity;
        return this;
    }

    public void setrSimSentSimilarity(Double rSimSentSimilarity) {
        this.rSimSentSimilarity = rSimSentSimilarity;
    }

    public Double getrSimSentSubjectivity() {
        return rSimSentSubjectivity;
    }

    public FeatureStatement rSimSentSubjectivity(Double rSimSentSubjectivity) {
        this.rSimSentSubjectivity = rSimSentSubjectivity;
        return this;
    }

    public void setrSimSentSubjectivity(Double rSimSentSubjectivity) {
        this.rSimSentSubjectivity = rSimSentSubjectivity;
    }

    public List<Double> getrSimSentSubjectivityCounts() {
        return rSimSentSubjectivityCounts;
    }

    public FeatureStatement rSimSentSubjectivityCounts(List<Double> rSimSentSubjectivityCounts) {
        this.rSimSentSubjectivityCounts = rSimSentSubjectivityCounts;
        return this;
    }

    public void setrSimSentSubjectivityCounts(List<Double> rSimSentSubjectivityCounts) {
        this.rSimSentSubjectivityCounts = rSimSentSubjectivityCounts;
    }

    public Double getrSimSentSentiment() {
        return rSimSentSentiment;
    }

    public FeatureStatement rSimSentSentiment(Double rSimSentSentiment) {
        this.rSimSentSentiment = rSimSentSentiment;
        return this;
    }

    public void setrSimSentSentiment(Double rSimSentSentiment) {
        this.rSimSentSentiment = rSimSentSentiment;
    }

    public List<Double> getrSimSentSentimentCounts() {
        return rSimSentSentimentCounts;
    }

    public FeatureStatement rSimSentSentimentCounts(List<Double> rSimSentSentimentCounts) {
        this.rSimSentSentimentCounts = rSimSentSentimentCounts;
        return this;
    }

    public void setrSimSentSentimentCounts(List<Double> rSimSentSentimentCounts) {
        this.rSimSentSentimentCounts = rSimSentSentimentCounts;
    }

    public List<Double> getrSimSentEmotionAnger() {
        return rSimSentEmotionAnger;
    }

    public FeatureStatement rSimSentEmotionAnger(List<Double> rSimSentEmotionAnger) {
        this.rSimSentEmotionAnger = rSimSentEmotionAnger;
        return this;
    }

    public void setrSimSentEmotionAnger(List<Double> rSimSentEmotionAnger) {
        this.rSimSentEmotionAnger = rSimSentEmotionAnger;
    }

    public List<Double> getrSimSentEmotionDisgust() {
        return rSimSentEmotionDisgust;
    }

    public FeatureStatement rSimSentEmotionDisgust(List<Double> rSimSentEmotionDisgust) {
        this.rSimSentEmotionDisgust = rSimSentEmotionDisgust;
        return this;
    }

    public void setrSimSentEmotionDisgust(List<Double> rSimSentEmotionDisgust) {
        this.rSimSentEmotionDisgust = rSimSentEmotionDisgust;
    }

    public List<Double> getrSimSentEmotionFear() {
        return rSimSentEmotionFear;
    }

    public FeatureStatement rSimSentEmotionFear(List<Double> rSimSentEmotionFear) {
        this.rSimSentEmotionFear = rSimSentEmotionFear;
        return this;
    }

    public void setrSimSentEmotionFear(List<Double> rSimSentEmotionFear) {
        this.rSimSentEmotionFear = rSimSentEmotionFear;
    }

    public List<Double> getrSimSentEmotionHappiness() {
        return rSimSentEmotionHappiness;
    }

    public FeatureStatement rSimSentEmotionHappiness(List<Double> rSimSentEmotionHappiness) {
        this.rSimSentEmotionHappiness = rSimSentEmotionHappiness;
        return this;
    }

    public void setrSimSentEmotionHappiness(List<Double> rSimSentEmotionHappiness) {
        this.rSimSentEmotionHappiness = rSimSentEmotionHappiness;
    }

    public List<Double> getrSimSentEmotionSadness() {
        return rSimSentEmotionSadness;
    }

    public FeatureStatement rSimSentEmotionSadness(List<Double> rSimSentEmotionSadness) {
        this.rSimSentEmotionSadness = rSimSentEmotionSadness;
        return this;
    }

    public void setrSimSentEmotionSadness(List<Double> rSimSentEmotionSadness) {
        this.rSimSentEmotionSadness = rSimSentEmotionSadness;
    }

    public List<Double> getrSimSentEmotionSurprise() {
        return rSimSentEmotionSurprise;
    }

    public FeatureStatement rSimeSentEmotionSurprise(List<Double> rSimSentEmotionSurprise) {
        this.rSimSentEmotionSurprise = rSimSentEmotionSurprise;
        return this;
    }

    public void setrSimSentEmotionSurprise(List<Double> rSimSentEmotionSurprise) {
        this.rSimSentEmotionSurprise = rSimSentEmotionSurprise;
    }

    public Boolean getPredictLabel() {
        return predictLabel;
    }

    public FeatureStatement predictLabel(Boolean predictLabel) {
        this.predictLabel = predictLabel;
        return this;
    }

    public void setPredictLabel(Boolean predictLabel) {
        this.predictLabel = predictLabel;
    }

    public Double getPredictProba() {
        return predictProba;
    }

    public FeatureStatement predictProba(Double predictProba) {
        this.predictProba = predictProba;
        return this;
    }

    public void setPredictProba(Double predictProba) {
        this.predictProba = predictProba;
    }

    public Boolean getTrueLabel() {
        return trueLabel;
    }

    public FeatureStatement trueLabel(Boolean trueLabel) {
        this.trueLabel = trueLabel;
        return this;
    }

    public void setTrueLabel(Boolean trueLabel) {
        this.trueLabel = trueLabel;
    }

    public Long getHarvestIteration() {
        return harvestIteration;
    }

    public FeatureStatement harvestIteration(Long harvestIteration) {
        this.harvestIteration = harvestIteration;
        return this;
    }

    public void setHarvestIteration(Long harvestIteration) {
        this.harvestIteration = harvestIteration;
    }

    public Statement getStatement() {
        return statement;
    }

    public FeatureStatement statement(Statement statement) {
        this.statement = statement;
        return this;
    }

    public void setStatement(Statement statement) {
        this.statement = statement;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FeatureStatement)) return false;
        return id != null && id.equals(((FeatureStatement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FeatureStatement{" +
            "id=" + id +
            ", sSubjectivity=" + sSubjectivity +
            ", sSubjectivityCounts=" + sSubjectivityCounts +
            ", sSentiment=" + sSentiment +
            ", sSentimentCounts=" + sSentimentCounts +
            ", sEmotionAnger=" + sEmotionAnger +
            ", sEmotionDisgust=" + sEmotionDisgust +
            ", sEmotionFear=" + sEmotionFear +
            ", sEmotionHappiness=" + sEmotionHappiness +
            ", sEmotionSadness=" + sEmotionSadness +
            ", sEmotionSurprise=" + sEmotionSurprise +
            ", rTitleSimilarity=" + rTitleSimilarity +
            ", rTitleSubjectivity=" + rTitleSubjectivity +
            ", rTitleSubjectivityCounts=" + rTitleSubjectivityCounts +
            ", rTitleSentiment=" + rTitleSentiment +
            ", rTitleSentimentCounts=" + rTitleSentimentCounts +
            ", rTitleEmotionAnger=" + rTitleEmotionAnger +
            ", rTitleEmotionDisgust=" + rTitleEmotionDisgust +
            ", rTitleEmotionFear=" + rTitleEmotionFear +
            ", rTitleEmotionHappiness=" + rTitleEmotionHappiness +
            ", rTitleEmotionSadness=" + rTitleEmotionSadness +
            ", rTitleEmotionSurprise=" + rTitleEmotionSurprise +
            ", rBodySimilarity=" + rBodySimilarity +
            ", rBodySubjectivity=" + rBodySubjectivity +
            ", rBodySubjectivityCounts=" + rBodySubjectivityCounts +
            ", rBodySentiment=" + rBodySentiment +
            ", rBodySentimentCounts=" + rBodySentimentCounts +
            ", rBodyEmotionAnger=" + rBodyEmotionAnger +
            ", rBodyEmotionDisgust=" + rBodyEmotionDisgust +
            ", rBodyEmotionFear=" + rBodyEmotionFear +
            ", rBodyEmotionHappiness=" + rBodyEmotionHappiness +
            ", rBodyEmotionSadness=" + rBodyEmotionSadness +
            ", rBodyEmotionSurprise=" + rBodyEmotionSurprise +
            ", rSimParSimilarity=" + rSimParSimilarity +
            ", rSimParSubjectivity=" + rSimParSubjectivity +
            ", rSimParSubjectivityCounts=" + rSimParSubjectivityCounts +
            ", rSimParSentiment=" + rSimParSentiment +
            ", rSimParSentimentCounts=" + rSimParSentimentCounts +
            ", rSimParEmotionAnger=" + rSimParEmotionAnger +
            ", rSimParEmotionDisgust=" + rSimParEmotionDisgust +
            ", rSimParEmotionFear=" + rSimParEmotionFear +
            ", rSimParEmotionHappiness=" + rSimParEmotionHappiness +
            ", rSimParEmotionSadness=" + rSimParEmotionSadness +
            ", rSimParEmotionSurprise=" + rSimParEmotionSurprise +
            ", rSimSentSimilarity=" + rSimSentSimilarity +
            ", rSimSentSubjectivity=" + rSimSentSubjectivity +
            ", rSimSentSubjectivityCounts=" + rSimSentSubjectivityCounts +
            ", rSimSentSentiment=" + rSimSentSentiment +
            ", rSimSentSentimentCounts=" + rSimSentSentimentCounts +
            ", rSimSentEmotionAnger=" + rSimSentEmotionAnger +
            ", rSimSentEmotionDisgust=" + rSimSentEmotionDisgust +
            ", rSimSentEmotionFear=" + rSimSentEmotionFear +
            ", rSimSentEmotionHappiness=" + rSimSentEmotionHappiness +
            ", rSimSentEmotionSadness=" + rSimSentEmotionSadness +
            ", rSimSentEmotionSurprise=" + rSimSentEmotionSurprise +
            ", predictLabel=" + predictLabel +
            ", predictProba=" + predictProba +
            ", trueLabel=" + trueLabel +
            ", statement=" + statement +
            '}';
    }
}
