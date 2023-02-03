package com.monitoring.monitoringApp.dto;

public class StatusDto {

    private int id;
    private String statusGroupName;


    public int getId() {
        return id;
    }

    public String getStatusGroupName() {
        return statusGroupName;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setStatusGroupName(String statusGroupName) {
        this.statusGroupName = statusGroupName;
    }
}