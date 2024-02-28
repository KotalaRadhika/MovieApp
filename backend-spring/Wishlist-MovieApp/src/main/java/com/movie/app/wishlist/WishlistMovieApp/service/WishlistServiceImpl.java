package com.movie.app.wishlist.WishlistMovieApp.service;

import com.movie.app.wishlist.WishlistMovieApp.clients.AuthClient;
import com.movie.app.wishlist.WishlistMovieApp.clients.MovieClient;
import com.movie.app.wishlist.WishlistMovieApp.domain.MovieDto;
import com.movie.app.wishlist.WishlistMovieApp.domain.MovieResponse;
import com.movie.app.wishlist.WishlistMovieApp.domain.Wishlist;
import com.movie.app.wishlist.WishlistMovieApp.exception.MovieAlreadyExistsInWishlist;
import com.movie.app.wishlist.WishlistMovieApp.respository.WishListRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@EnableCaching
public class WishlistServiceImpl implements WishlistService {

    private final AuthClient authClient;
    private final MovieClient movieClient;
    private final WishListRepository wishListRepo;

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    public WishlistServiceImpl(AuthClient authClient, MovieClient movieClient, WishListRepository wishListRepo) {
        this.authClient = authClient;
        this.movieClient = movieClient;
        this.wishListRepo = wishListRepo;
    }

    String username;

    @Override
    public Boolean isSessionValid(String token) {
        try {
            boolean value = authClient.getValidity(token).hasBody();
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public Wishlist saveToWishlist(String username, String id) throws Exception {
        List<Wishlist> wishlistDetails = wishListRepo.findByUsernameAndRank(username, id);
        if (!(wishlistDetails.isEmpty())) {
            throw new MovieAlreadyExistsInWishlist("Given Movie rank is already exists in wishlist");

        }
        Wishlist addToWishlist = new Wishlist();
        addToWishlist.setUsername(username);
        addToWishlist.setMovieId(id);
        return wishListRepo.save(addToWishlist);
//        ResponseEntity<?> movieResponse = movieClient.getByTitle(id);
//        if (movieResponse != null) {
//            addToWishlist.setMovieId(id);
//            return wishListRepo.save(addToWishlist);
//        } else {
//            throw new Exception("Movie details for the given id " + id + " not found");
//        }

    }

    @Override
    //@CachePut(value = "Wishlist_Username" , key = "#username")
    public List<MovieResponse> getAllMoviesByUsername(String username) throws Exception {
        List<MovieResponse> movieList = new ArrayList<>();
        List<Wishlist> list = wishListRepo.findByUsername(username);
        if (!list.isEmpty()) {
            for (Wishlist wishlist : list) {
                MovieResponse movieResponse = movieClient.getByTitle(wishlist.getMovieId()).getBody();
                movieList.add(movieResponse);
            }
            if (movieList.isEmpty()) {
                throw new Exception("movie id not found in wishlist");
            } else {
                return movieList;
            }
        } else {
            throw new Exception("User not found with name " + username);
        }
    }

    @Override
    //@CacheEvict(value = "Wishlist_Username" )
    public String deleteFromWishlist(String username, String movieId) throws Exception {
        List<Wishlist> details = wishListRepo.findByUsernameAndRank(username, movieId);
        if (details.isEmpty()) {
            throw new Exception("Movie id not found");
        } else {
            wishListRepo.deleteByMovieId(movieId);
            return movieId + "removed from wishlist";
        }
    }


}
