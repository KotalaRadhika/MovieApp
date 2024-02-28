package com.movie.app.wishlist.WishlistMovieApp.clients;


import com.movie.app.wishlist.WishlistMovieApp.domain.MovieResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "movie-service", url = "http://radhika-movie-service-env.eba-arzcdmy6.us-east-2.elasticbeanstalk.com/movie")
public interface MovieClient {
    @GetMapping("/getMovieById/{id}")
    public ResponseEntity<MovieResponse> getByTitle(@PathVariable("id") String id);
}
