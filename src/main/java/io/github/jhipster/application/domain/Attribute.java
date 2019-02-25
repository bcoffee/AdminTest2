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

import io.github.jhipster.application.domain.enumeration.AttributeType;

/**
 * A Attribute.
 */
@Entity
@Table(name = "attribute")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Attribute implements Serializable {

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private AttributeType type;

    @NotNull
    @Column(name = "is_system", nullable = false)
    private Boolean isSystem;

    @Column(name = "nullable")
    private Boolean nullable;

    @Column(name = "mutli_select")
    private Boolean mutliSelect;

    @OneToMany(mappedBy = "attribute")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AttributeOption> options = new HashSet<>();
    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("attributes")
    private ArticleType articleType;

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

    public Attribute name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Attribute description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public AttributeType getType() {
        return type;
    }

    public Attribute type(AttributeType type) {
        this.type = type;
        return this;
    }

    public void setType(AttributeType type) {
        this.type = type;
    }

    public Boolean isIsSystem() {
        return isSystem;
    }

    public Attribute isSystem(Boolean isSystem) {
        this.isSystem = isSystem;
        return this;
    }

    public void setIsSystem(Boolean isSystem) {
        this.isSystem = isSystem;
    }

    public Boolean isNullable() {
        return nullable;
    }

    public Attribute nullable(Boolean nullable) {
        this.nullable = nullable;
        return this;
    }

    public void setNullable(Boolean nullable) {
        this.nullable = nullable;
    }

    public Boolean isMutliSelect() {
        return mutliSelect;
    }

    public Attribute mutliSelect(Boolean mutliSelect) {
        this.mutliSelect = mutliSelect;
        return this;
    }

    public void setMutliSelect(Boolean mutliSelect) {
        this.mutliSelect = mutliSelect;
    }

    public Set<AttributeOption> getOptions() {
        return options;
    }

    public Attribute options(Set<AttributeOption> attributeOptions) {
        this.options = attributeOptions;
        return this;
    }

    public Attribute addOptions(AttributeOption attributeOption) {
        this.options.add(attributeOption);
        attributeOption.setAttribute(this);
        return this;
    }

    public Attribute removeOptions(AttributeOption attributeOption) {
        this.options.remove(attributeOption);
        attributeOption.setAttribute(null);
        return this;
    }

    public void setOptions(Set<AttributeOption> attributeOptions) {
        this.options = attributeOptions;
    }

    public ArticleType getArticleType() {
        return articleType;
    }

    public Attribute articleType(ArticleType articleType) {
        this.articleType = articleType;
        return this;
    }

    public void setArticleType(ArticleType articleType) {
        this.articleType = articleType;
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
        Attribute attribute = (Attribute) o;
        if (attribute.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attribute.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attribute{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ", isSystem='" + isIsSystem() + "'" +
            ", nullable='" + isNullable() + "'" +
            ", mutliSelect='" + isMutliSelect() + "'" +
            "}";
    }
}
