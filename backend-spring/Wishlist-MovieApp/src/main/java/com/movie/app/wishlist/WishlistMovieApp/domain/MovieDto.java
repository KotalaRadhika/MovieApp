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

@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieDto{
    @JsonProperty("rank")
    private int rank;
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String description;
    @JsonProperty("image")
    private String image;
    @JsonProperty("big_image")
    private String big_image;
    @JsonProperty("genre")
    private List<String> genre;
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("rating")
    private String rating;
    @JsonProperty("id")
    private String id;
    @JsonProperty("year")
    private int year;
    @JsonProperty("imdbid")
    private String imdbid;
    @JsonProperty("imdb_link")
    private String imdb_link;

}
