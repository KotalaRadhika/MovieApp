package com.movie.app.users.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Users {


    @Id
    @NotEmpty(message = "user name cannot be empty")
    private String userName;

    @NotEmpty(message = "full name cannot be empty")
    private String fullname;

    @NotEmpty(message = "Email cannot be empty")
    @Email
    private String email;

    @NotBlank(message = "password cannot be blank")
    private String password;

    public Users(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }
}
