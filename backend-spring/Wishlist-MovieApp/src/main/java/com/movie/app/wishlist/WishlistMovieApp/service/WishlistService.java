package com.movie.app.wishlist.WishlistMovieApp.service;

import com.movie.app.wishlist.WishlistMovieApp.domain.MovieDto;
import com.movie.app.wishlist.WishlistMovieApp.domain.MovieResponse;
import com.movie.app.wishlist.WishlistMovieApp.domain.Wishlist;
import com.movie.app.wishlist.WishlistMovieApp.exception.MovieAlreadyExistsInWishlist;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface WishlistService {
    public Boolean isSessionValid(String token);

    Wishlist saveToWishlist(String username, String id) throws Exception;

    public List<MovieResponse> getAllMoviesByUsername(String username) throws Exception;

    public String deleteFromWishlist(String username,String movieId) throws Exception;

    // public ResponseEntity<?> getMovieById(String movieId);
}
