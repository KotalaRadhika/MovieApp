package com.movie.app.authentication.AuthenticationService.exception;

public class UserNotFoundException extends Exception {

    public String message;

    public UserNotFoundException(String message){
        super(message);
        this.message = message;
    }
    public UserNotFoundException(){

    }
}
