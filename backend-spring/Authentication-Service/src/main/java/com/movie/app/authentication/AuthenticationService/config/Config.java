package com.movie.app.authentication.AuthenticationService.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }


//    @Bean
//    public RestTemplate restTemplate(){
//        return new RestTemplate();
//    }

}
