package com.pigeon.pigeon_chat.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
}