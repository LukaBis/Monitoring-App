package com.monitoring.monitoringApp.controller.requests;

public class SendMessageRequest {

    private String textMessage;
    private String phoneNumber;
    private Integer contactId;

    public SendMessageRequest(String textMessage, String phoneNumber, Integer contactId){
        this.textMessage = textMessage;
        this.phoneNumber = phoneNumber;
        this.contactId = contactId;
    }

    public String getTextMessage(){
        return textMessage;
    }

    public String getPhoneNumber(){
        return phoneNumber;
    }

    public Integer getContactId() {
        return this.contactId;
    }
}

