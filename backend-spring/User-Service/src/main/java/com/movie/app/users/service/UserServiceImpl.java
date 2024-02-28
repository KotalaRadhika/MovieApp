package com.movie.app.users.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.movie.app.users.domain.UserAuth;
import com.movie.app.users.domain.Users;
import com.movie.app.users.exception.UserAlreadyExistException;
import com.movie.app.users.producer.Producer;
import com.movie.app.users.respoistory.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private final Producer producer;
    private final UserRepo userRepo;
    UserAuth userAuth = new UserAuth();

    @Autowired
    private UserServiceImpl(Producer producer, UserRepo userRepo) {
        this.producer = producer;
        this.userRepo = userRepo;
    }

    @Override
    public Users saveUser(Users user) throws UserAlreadyExistException, JsonProcessingException {
        Optional<Users> userResult = userRepo.findById(user.getUserName());
        if (userRepo.existsById(user.getUserName())) {
            throw new UserAlreadyExistException("User Already Exists with id : " + user.getUserName());
        } else if (userResult.isPresent()) {
            throw new UserAlreadyExistException("User Already Exists with id : " + user.getUserName());
        } else if ((user.getUserName() == null) || (user.getUserName().isEmpty())) {
            throw new UserAlreadyExistException("User name cannot be empty");
        } else if ((user.getPassword() == null) || (user.getPassword().isEmpty())) {
            throw new UserAlreadyExistException("Password cannot be empty");
        }
        userAuth.setUsername(user.getUserName());
        userAuth.setPassword(user.getPassword());
        producer.sendData(userAuth);
        return userRepo.save(user);
    }
}
