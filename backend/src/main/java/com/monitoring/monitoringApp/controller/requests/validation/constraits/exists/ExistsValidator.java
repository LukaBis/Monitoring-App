package com.monitoring.monitoringApp.controller.requests.validation.constraits.exists;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import com.monitoring.monitoringApp.repositories.ContactRepository;

public class ExistsValidator implements ConstraintValidator<Exists, Integer> {
    
    @Autowired
    ContactRepository contactRepository;

    @Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {
		return id != null && contactRepository.existsById(id);
	}
}
