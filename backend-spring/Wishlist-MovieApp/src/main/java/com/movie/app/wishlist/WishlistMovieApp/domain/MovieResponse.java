package com.movie.app.wishlist.WishlistMovieApp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponse{
    private int rank;
    private String title;
    private String description;
    private String image;
    private String big_image;
    private List<String> genre;
    private String thumbnail;
    private String rating;
    private String id;
    private int year;
    private String imdbid;
    private String imdb_link;

}
