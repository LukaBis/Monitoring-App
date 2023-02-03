package com.monitoring.monitoringApp.converters;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.monitoring.monitoringApp.dto.StatusDto;
import com.monitoring.monitoringApp.models.Status;

@Component
public class StatusConverter {
    
    public StatusDto entityToDto(Status status) {
        StatusDto dto = new StatusDto();
        dto.setId(status.getId());
        dto.setStatusGroupName(status.getStatusGroup().getName());

        return dto;
    }

    public List<StatusDto> entityToDto(List<Status> statuses) {
        return	statuses.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }
}
