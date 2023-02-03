package com.monitoring.monitoringApp.converters;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.monitoring.monitoringApp.dto.MessageDto;
import com.monitoring.monitoringApp.models.Message;
import com.monitoring.monitoringApp.repositories.ContactRepository;
import com.monitoring.monitoringApp.repositories.StatusRepository;

@Component
public class MessageConverter {

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    StatusRepository statusRepository;
    
    public MessageDto entityToDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        dto.setBulkId(message.getBulkId());
        dto.setText(message.getText());
        dto.setStatusGroupName(message.getStatus().getStatusGroup().getName());
        dto.setStatusId(message.getStatus().getId());
        dto.setCreated(message.getCreateDate());

        try {
            dto.setContactName(message.getContact().getName());
            dto.setContactId(message.getContact().getId());
        } catch (NullPointerException e) {
            dto.setContactName(null);
            dto.setContactId(null);
        }

        try {
            dto.setPhonenumber(message.getSendTo());
        } catch (NullPointerException e) {
            dto.setPhonenumber(null);
        }
        
        return dto;
    }

    public List<MessageDto> entityToDto(List<Message> messages) {
        return	messages.stream().map(x -> entityToDto(x)).collect(Collectors.toList());
    }

    public Message dtoToEntity(MessageDto dto) {
        Message message = new Message();
        message.setId(dto.getId());
        message.setBulkId(dto.getBulkId());
        message.setText(dto.getText());
        message.setSendTo(dto.getPhonenumber());
        message.setStatus(
            statusRepository.findById(dto.getStatusId()).get()
        );
        message.setContact(
            contactRepository.findById(dto.getContactId()).get()
        );

        return message;
    }
}
