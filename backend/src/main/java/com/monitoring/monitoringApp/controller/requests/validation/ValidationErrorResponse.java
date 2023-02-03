package com.monitoring.monitoringApp.controller.requests.validation;

import java.util.ArrayList;
import java.util.List;

public class ValidationErrorResponse {
    
    private List<Violation> violations = new ArrayList<>();

    public List<Violation> getViolations() {
        return this.violations;
    }
}
