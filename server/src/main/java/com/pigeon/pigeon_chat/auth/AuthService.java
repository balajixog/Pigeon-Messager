package com.pigeon.pigeon_chat.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pigeon.pigeon_chat.util.JwtUtil;
import com.pigeon.pigeon_chat.dto.request.SignupRequest;
import com.pigeon.pigeon_chat.dto.response.LoginRequest;
import com.pigeon.pigeon_chat.entity.User;
import com.pigeon.pigeon_chat.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    public String signup(
            SignupRequest request
    ) {

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        User user = new User();

        user.setUsername(
                request.getUsername()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        userRepository.save(user);

        return "User registered";
    }

    public String login(
            LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!matches) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        return jwtUtil.generateToken(
                user.getEmail(),
                user.getRole()
        );
    }
}