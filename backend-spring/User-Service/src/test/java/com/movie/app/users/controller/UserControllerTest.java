package com.movie.app.users.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.movie.app.users.domain.Users;
import com.movie.app.users.exception.UserAlreadyExistException;
import com.movie.app.users.service.UserServiceImpl;
import io.swagger.v3.core.util.Json;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserControllerTest {

    @Mock
    private UserServiceImpl userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveUserSuccess() throws JsonProcessingException, UserAlreadyExistException {
        Users userDetails = new Users();
        when(userService.saveUser(any(Users.class))).thenReturn(userDetails);

        ResponseEntity<?> responseEntity = userController.saveUser(userDetails);

        assertEquals(HttpStatus.CREATED,responseEntity.getStatusCode());
        assertEquals(userDetails, responseEntity.getBody());

    }

    @Test
    void saveUserUserAlreadyExists() throws JsonProcessingException, UserAlreadyExistException {
        Users userDetails = new Users();
        when(userService.saveUser(any(Users.class))).thenThrow(new UserAlreadyExistException("user already exists"));

        ResponseEntity<?> responseEntity = userController.saveUser(userDetails);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertTrue(responseEntity.getBody().toString().contains("user already exists"));

    }
}
