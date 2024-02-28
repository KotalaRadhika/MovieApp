package com.movie.app.users.producer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.app.users.domain.UserAuth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component

public class Producer {
    private Logger log = LoggerFactory.getLogger(Producer.class);
    @Value("${topic.name}")
    private String userTopic;

    private final ObjectMapper objectMapper;

    private final KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public Producer(KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public String sendData(UserAuth userAuth) throws JsonProcessingException {

        String userData = objectMapper.writeValueAsString(userAuth);

        kafkaTemplate.send(userTopic, userData);
        log.debug("kafka message sent "+userData+"  topic"+userTopic);

        return "Data sent";
    }
}
