package com.monitoring.monitoringApp.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.monitoring.monitoringApp.controller.requests.StoreContactRequest;
import com.monitoring.monitoringApp.converters.ContactConverter;
import com.monitoring.monitoringApp.dto.ContactDto;
import com.monitoring.monitoringApp.models.Contact;
import com.monitoring.monitoringApp.repositories.ContactRepository;

@RestController
public class ContactController {

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    ContactConverter contactConverter;
    
    @PostMapping("/contact")
    public ResponseEntity<ContactDto> storeContact(@Valid @RequestBody StoreContactRequest storeContactRequest) {
        
        Contact contact = new Contact();
        contact.setName(storeContactRequest.getName());
        contact.setNumber(storeContactRequest.getNumber());
        contactRepository.save(contact);
        
        return new ResponseEntity<>(
            contactConverter.entityToDto(contact),
            HttpStatus.OK
        );
    }

    @GetMapping("/contacts")
    public List<ContactDto> getAllContactDtos() {

        List<ContactDto> contactDtos = contactConverter.entityToDto(
            contactRepository.findAll()
        );

        return contactDtos;
    }

    @DeleteMapping("/contact/{id}")
    public HttpStatus deleteContact(@PathVariable Integer id) {

        // can't use annotation for this because it is PathVariable
        if (!contactRepository.existsById(id)) {
            return HttpStatus.BAD_REQUEST; 
        }

        contactRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
