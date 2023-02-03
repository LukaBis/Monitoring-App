package com.monitoring.monitoringApp.controller.requests.validation.constraits.uniqueNumber;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import com.monitoring.monitoringApp.repositories.ContactRepository;

public class UniqueNumberValidator implements ConstraintValidator<UniqueNumber, String> {
    
    @Autowired
    ContactRepository contactRepository;

    @Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return value != null && !contactRepository.existsByNumber(value);
	}
}
