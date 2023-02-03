package com.monitoring.monitoringApp.controller.requests;

import java.util.List;

public class MessagesReportsRequest {

    /**
     * List of message reports
     */
    private List<MessageReport> results;

    public MessagesReportsRequest() {
    }
    
    public MessagesReportsRequest(List<MessageReport> results) {
        this.results = results;
    }

    public List<MessageReport> geResults() {
        return results;
    }

    public void setResults(List<MessageReport> results) {
        this.results = results;
    }
}

