package com.monitoring.monitoringApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.monitoring.monitoringApp.controller.requests.ChangeMessageStatusDeliveryRequest;
import com.monitoring.monitoringApp.controller.requests.MessageReport;
import com.monitoring.monitoringApp.controller.requests.MessagesReportsRequest;
import com.monitoring.monitoringApp.controller.requests.SendMessageRequest;
import com.monitoring.monitoringApp.dto.MessageDto;
import com.monitoring.monitoringApp.models.Message;
import com.monitoring.monitoringApp.models.Status;
import com.monitoring.monitoringApp.repositories.ContactRepository;
import com.monitoring.monitoringApp.repositories.MessageRepository;
import com.monitoring.monitoringApp.repositories.StatusRepository;
import com.monitoring.monitoringApp.services.SmsService;
import com.monitoring.monitoringApp.converters.MessageConverter;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

@RestController
public class MessageController {

    @Autowired
    private SmsService smsService;

    @Autowired
    StatusRepository statusRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    MessageConverter messageConverter;
    
    @Autowired
    ContactRepository contactRepository;

    @PostMapping("/message")
    public HttpStatus message(@RequestBody SendMessageRequest sendMessageRequest) {

        Message newMessage = smsService.send(
            sendMessageRequest.getTextMessage(),
            getRecipientPhonenumber(sendMessageRequest)
        );

        if (sendMessageRequest.getContactId() != null) {
            newMessage.setContact(
                contactRepository.findById(sendMessageRequest.getContactId()).get()
            );
        }
        
        messageRepository.save(newMessage);
        return HttpStatus.OK;
    }

    private String getRecipientPhonenumber(SendMessageRequest sendMessageRequest) {
        if (sendMessageRequest.getContactId() == null) {
            return sendMessageRequest.getPhoneNumber();
        }

        return contactRepository.findById(sendMessageRequest.getContactId()).get().getNumber();
    }

    @GetMapping("/messages")
    public List<MessageDto> getMessages(@RequestParam(name = "numberOfMessages", required = false) Integer numberOfMessages) {

        List<Message> messages;

        if(numberOfMessages != null) {
            PageRequest limit = PageRequest.of(0,numberOfMessages, Sort.by(Direction.DESC, "createDate"));
            messages = messageRepository.findAll(limit).getContent();
            return messageConverter.entityToDto(messages);
        }

        messages = messageRepository.findAll(Sort.by(Direction.DESC, "createDate"));      
        
        return messageConverter.entityToDto(messages);
    }

    @PostMapping("message-report")
    public HttpStatus messageReport(@RequestBody MessagesReportsRequest messagesReportsRequest) {
        messagesReportsRequest.geResults().forEach(
            report -> {
                updateMessageStatus(report);
            }
        );
        
        return HttpStatus.OK;
    }

    private void updateMessageStatus(MessageReport report) {
        Message message = messageRepository.findById(report.getMessageId()).get();
        Status newStatus = statusRepository.findById(report.getStatusDto().getId()).get();
        message.setStatus(newStatus);
        messageRepository.save(message);
    }

    @PatchMapping("message-status")
    public HttpStatus changeMessageStatusDelivery(@RequestBody ChangeMessageStatusDeliveryRequest request) {
        
        if (!(statusRepository.existsById(request.statusId) && messageRepository.existsById(request.messageId))) {
            return HttpStatus.BAD_REQUEST;
        }
        
        Message message = messageRepository.findById(request.messageId).get();
        Status newStatus = statusRepository.findById(request.statusId).get();
        message.setStatus(newStatus);
        messageRepository.save(message);
        return HttpStatus.OK;
    }
}
