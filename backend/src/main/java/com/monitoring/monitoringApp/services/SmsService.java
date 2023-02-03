package com.monitoring.monitoringApp.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.infobip.ApiClient;
import com.infobip.ApiException;
import com.infobip.api.SendSmsApi;
import com.infobip.model.SmsAdvancedTextualRequest;
import com.infobip.model.SmsDestination;
import com.infobip.model.SmsResponse;
import com.infobip.model.SmsTextualMessage;
import com.monitoring.monitoringApp.models.Message;
import com.monitoring.monitoringApp.repositories.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;

@Service
public class SmsService {

    @Value("${base.url}")
    private String BASE_URL;

    @Value("${api.key}")
    private String API_KEY;

    @Autowired
    StatusRepository statusRepository;

    private static final String SENDER = "Monitoring app";
    
    public Message send(String text, String phoneNumber) {
        ApiClient client = initApiClient();
 
        SendSmsApi sendSmsApi = new SendSmsApi(client);
 
        SmsTextualMessage smsMessage  = new SmsTextualMessage()
                .from(SENDER)
                .addDestinationsItem(new SmsDestination().to(phoneNumber))
                .notifyUrl("http://3.135.237.46:8080/message-report")
                .text(text);
 
        SmsAdvancedTextualRequest smsMessageRequest = new SmsAdvancedTextualRequest()
                .messages(Collections.singletonList(smsMessage));
 
        Message messageSent = new Message();

        try {
            SmsResponse smsResponse = sendSmsApi.sendSmsMessage(smsMessageRequest);
            
            messageSent.setId(smsResponse.getMessages().get(0).getMessageId());
            messageSent.setBulkId(smsResponse.getBulkId());
            messageSent.setStatus(
                statusRepository.findById(
                    Integer.parseInt(smsResponse.getMessages().get(0).getStatus().getId().toString())
                ).get()
            );
            messageSent.setText(text);
            messageSent.setSendTo(phoneNumber);
            
            System.out.println("Response body: " + smsResponse);
        } catch (ApiException e) {
            System.out.println("HTTP status code: " + e.getCode());
            System.out.println("Response body: " + e.getResponseBody());
        }

        return messageSent;
    }
 
    private ApiClient initApiClient() {
        ApiClient client = new ApiClient();
 
        client.setApiKeyPrefix("App");
        client.setApiKey(API_KEY);
        client.setBasePath(BASE_URL);
 
        return client;
    }
}
