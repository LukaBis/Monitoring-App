package com.monitoring.monitoringApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.monitoring.monitoringApp.models.StatusGroup;

public interface StatusGroupRepository extends JpaRepository<StatusGroup, Integer> {   
}