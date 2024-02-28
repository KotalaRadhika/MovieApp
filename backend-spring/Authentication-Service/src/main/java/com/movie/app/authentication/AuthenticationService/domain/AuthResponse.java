package com.movie.app.authentication.AuthenticationService.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Id;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AuthResponse {
    @Id
    @JsonProperty
    private String username;
    //Is Token valid
    private boolean isValid;
}
