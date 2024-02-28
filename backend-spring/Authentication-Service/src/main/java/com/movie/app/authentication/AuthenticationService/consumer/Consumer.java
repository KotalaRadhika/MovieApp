package com.movie.app.authentication.AuthenticationService.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movie.app.authentication.AuthenticationService.domain.dto.UserDto;
import com.movie.app.authentication.AuthenticationService.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class Consumer {
    private static final String userTopic = "${topic.name}";

    private final ObjectMapper objectMapper;
    private final LoginService loginService;

    @Autowired
    public Consumer(ObjectMapper objectMapper, LoginService loginService) {
        this.objectMapper = objectMapper;
        this.loginService = loginService;
    }

    @KafkaListener(topics = userTopic)
    public void consumeMessage(String message) throws JsonProcessingException {

        UserDto userDto = objectMapper.readValue(message, UserDto.class);
        loginService.saveUserData(userDto);
    }

}
