package com.movie.app.users.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.movie.app.users.domain.Users;
import com.movie.app.users.exception.UserAlreadyExistException;
import com.movie.app.users.producer.Producer;
import com.movie.app.users.response.ResponseHandler;
import com.movie.app.users.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/movie")
@OpenAPIDefinition(
        info = @Info(
                title = "Movie App user registration service API",
                description = "This API provides endpoints for users to register."
        )
)
public class UserController {
    private Logger log = LoggerFactory.getLogger(Producer.class);
    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService){
        this.userService = userService;
    }

    @PostMapping(value = "/register",
    consumes = MediaType.APPLICATION_JSON_VALUE,
    produces = MediaType.APPLICATION_JSON_VALUE
    )

    public ResponseEntity<?> saveUser(@RequestBody Users userDetails){
        try{
            log.debug("inside saveUser method");
            Users user = userService.saveUser(userDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }catch (UserAlreadyExistException e){
            //return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            return ResponseHandler.generateResponse("User already exists", HttpStatus.CONFLICT,e.getMessage());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }




}
