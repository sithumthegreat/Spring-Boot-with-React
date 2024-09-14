package com.ijse.hello.service;

import org.springframework.stereotype.Service;

import com.ijse.hello.entity.User;
@Service
public interface UserService {
    User createUser(User user);

}
