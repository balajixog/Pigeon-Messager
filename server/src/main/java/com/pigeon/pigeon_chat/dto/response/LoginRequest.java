package com.pigeon.pigeon_chat.dto.response;

import lombok.Data;

@Data
public class LoginRequest {

    private String email;
    private String password;
}