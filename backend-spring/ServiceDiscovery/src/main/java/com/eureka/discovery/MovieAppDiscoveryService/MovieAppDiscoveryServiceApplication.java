package com.eureka.discovery.MovieAppDiscoveryService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer

public class MovieAppDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieAppDiscoveryServiceApplication.class, args);
	}

}
