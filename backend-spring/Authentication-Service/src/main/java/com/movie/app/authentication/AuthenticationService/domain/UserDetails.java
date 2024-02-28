package com.movie.app.authentication.AuthenticationService.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user_details")
public class UserDetails {
    @Id
    private String username;

    private String password;


    public UserDetails(String username, String password) {
    }
}

