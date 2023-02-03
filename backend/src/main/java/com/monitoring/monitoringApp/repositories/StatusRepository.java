package com.monitoring.monitoringApp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.monitoring.monitoringApp.models.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {

    List<Status> findByNameIn(List<String> statusNames);
   
}