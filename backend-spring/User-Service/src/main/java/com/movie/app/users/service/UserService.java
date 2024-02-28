package com.movie.app.users.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.movie.app.users.domain.Users;
import com.movie.app.users.exception.UserAlreadyExistException;

public interface UserService {
    Users saveUser(Users user) throws UserAlreadyExistException, JsonProcessingException;
}
