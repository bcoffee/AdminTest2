package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(unique = true)
    private Article parent;

    @OneToOne(optional = false)    @NotNull

    @JoinColumn(unique = true)
    private ArticleType type;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MessageMap> messageMaps = new HashSet<>();
    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AttributeValue> attributeValues = new HashSet<>();
    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Baseline> baselines = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("articles")
    private Installation installation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Article name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Article description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Article getParent() {
        return parent;
    }

    public Article parent(Article article) {
        this.parent = article;
        return this;
    }

    public void setParent(Article article) {
        this.parent = article;
    }

    public ArticleType getType() {
        return type;
    }

    public Article type(ArticleType articleType) {
        this.type = articleType;
        return this;
    }

    public void setType(ArticleType articleType) {
        this.type = articleType;
    }

    public Set<MessageMap> getMessageMaps() {
        return messageMaps;
    }

    public Article messageMaps(Set<MessageMap> messageMaps) {
        this.messageMaps = messageMaps;
        return this;
    }

    public Article addMessageMaps(MessageMap messageMap) {
        this.messageMaps.add(messageMap);
        messageMap.setArticle(this);
        return this;
    }

    public Article removeMessageMaps(MessageMap messageMap) {
        this.messageMaps.remove(messageMap);
        messageMap.setArticle(null);
        return this;
    }

    public void setMessageMaps(Set<MessageMap> messageMaps) {
        this.messageMaps = messageMaps;
    }

    public Set<AttributeValue> getAttributeValues() {
        return attributeValues;
    }

    public Article attributeValues(Set<AttributeValue> attributeValues) {
        this.attributeValues = attributeValues;
        return this;
    }

    public Article addAttributeValue(AttributeValue attributeValue) {
        this.attributeValues.add(attributeValue);
        attributeValue.setArticle(this);
        return this;
    }

    public Article removeAttributeValue(AttributeValue attributeValue) {
        this.attributeValues.remove(attributeValue);
        attributeValue.setArticle(null);
        return this;
    }

    public void setAttributeValues(Set<AttributeValue> attributeValues) {
        this.attributeValues = attributeValues;
    }

    public Set<Baseline> getBaselines() {
        return baselines;
    }

    public Article baselines(Set<Baseline> baselines) {
        this.baselines = baselines;
        return this;
    }

    public Article addBaselines(Baseline baseline) {
        this.baselines.add(baseline);
        baseline.setArticle(this);
        return this;
    }

    public Article removeBaselines(Baseline baseline) {
        this.baselines.remove(baseline);
        baseline.setArticle(null);
        return this;
    }

    public void setBaselines(Set<Baseline> baselines) {
        this.baselines = baselines;
    }

    public Installation getInstallation() {
        return installation;
    }

    public Article installation(Installation installation) {
        this.installation = installation;
        return this;
    }

    public void setInstallation(Installation installation) {
        this.installation = installation;
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
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
