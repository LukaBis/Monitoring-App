package com.monitoring.monitoringApp.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import com.monitoring.monitoringApp.repositories.ContactRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class ContactControllerTest {
    
    @Autowired
	private MockMvc mockMvc;

    @Autowired
    ContactRepository contactRepository;

    @Test
    @Transactional
	public void testStoringNewContact() throws Exception {
        // make sure there is no John or contact with 385947778888 number
        // before running tests
        contactRepository.deleteByName("John");
        contactRepository.deleteByNumber("385957229551");

		String requestBody = "{\"name\": \"John\", \"number\": \"385957229551\"}";

        mockMvc.perform(post("/contact")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestBody))
            .andExpect(status().isOk());
	}
}
