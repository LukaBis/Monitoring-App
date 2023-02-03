package com.monitoring.monitoringApp.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import com.monitoring.monitoringApp.controller.requests.SendMessageRequest;
import com.monitoring.monitoringApp.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Value;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class MessageControllerTest {

    @Value(value="${local.server.port}")
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

    @Autowired
    MessageRepository messageRepository;

	@Test
	public void testGettingAllMessages() throws Exception {
		assertEquals(
            this.restTemplate.getForEntity(
                "http://localhost:" + port + "/messages",
                String.class
            ).getStatusCode(),
            HttpStatus.OK
        );
	}

    @Test
    public void testSendingMessage() {
        String url = "http://localhost:" + port + "/message";
        SendMessageRequest message = new SendMessageRequest("Hello user!", "385957229550", null);
        HttpStatus response = restTemplate.postForObject(url, message, HttpStatus.class);
        assertEquals(HttpStatus.OK, response);
        assertEquals("Hello user!", messageRepository.findByText(message.getTextMessage()).get(0).getText());
    }
    
}
