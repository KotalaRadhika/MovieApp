package com.movie.app.authentication.AuthenticationService.repository;

import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepo extends JpaRepository<UserDetails,String> {
    @Query("SELECT u FROM UserDetails u WHERE u.username = :username and u.password = :password")
    UserDetails validateUser(String username, String password);
}
