package com.movie.app.users.exception;

public class CustomValidationException extends RuntimeException {

    public CustomValidationException(String message) {
        super(message);
    }
}