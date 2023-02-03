package com.monitoring.monitoringApp.controller.requests;

import com.monitoring.monitoringApp.dto.StatusDto;

public class MessageReport {

    private String messageId;
    private String bulkId;
    private Integer smsCount;
    private StatusDto status;

    public MessageReport(String messageId, String bulkId, Integer smsCount, StatusDto status){
        this.messageId = messageId;
        this.bulkId = bulkId;
        this.smsCount = smsCount;
        this.status = status;
    }

    public String getMessageId() {
        return messageId;
    }

    public String getBulkId() {
        return bulkId;
    }

    public Integer getSmsCount() {
        return smsCount;
    }

    public StatusDto getStatusDto() {
        return status;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public void setBulkId(String bulkId) {
        this.messageId = bulkId;
    }

    public void setSmsCount(Integer smsCount) {
        this.smsCount = smsCount;
    }

    public void setStatusDto(StatusDto status) {
        this.status = status;
    }
}
