package com.movie.app.users.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.movie.app.users.domain.Users;
import com.movie.app.users.exception.UserAlreadyExistException;
import com.movie.app.users.respoistory.UserRepo;
import org.apache.catalina.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.movie.app.users.producer.Producer;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class UserServiceImplTest {

    @Mock
    private Producer producer;
    @Mock
    private UserRepo userRepo;
    @InjectMocks
    private UserServiceImpl userService;
    private Users newUser,existingUser;
    private Optional optional;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
        newUser = new Users("user","password");
        existingUser = new Users("exstingUser","password");
        optional = Optional.of(existingUser);
    }

    @Test
    void saveUserWithNonExistingUserShouldSaveUser() throws UserAlreadyExistException, JsonProcessingException{


        when(userRepo.findById(newUser.getUserName())).thenReturn(Optional.empty());
        when(userRepo.existsById(newUser.getUserName())).thenReturn(false);
        when(userRepo.save(newUser)).thenReturn(newUser);

        Users savedUser = userService.saveUser(newUser);
        assertNotNull(savedUser);
        assertEquals(newUser,userService.saveUser(newUser));

        verify(userRepo,times(2)).findById(newUser.getUserName());
        verify(userRepo,times(2)).existsById(newUser.getUserName());
        verify(userRepo,times(2)).save(newUser);
        verifyNoInteractions(producer);

    }

    @Test
    void saveUserWithExistingUserShouldThrowException(){

        when(userRepo.findById(existingUser.getUserName())).thenReturn(Optional.of(existingUser));
        when(userRepo.existsById(existingUser.getUserName())).thenReturn(true);


        assertThrows(UserAlreadyExistException.class,()->userService.saveUser(existingUser));

        verify(userRepo,never()).save(existingUser);
    }

}
