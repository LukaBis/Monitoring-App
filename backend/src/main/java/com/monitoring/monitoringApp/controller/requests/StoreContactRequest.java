package com.monitoring.monitoringApp.controller.requests;

import javax.validation.constraints.NotEmpty;

public class StoreContactRequest {
    
    @NotEmpty(message = "Name is required.")
    private String name;

    @NotEmpty(message = "Number is required.")
    private String number;

    public StoreContactRequest(String name, String number) {
        this.name = name;
        this.number = number;
    }

    public String getName() {
        return this.name;
    }

    public String getNumber() {
        return this.number;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNumber(String number) {
        this.number = number;
    }

}
