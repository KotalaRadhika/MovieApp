package com.movie.app.authentication.AuthenticationService.service;

import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import com.movie.app.authentication.AuthenticationService.domain.dto.UserDto;
import com.movie.app.authentication.AuthenticationService.exception.UserNotFoundException;
import com.movie.app.authentication.AuthenticationService.repository.AuthRepo;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    private Logger log = LoggerFactory.getLogger(LoginServiceImpl.class);
    @Autowired
    private AuthRepo authRepo;

    private final ModelMapper modelMapper;

    public LoginServiceImpl(AuthRepo authRepo, ModelMapper modelMapper) {
        this.authRepo = authRepo;
        this.modelMapper = modelMapper;
    }

    public void saveUserData(UserDto userDto) {
        UserDetails userDetails = modelMapper.map(userDto, UserDetails.class);
        UserDetails savedData = authRepo.save(userDetails);

        log.info("user data from kafka {}", savedData);
    }


    public UserDetails getUser(String userName) throws UserNotFoundException {
        UserDetails userDetails = authRepo.findById(userName).orElseThrow();
        UserDetails user = new UserDetails(userDetails.getUsername(), userDetails.getPassword());
        return user;
    }
    public boolean validateUserService(String username, String password) throws UserNotFoundException {

        UserDetails user = authRepo.validateUser(username, password);
        return user != null;
    }



}
