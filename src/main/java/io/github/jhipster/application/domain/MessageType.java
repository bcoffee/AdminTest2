package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A MessageType.
 */
@Entity
@Table(name = "message_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MessageType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "definition", nullable = false)
    private String definition;

    @NotNull
    @Column(name = "is_production_stop", nullable = false)
    private Boolean isProductionStop;

    @OneToOne
    @JoinColumn(unique = true)
    private MessageMap message;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public MessageType code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public MessageType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDefinition() {
        return definition;
    }

    public MessageType definition(String definition) {
        this.definition = definition;
        return this;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public Boolean isIsProductionStop() {
        return isProductionStop;
    }

    public MessageType isProductionStop(Boolean isProductionStop) {
        this.isProductionStop = isProductionStop;
        return this;
    }

    public void setIsProductionStop(Boolean isProductionStop) {
        this.isProductionStop = isProductionStop;
    }

    public MessageMap getMessage() {
        return message;
    }

    public MessageType message(MessageMap messageMap) {
        this.message = messageMap;
        return this;
    }

    public void setMessage(MessageMap messageMap) {
        this.message = messageMap;
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
        MessageType messageType = (MessageType) o;
        if (messageType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), messageType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MessageType{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", definition='" + getDefinition() + "'" +
            ", isProductionStop='" + isIsProductionStop() + "'" +
            "}";
    }
}