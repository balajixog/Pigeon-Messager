package com.pigeon.pigeon_chat.auth.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pigeon.pigeon_chat.auth.dto.LoginRequest;
import com.pigeon.pigeon_chat.auth.dto.SignupRequest;
import com.pigeon.pigeon_chat.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request ) {

        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        String token =authService.login(request);

        return ResponseEntity.ok( Map.of("token", token));
    }
    @PostMapping("/logout")
        public ResponseEntity<?> logout() {
        // JWT is stateless — logout is handled client-side by deleting the token
        return ResponseEntity.ok(Map.of("message", "Logged out"));
        }
}