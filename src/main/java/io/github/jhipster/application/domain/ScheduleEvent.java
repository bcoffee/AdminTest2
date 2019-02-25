package io.github.jhipster.application.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A ScheduleEvent.
 */
@Entity
@Table(name = "schedule_event")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ScheduleEvent implements Serializable {

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
    private ZonedDateTime end;

    @Column(name = "planned")
    private Boolean planned;

    @Column(name = "cycletime_override")
    private Float cycletimeOverride;

    @Column(name = "target_efficiency")
    private Float targetEfficiency;

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

    public ScheduleEvent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public ScheduleEvent label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ZonedDateTime getStart() {
        return start;
    }

    public ScheduleEvent start(ZonedDateTime start) {
        this.start = start;
        return this;
    }

    public void setStart(ZonedDateTime start) {
        this.start = start;
    }

    public ZonedDateTime getEnd() {
        return end;
    }

    public ScheduleEvent end(ZonedDateTime end) {
        this.end = end;
        return this;
    }

    public void setEnd(ZonedDateTime end) {
        this.end = end;
    }

    public Boolean isPlanned() {
        return planned;
    }

    public ScheduleEvent planned(Boolean planned) {
        this.planned = planned;
        return this;
    }

    public void setPlanned(Boolean planned) {
        this.planned = planned;
    }

    public Float getCycletimeOverride() {
        return cycletimeOverride;
    }

    public ScheduleEvent cycletimeOverride(Float cycletimeOverride) {
        this.cycletimeOverride = cycletimeOverride;
        return this;
    }

    public void setCycletimeOverride(Float cycletimeOverride) {
        this.cycletimeOverride = cycletimeOverride;
    }

    public Float getTargetEfficiency() {
        return targetEfficiency;
    }

    public ScheduleEvent targetEfficiency(Float targetEfficiency) {
        this.targetEfficiency = targetEfficiency;
        return this;
    }

    public void setTargetEfficiency(Float targetEfficiency) {
        this.targetEfficiency = targetEfficiency;
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
        ScheduleEvent scheduleEvent = (ScheduleEvent) o;
        if (scheduleEvent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scheduleEvent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScheduleEvent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", label='" + getLabel() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", planned='" + isPlanned() + "'" +
            ", cycletimeOverride=" + getCycletimeOverride() +
            ", targetEfficiency=" + getTargetEfficiency() +
            "}";
    }
}
