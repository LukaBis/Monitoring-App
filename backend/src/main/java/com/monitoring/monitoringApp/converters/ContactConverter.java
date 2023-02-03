package com.monitoring.monitoringApp.converters;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import com.monitoring.monitoringApp.dto.ContactDto;
import com.monitoring.monitoringApp.models.Contact;

@Component
public class ContactConverter {
    public ContactDto entityToDto(Contact contact) {
        ContactDto dto = new ContactDto();
        dto.setId(contact.getId());
        dto.setName(contact.getName());
        dto.setNumber(contact.getNumber());

        return dto;
    }

    public List<ContactDto> entityToDto(List<Contact> contacts) {
        return	contacts.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }
}
