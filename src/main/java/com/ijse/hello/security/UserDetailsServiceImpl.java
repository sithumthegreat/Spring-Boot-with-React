package com.ijse.hello.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Repository;


import com.ijse.hello.entity.User;
import com.ijse.hello.repository.UserRepository;
@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;
    //to fetch userdetails
    @Override
    public UserDetails loadUserByUsername(String userName){
        User user = userRepository.findByUsername(userName).orElse(null);
        if (user==null){
            throw new UsernameNotFoundException("User is not found");
        }else{
            return org.springframework.security.core.userdetails.User.builder()
                        .username(user.getUsername())
                        .password(user.getPassword())
                        .build();
        }

    }
    
}
