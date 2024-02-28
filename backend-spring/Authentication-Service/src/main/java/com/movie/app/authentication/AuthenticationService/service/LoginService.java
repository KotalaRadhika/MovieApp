package com.movie.app.authentication.AuthenticationService.service;

import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import com.movie.app.authentication.AuthenticationService.domain.dto.UserDto;
import com.movie.app.authentication.AuthenticationService.exception.UserNotFoundException;

public interface LoginService {
    boolean validateUserService(String userName, String password) throws UserNotFoundException;

    void saveUserData(UserDto userDto);
}

