package com.movie.app.authentication.AuthenticationService.controller;

import com.movie.app.authentication.AuthenticationService.domain.AuthResponse;
import com.movie.app.authentication.AuthenticationService.service.LoginServiceImpl;
import com.movie.app.authentication.AuthenticationService.utils.JwtTokenGeneratorImpl;
import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import com.movie.app.authentication.AuthenticationService.exception.UserNotFoundException;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/movie")
@OpenAPIDefinition(
        info = @Info
                (title = "Movie App Authentication server API",
                        description = "This API provides endpoints for authenticating users."))

public class LoginController {
//    @Autowired
//    private RestTemplate restTemplate;
    @Autowired
    private LoginServiceImpl loginService;
    @Autowired
    private JwtTokenGeneratorImpl jwtTokenGenerator;

    private final AuthResponse authResponse = new AuthResponse();



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDetails user) throws UserNotFoundException {
        try {
            if (user.getUsername() == null || user.getPassword() == null) {
                throw new UserNotFoundException("username and password cannot be empty");
            }
            boolean flag = loginService.validateUserService(user.getUsername(), user.getPassword());
            if (!flag)
                throw new UserNotFoundException("Invalid Credentials");
            var tokenMap = jwtTokenGenerator.generateToken(user);
            return ResponseEntity.status(HttpStatus.OK).body(tokenMap);
        } catch (UserNotFoundException ex) {
            throw new RuntimeException(ex);
        }
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    //The method validates token at the end
    //@param String token
    //@return AuthResponse, HttpStatus
    @GetMapping("/validate")
    public ResponseEntity<?> getValidity(@RequestHeader("Authorization") String token) {

        if (token == null) {
            authResponse.setValid(false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("token cannot be empty"+authResponse);
        } else {
            String authToken = token.substring(7);
            boolean valid=jwtTokenGenerator.validateToken(authToken);
            if (valid) {
                authResponse.setValid(true);
                //authResponse.setUsername(jwtTokenGenerator.getUserName(token));
            } else {
                authResponse.setValid(false);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid token");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Valid token "+authResponse);

    }



}
