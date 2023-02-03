package com.monitoring.monitoringApp.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    private String id;

    @Column ( name = "bulkId", nullable = true )
    private String bulkId;

    @Column ( name = "text", nullable = false )
    private String text;

    @Column ( name = "sendTo" )
    private String sendTo;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_date")
    private Date createDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modify_date")
    private Date modifyDate;

    @ManyToOne
    @JoinColumn ( name = "statusId" )
    private Status status;

    @ManyToOne
    @JoinColumn ( name = "contactId" )
    private Contact contact;

    public Message() {
    }

    public Message(String id, String bulkId, String text, String sendTo, Status status) {
        this.id = id;
        this.bulkId = bulkId;
        this.text = text;
        this.sendTo = sendTo;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getBulkId() {
        return bulkId;
    }

    public String getText() {
        return text;
    }

    public String getSendTo() {
        return sendTo;
    }

    public Status getStatus() {
        return status;
    }

    public Contact getContact() {
        return contact;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setBulkId(String bulkId) {
        this.bulkId = bulkId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setSendTo(String sendTo) {
        this.sendTo = sendTo;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public void setCreatedDate(Date date) {
        this.createDate = date;
    }
}