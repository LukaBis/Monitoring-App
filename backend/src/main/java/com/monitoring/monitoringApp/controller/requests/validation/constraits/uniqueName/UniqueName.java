package com.monitoring.monitoringApp.controller.requests.validation.constraits.uniqueName;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = UniqueNameValidator.class)
@Retention(RUNTIME)
@Target({ FIELD })
public @interface UniqueName {
    
    public String message() default "There is already contact with this name!";
	
	public Class<?>[] groups() default {};
	
	public Class<? extends Payload>[] payload() default{};
}
