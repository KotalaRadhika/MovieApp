package com.movie.app.authentication.AuthenticationService.utils;

import com.movie.app.authentication.AuthenticationService.domain.UserDetails;
import com.movie.app.authentication.AuthenticationService.exception.UserNotFoundException;
import com.movie.app.authentication.AuthenticationService.service.LoginService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtTokenGeneratorImpl implements JWtTokenGenerator {

    @Autowired
    private LoginService loginService;

    @Value("${jwt.secret}")
    private String secret;

    Map<String, String> jwtTokenMap;
    @Override
    public Map<String, String> generateToken(UserDetails user) throws UserNotFoundException {

        try {
            String jwtToken = "";
            /*
             * Generate JWT token and store in String jwtToken
             */
            jwtToken = Jwts.builder()
                    .setSubject(user.getUsername())
                    .claim("userName", user.getUsername())
                    .setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                    .signWith(SignatureAlgorithm.HS512, "secret")
                    .compact();
            jwtTokenMap = new HashMap<>();
            jwtTokenMap.put("token", jwtToken);
            jwtTokenMap.put("message", "Login Successful");
            return jwtTokenMap;
        } catch (Exception e) {
            jwtTokenMap.put("message", e.getMessage());
            jwtTokenMap.put("token", null);
            return  jwtTokenMap;
        }
    }


    //This method validates token
    //@param String token
    //@return Boolean
    public Boolean validateToken(String token) {

        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public String getUserName(String token){
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        String username = claims.get("userName", String.class);
        return username;

    }

}
