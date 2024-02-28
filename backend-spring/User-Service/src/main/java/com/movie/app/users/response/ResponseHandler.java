package com.movie.app.users.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

public class ResponseHandler {
    //return response entity with a hashmap containing message, status value and responseObject
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        var res = new HashMap<>();
        res.put("Message", message);
        res.put("Status", status);
        res.put("Response", responseObj);
        return ResponseEntity.status(status).body(res);
    }
}
