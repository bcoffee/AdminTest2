package io.github.jhipster.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DataCollector.
 */
@Entity
@Table(name = "data_collector")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DataCollector implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "ip")
    private String ip;

    @Column(name = "subnet")
    private String subnet;

    @Column(name = "gateway")
    private String gateway;

    @Column(name = "dns")
    private String dns;

    @OneToOne
    @JoinColumn(unique = true)
    private Plc plc;

    @OneToMany(mappedBy = "dataCollector")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Device> devices = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public DataCollector ip(String ip) {
        this.ip = ip;
        return this;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getSubnet() {
        return subnet;
    }

    public DataCollector subnet(String subnet) {
        this.subnet = subnet;
        return this;
    }

    public void setSubnet(String subnet) {
        this.subnet = subnet;
    }

    public String getGateway() {
        return gateway;
    }

    public DataCollector gateway(String gateway) {
        this.gateway = gateway;
        return this;
    }

    public void setGateway(String gateway) {
        this.gateway = gateway;
    }

    public String getDns() {
        return dns;
    }

    public DataCollector dns(String dns) {
        this.dns = dns;
        return this;
    }

    public void setDns(String dns) {
        this.dns = dns;
    }

    public Plc getPlc() {
        return plc;
    }

    public DataCollector plc(Plc plc) {
        this.plc = plc;
        return this;
    }

    public void setPlc(Plc plc) {
        this.plc = plc;
    }

    public Set<Device> getDevices() {
        return devices;
    }

    public DataCollector devices(Set<Device> devices) {
        this.devices = devices;
        return this;
    }

    public DataCollector addDevices(Device device) {
        this.devices.add(device);
        device.setDataCollector(this);
        return this;
    }

    public DataCollector removeDevices(Device device) {
        this.devices.remove(device);
        device.setDataCollector(null);
        return this;
    }

    public void setDevices(Set<Device> devices) {
        this.devices = devices;
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
        DataCollector dataCollector = (DataCollector) o;
        if (dataCollector.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataCollector.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataCollector{" +
            "id=" + getId() +
            ", ip='" + getIp() + "'" +
            ", subnet='" + getSubnet() + "'" +
            ", gateway='" + getGateway() + "'" +
            ", dns='" + getDns() + "'" +
            "}";
    }
}
