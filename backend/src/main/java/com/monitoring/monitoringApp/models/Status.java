package com.monitoring.monitoringApp.models;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "statuses")
public class Status {
    
    @Id
    private int id;

    @Column ( name = "name", nullable = false )
    private String name;

    @OneToMany ( mappedBy = "status" )
    private List<Message> messages;

    @ManyToOne
    @JoinColumn ( name = "groupId" )
    private StatusGroup statusGroup;

    public Status() {
    }

    public Status(int id, String name, StatusGroup statusGroup) {
        this.id = id;
        this.name = name;
        this.statusGroup = statusGroup;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public StatusGroup getStatusGroup() {
        return statusGroup;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
        messages.forEach(message -> message.setStatus(this));
    }

    public void setStatusGroup(StatusGroup statusGroup) {
        this.statusGroup = statusGroup;
    }
    
}
