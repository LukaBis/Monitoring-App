package com.monitoring.monitoringApp.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.monitoring.monitoringApp.converters.StatusConverter;
import com.monitoring.monitoringApp.dto.StatusDto;
import com.monitoring.monitoringApp.repositories.StatusRepository;

@RestController
public class StatusController {

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    StatusConverter statusConverter;
    
    /**
     * There is a form on frontend part of this application. That form is used to
     * manually change status of the message. This method provides statuses that
     * are listed in dropdown of that form.
     * 
     */
    @GetMapping("statuses-for-chaging-delivery-status")
    public List<StatusDto> getStatusesForChangeDeliveryStatusForm() {
        List<String> statusNames = new ArrayList<>();
        statusNames.add("DELIVERED_TO_HANDSET");
        statusNames.add("CUSTOM_STATUS_REJECTED_UNKNOWN");
        List<StatusDto> statuses = statusConverter.entityToDto(
            statusRepository.findByNameIn(statusNames)
        );

        return statuses;
    }
}
