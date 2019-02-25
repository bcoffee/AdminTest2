package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A NonProductionEvent.
 */
@Entity
@Table(name = "non_production_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NonProductionEvent implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "jhi_label")
    private String label;

    @Column(name = "jhi_start")
    private ZonedDateTime start;

    @Column(name = "jhi_end")
    private LocalDate end;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("nonProductionEvents")
    private ScheduleEvent scheduleEvent;

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

    public NonProductionEvent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public NonProductionEvent label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ZonedDateTime getStart() {
        return start;
    }

    public NonProductionEvent start(ZonedDateTime start) {
        this.start = start;
        return this;
    }

    public void setStart(ZonedDateTime start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public NonProductionEvent end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public ScheduleEvent getScheduleEvent() {
        return scheduleEvent;
    }

    public NonProductionEvent scheduleEvent(ScheduleEvent scheduleEvent) {
        this.scheduleEvent = scheduleEvent;
        return this;
    }

    public void setScheduleEvent(ScheduleEvent scheduleEvent) {
        this.scheduleEvent = scheduleEvent;
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
        NonProductionEvent nonProductionEvent = (NonProductionEvent) o;
        if (nonProductionEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nonProductionEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NonProductionEvent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", label='" + getLabel() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
