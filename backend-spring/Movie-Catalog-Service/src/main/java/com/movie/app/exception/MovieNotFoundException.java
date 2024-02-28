package com.movie.app.exception;

public class MovieNotFoundException extends Throwable {
    public MovieNotFoundException(String msg) {
        super(msg);
    }
}
