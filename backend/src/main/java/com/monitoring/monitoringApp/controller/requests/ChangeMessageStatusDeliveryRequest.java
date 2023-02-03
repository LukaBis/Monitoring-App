package com.monitoring.monitoringApp.controller.requests;

public class ChangeMessageStatusDeliveryRequest {
    
    public String messageId;
    public Integer statusId;

    public ChangeMessageStatusDeliveryRequest(String messageId, Integer statusId) {
        this.messageId = messageId;
        this.statusId = statusId;
    }
}
