package com.pigeon.pigeon_chat.user.dto;
public class UserResponse {
    private String username;
    private String email;
    private String role;
    private boolean online;

    public UserResponse(String username, String email, String role, boolean online) {
        this.username = username;
        this.email = email;
        this.role = role;
        this.online = online;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public boolean isOnline() { return online; }
}