package com.ijse.hello.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ijse.hello.service.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter{
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    //@Qualifier("userDetailsServiceImpl")
    private UserDetailsServiceImpl userDetailsService;

    private String extractTokenFromRequest(HttpServletRequest request){
        System.out.println("hiii");
        String authHeader=request.getHeader("Authorization");
        if(authHeader!=null && authHeader.startsWith("Bearer ")){//
            return authHeader.replace("Bearer ", "");//
        }else{
            return null;
        }

    }
    //checks whether the user is authrised to access or not
    //validate token
    @Override
    protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{//import from java.io(IOE Exception)
        
        String jwt=extractTokenFromRequest(request);
        try {
            if (jwt!=null && jwtUtils.valideJwt(jwt)){
                String username=jwtUtils.getUsernameFromJwt(jwt);
                UserDetails userDetails= userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken =new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                authenticationToken.setDetails(new WebAuthenticationDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } 
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
        filterChain.doFilter(request, response);

    }
    
}
