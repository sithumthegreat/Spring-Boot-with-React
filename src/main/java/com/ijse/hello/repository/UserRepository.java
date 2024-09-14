package com.ijse.hello.repository;

import org.springframework.stereotype.Repository;

import com.ijse.hello.entity.User;

import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
// @Primary//-----
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

}
