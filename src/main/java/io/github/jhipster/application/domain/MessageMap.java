package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MessageMap.
 */
@Entity
@Table(name = "message_map")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MessageMap implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "message", nullable = false)
    private String message;

    @NotNull
    @Column(name = "bit", nullable = false)
    private Integer bit;

    @NotNull
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @NotNull
    @Column(name = "ioe", nullable = false)
    private String ioe;

    @NotNull
    @Column(name = "cip_address", nullable = false)
    private String cipAddress;

    @ManyToOne
    @JsonIgnoreProperties("messageMaps")
    private Article article;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public MessageMap message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getBit() {
        return bit;
    }

    public MessageMap bit(Integer bit) {
        this.bit = bit;
        return this;
    }

    public void setBit(Integer bit) {
        this.bit = bit;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public MessageMap isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getIoe() {
        return ioe;
    }

    public MessageMap ioe(String ioe) {
        this.ioe = ioe;
        return this;
    }

    public void setIoe(String ioe) {
        this.ioe = ioe;
    }

    public String getCipAddress() {
        return cipAddress;
    }

    public MessageMap cipAddress(String cipAddress) {
        this.cipAddress = cipAddress;
        return this;
    }

    public void setCipAddress(String cipAddress) {
        this.cipAddress = cipAddress;
    }

    public Article getArticle() {
        return article;
    }

    public MessageMap article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
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
        MessageMap messageMap = (MessageMap) o;
        if (messageMap.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), messageMap.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MessageMap{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", bit=" + getBit() +
            ", isActive='" + isIsActive() + "'" +
            ", ioe='" + getIoe() + "'" +
            ", cipAddress='" + getCipAddress() + "'" +
            "}";
    }
}
