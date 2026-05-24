package com.pigeon.pigeon_chat.user.controller;

import java.util.List;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.pigeon.pigeon_chat.user.dto.UserResponse;
import com.pigeon.pigeon_chat.user.entity.User;

import com.pigeon.pigeon_chat.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController

@RequestMapping("/user")

@RequiredArgsConstructor

public class UserController {

    private final UserRepository
            userRepository;

    @GetMapping("/me")
public UserResponse currentUser(Authentication authentication) {
    User user = userRepository
            .findByUsername(authentication.getName())
            .orElseThrow();

    return new UserResponse(
            user.getUsername(),
            user.getEmail(),
            user.getRole(),
            user.isOnline()
    );
}
@GetMapping
public List<UserResponse> getAllUsers() {
    return userRepository.findAll()
            .stream()
            .map(u -> new UserResponse(u.getUsername(), u.getEmail(), u.getRole(), u.isOnline()))
            .toList();
}
}