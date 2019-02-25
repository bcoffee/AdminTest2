package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Baseline.
 */
@Entity
@Table(name = "baseline")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Baseline implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "cycle_length", nullable = false)
    private Float cycleLength;

    @NotNull
    @Column(name = "min_tolerance", nullable = false)
    private Float minTolerance;

    @NotNull
    @Column(name = "max_tolerance", nullable = false)
    private Float maxTolerance;

    @NotNull
    @Column(name = "min_normal_tolerance", nullable = false)
    private Float minNormalTolerance;

    @NotNull
    @Column(name = "max_normal_tolerance", nullable = false)
    private Float maxNormalTolerance;

    @ManyToOne
    @JsonIgnoreProperties("baselines")
    private Article article;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("baselines")
    private Model model;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCycleLength() {
        return cycleLength;
    }

    public Baseline cycleLength(Float cycleLength) {
        this.cycleLength = cycleLength;
        return this;
    }

    public void setCycleLength(Float cycleLength) {
        this.cycleLength = cycleLength;
    }

    public Float getMinTolerance() {
        return minTolerance;
    }

    public Baseline minTolerance(Float minTolerance) {
        this.minTolerance = minTolerance;
        return this;
    }

    public void setMinTolerance(Float minTolerance) {
        this.minTolerance = minTolerance;
    }

    public Float getMaxTolerance() {
        return maxTolerance;
    }

    public Baseline maxTolerance(Float maxTolerance) {
        this.maxTolerance = maxTolerance;
        return this;
    }

    public void setMaxTolerance(Float maxTolerance) {
        this.maxTolerance = maxTolerance;
    }

    public Float getMinNormalTolerance() {
        return minNormalTolerance;
    }

    public Baseline minNormalTolerance(Float minNormalTolerance) {
        this.minNormalTolerance = minNormalTolerance;
        return this;
    }

    public void setMinNormalTolerance(Float minNormalTolerance) {
        this.minNormalTolerance = minNormalTolerance;
    }

    public Float getMaxNormalTolerance() {
        return maxNormalTolerance;
    }

    public Baseline maxNormalTolerance(Float maxNormalTolerance) {
        this.maxNormalTolerance = maxNormalTolerance;
        return this;
    }

    public void setMaxNormalTolerance(Float maxNormalTolerance) {
        this.maxNormalTolerance = maxNormalTolerance;
    }

    public Article getArticle() {
        return article;
    }

    public Baseline article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Model getModel() {
        return model;
    }

    public Baseline model(Model model) {
        this.model = model;
        return this;
    }

    public void setModel(Model model) {
        this.model = model;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Baseline baseline = (Baseline) o;
        if (baseline.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), baseline.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Baseline{" +
            "id=" + getId() +
            ", cycleLength=" + getCycleLength() +
            ", minTolerance=" + getMinTolerance() +
            ", maxTolerance=" + getMaxTolerance() +
            ", minNormalTolerance=" + getMinNormalTolerance() +
            ", maxNormalTolerance=" + getMaxNormalTolerance() +
            "}";
    }
}
