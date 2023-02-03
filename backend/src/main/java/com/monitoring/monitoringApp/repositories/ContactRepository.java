package com.monitoring.monitoringApp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.monitoring.monitoringApp.models.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

    boolean existsByName(String name);
    boolean existsByNumber(String number);

    long deleteByName(String name);
    long deleteByNumber(String number);
   
}