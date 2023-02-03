package com.monitoring.monitoringApp.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "statusGroups")
public class StatusGroup {

    @Id
    private int id;
    
    @Column ( name = "name", nullable = false )
    private String name;

    @OneToMany ( mappedBy = "statusGroup" )
    private List<Status> statuses;

    public StatusGroup() {
    }

    public StatusGroup(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Status> getStatuses() {
        return statuses;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatuses(List<Status> statuses) {
        this.statuses = statuses;
        statuses.forEach(status -> status.setStatusGroup(this));
    }
    
}
