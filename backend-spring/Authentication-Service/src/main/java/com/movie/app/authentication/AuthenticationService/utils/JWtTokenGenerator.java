package com.movie.app.authentication.AuthenticationService.utils;

import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import com.movie.app.authentication.AuthenticationService.exception.UserNotFoundException;

import java.util.Map;

public interface JWtTokenGenerator {

    Map<String, String> generateToken(UserDetails user) throws UserNotFoundException;
}

