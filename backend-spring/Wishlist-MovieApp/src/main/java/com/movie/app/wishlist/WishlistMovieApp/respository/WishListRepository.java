package com.movie.app.wishlist.WishlistMovieApp.respository;

import com.movie.app.wishlist.WishlistMovieApp.domain.Movie;
import com.movie.app.wishlist.WishlistMovieApp.domain.MovieRequest;
import com.movie.app.wishlist.WishlistMovieApp.domain.Wishlist;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

@Transactional
public interface WishListRepository extends JpaRepository<Wishlist,String> {

    @Query("SELECT w FROM Wishlist w  WHERE w.username = ?1")
    List<Wishlist> findByUsername(String givenUsername);


    //@Query("SELECT * FROM wishlist w WHERE w.username = :givenUsername AND w.id = :givenId")
    @Query("SELECT w FROM Wishlist w WHERE w.username = ?1 AND w.movieId = ?2")
    List<Wishlist> findByUsernameAndRank(String givenUsername, String givenId);


    String deleteByMovieId(String movieId);
}
