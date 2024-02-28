package com.movie.app.wishlist.WishlistMovieApp.controller;

import com.movie.app.wishlist.WishlistMovieApp.domain.Wishlist;
import com.movie.app.wishlist.WishlistMovieApp.exception.MovieAlreadyExistsInWishlist;
import com.movie.app.wishlist.WishlistMovieApp.response.ResponseHandler;
import com.movie.app.wishlist.WishlistMovieApp.service.WishlistService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/movie/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }


    @GetMapping(value ="/add/{username}/{id}",

            produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Takes username and movieId, calls movie service to fetch details and if details found saves to wishlist")
    @ApiResponse(responseCode = "200", description = "Given MovieId added to User's wishlist")

    @CircuitBreaker(name = "addToWishListBreaker", fallbackMethod = "addToWishlistFallback")

    public ResponseEntity<?> addToWishlist(
            @PathVariable String username,
            @PathVariable String id ) throws Exception {

        try {
            Wishlist wishlist = wishlistService.saveToWishlist(username, id);
            //return ResponseEntity.status(HttpStatus.CREATED).body(id + " Movie added to wishlist");
            return ResponseHandler.generateResponse("movie added to watchlist", HttpStatus.CREATED,wishlist);
        } catch (MovieAlreadyExistsInWishlist e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }
    public ResponseEntity<Wishlist> addToWishlistFallback(String username,String movieId, Exception ex) {
         ex.printStackTrace();

        Wishlist wishlist = new Wishlist();
        wishlist.setId(1);
        wishlist.setUsername("dummyUser");
        wishlist.setEmail("dummyUser@gmail.com");
        wishlist.setMovieId("dummyMovie");

        return new ResponseEntity<>(wishlist, HttpStatus.BAD_REQUEST);
    }



    @GetMapping("/all/{username}")
    public ResponseEntity<?> getAllMoviesFromWishlist(
                                                      @PathVariable String username) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(wishlistService.getAllMoviesByUsername(username));

//        if(wishlistService.isSessionValid(token)){
//            return ResponseEntity.status(HttpStatus.OK).body(wishlistService.getAllMoviesByUsername(username));
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No data found");
//        }
    }
    @DeleteMapping("/delete/{username}/{id}")
    public ResponseEntity<?> deleteMovieFromWishlist(
            @PathVariable String username,
            @PathVariable(value = "id") String id
    ){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(wishlistService.deleteFromWishlist(username,id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
