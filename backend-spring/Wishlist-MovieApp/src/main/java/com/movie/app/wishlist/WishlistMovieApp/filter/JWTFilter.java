package com.movie.app.wishlist.WishlistMovieApp.filter;

import java.io.IOException;



import org.springframework.web.filter.GenericFilterBean;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JWTFilter extends GenericFilterBean{

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException
    {

        HttpServletRequest httpRequest = (HttpServletRequest) request;

        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String authHeader = httpRequest.getHeader("authorization");

        System.out.println("AuthHeader" +  authHeader);

        if(authHeader == null || !authHeader.startsWith("Bearer"))
        {
            throw new ServletException("Missing or Invalid Authentication Header");
        }

        String jwtToken = authHeader.substring(7);

        Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwtToken).getBody();
        httpRequest.setAttribute("username", claims);
        chain.doFilter(request, response);
    }
}