package com.movie.app.wishlist.WishlistMovieApp.domain;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movie {

    private int id;
    private String title;
    private String rating;
}

//for testing -  can delete again and use MovieResponse
