package com.movie.app.wishlist.WishlistMovieApp.clients;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "authentication",url = "http://localhost:8083")
public interface AuthClient {

    @GetMapping("/validate")
    public ResponseEntity<?> getValidity(@RequestHeader("Authorization") String token);

}
