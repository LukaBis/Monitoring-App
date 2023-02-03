package com.monitoring.monitoringApp.dto;

import java.util.Date;

public class MessageDto {

    private String id;
    private String bulkId;
    private String text;
    private String phonenumber;
    private String contactName;
    private Integer contactId;
    private String statusGroupName;
    private Integer statusId;
    private Date created;

    public String getId() {
        return id;
    }

    public String getBulkId() {
        return bulkId;
    }

    public String getText() {
        return text;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public String getStatusGroupName() {
        return statusGroupName;
    }

    public String getContactName() {
        return contactName;
    }

    public Integer getContactId() {
        return contactId;
    }

    public Integer getStatusId() {
        return statusId;
    }

    public Date getCreated() {
        return created;
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

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public void setStatusGroupName(String statusGroupName) {
        this.statusGroupName = statusGroupName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public void setContactId(Integer contactId) {
        this.contactId = contactId;
    }

    public void setStatusId(Integer statusId) {
        this.statusId = statusId;
    }

    public void setCreated(Date date) {
        this.created = date;
    }
}