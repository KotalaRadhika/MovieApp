package com.movie.app.service;

import com.movie.app.dto.MovieDto;
import com.movie.app.exception.MovieNotFoundException;

import java.net.URISyntaxException;
import java.util.List;

public interface MovieService {
    List<MovieDto> getTop100Movies() throws URISyntaxException;
    MovieDto getMovieById(String id) throws URISyntaxException, MovieNotFoundException;


}
