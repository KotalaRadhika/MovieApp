package com.movie.app.controller;

import com.movie.app.dto.MovieDto;
import com.movie.app.exception.MovieNotFoundException;
import com.movie.app.response.ResponseHandler;
import com.movie.app.service.MovieServiceImpl;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/movie")
@OpenAPIDefinition(
        info = @Info(
                title = "Movie App Service",
                description = "This API calls external api Rapid API IMDB."
        )
)
public class MovieCatalogController {
    @Autowired
    private final MovieServiceImpl movieService;
    private ResponseHandler responseHandler;

    public MovieCatalogController(MovieServiceImpl movieService){
        this.movieService = movieService;
    }

    @GetMapping("/getTop100")
    public ResponseEntity<?> getTop100() {
        try {
            List<MovieDto> movies = movieService.getTop100Movies();
            return ResponseEntity.status(HttpStatus.OK).body(movies);
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getMovieById/{id}")

    public ResponseEntity<?> getByTitle(@PathVariable String id) throws MovieNotFoundException {
        try {

            MovieDto movie = movieService.getMovieById(id);
            return ResponseEntity.status(HttpStatus.OK).body(movie);
            //return responseHandler.generateResponse("Successfully retrieved data!", HttpStatus.OK, movie);

        } catch (Exception e) {
            String msg = e.getMessage();
            return responseHandler.generateResponse("Movie not found", HttpStatus.BAD_REQUEST, e.getLocalizedMessage());

        } catch (MovieNotFoundException e) {
            throw new MovieNotFoundException("movie not found");
        }
    }



}
