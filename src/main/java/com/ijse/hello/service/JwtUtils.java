package com.ijse.hello.service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    @Value("${app.secret}")
    private String secret;

    private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));//key for signing, generzting key with secret
    }

    public String generateJwtToken(Authentication authentication){//from security.core
        UserDetails user=(UserDetails) authentication.getPrincipal();
        //generate jwt token
        return Jwts.builder()
            .setSubject(user.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime()+1000*60*60*24))
            .signWith(key(),SignatureAlgorithm.HS256)
            .compact();

    }

    public boolean valideJwt(String token){
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return false;
        }
    }

    public String getUsernameFromJwt(String token){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
            
        

    }
}
