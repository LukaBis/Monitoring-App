package com.monitoring.monitoringApp.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.monitoring.monitoringApp.models.Message;

public interface MessageRepository extends JpaRepository<Message, String> {
   
    @Query("SELECT m FROM Message m WHERE m.text = :text")
    List<Message> findByText(@Param("text") String name);

}