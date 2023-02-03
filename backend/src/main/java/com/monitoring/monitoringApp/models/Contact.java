package com.monitoring.monitoringApp.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "contacts")
public class Contact {
    
    @Id @GeneratedValue
    private Integer id;
    
    @Column ( name = "name", nullable = false )
    private String name;

    @Column ( name = "number", nullable = true )
    private String number;

    @OneToMany ( mappedBy = "contact" )
    private List<Message> messages;

    public Contact() {
    }

    public Contact(Integer id, String name, String number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getNumber() {
        return number;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(String number) {
        this.number = number;
    }

}
