package com.monitoring.monitoringApp.controller.requests.validation.constraits.exists;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = ExistsValidator.class)
@Retention(RUNTIME)
@Target({ FIELD })
public @interface Exists {
    
    public String message() default "There is no contact with this id!";
	
	public Class<?>[] groups() default {};
	
	public Class<? extends Payload>[] payload() default{};
}
