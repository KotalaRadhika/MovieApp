package com.movie.app.service;

import com.movie.app.dto.MovieDto;
import com.movie.app.exception.MovieException;
import com.movie.app.exception.MovieNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{
    @Value("${rapidApiKey}")

    private String rapidApiKey;

    @Value("${rapidApiHost}")
    private String rapidApiHost;

   private final String baseUrl = "https://imdb-top-100-movies.p.rapidapi.com/";
    StringBuilder stringBuilder  = new StringBuilder(baseUrl);

    @Autowired
    private RestTemplate restTemplate;



    @Override
    @Cacheable(value = "top100")
    public List<MovieDto> getTop100Movies() throws URISyntaxException {
        //URI uri = new URI(stringBuilder.toString());
        URI url = new URI(baseUrl);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "13b4e49989mshbdd48e4cbebf5eap1acd04jsnd6604b846477");
        headers.set("X-RapidAPI-Host", "imdb-top-100-movies.p.rapidapi.com");
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        RequestEntity<Void> request = RequestEntity.get(url).headers(headers).build();

        ResponseEntity<MovieDto[]> responseEntity = restTemplate.exchange(url , HttpMethod.GET ,request,MovieDto[].class);

        //MovieDto[] responseEntity = restTemplate.getForObject(baseUrl,MovieDto[].class,request);
        List<MovieDto> movies = Arrays.asList(responseEntity.getBody());

        return movies;
    }

    //@Override
//    public Optional<Users> getUser(int id) {
//       return userRepo.findById(id);
//    }
//


    @Override
    @Cacheable(value = "movieById", key = "#id")
    public MovieDto getMovieById(String id) throws URISyntaxException, MovieNotFoundException {
        stringBuilder.append(id);
        String getUri = "https://imdb-top-100-movies.p.rapidapi.com/"+id;
        URI uri = new URI(getUri);
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "13b4e49989mshbdd48e4cbebf5eap1acd04jsnd6604b846477");
        headers.set("X-RapidAPI-Host", "imdb-top-100-movies.p.rapidapi.com");
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        RequestEntity<Void> request = RequestEntity.get(uri).headers(headers).build();

        ResponseEntity<MovieDto> responseEntity = restTemplate.exchange(uri , HttpMethod.GET ,request,MovieDto.class);

        MovieDto movie = responseEntity.getBody();
        if(movie == null){
            throw new MovieNotFoundException("movie not found");
        }

        return movie;
    }






}
