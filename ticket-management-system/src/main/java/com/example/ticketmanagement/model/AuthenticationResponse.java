package com.example.ticketmanagement.model;

import lombok.Getter;

@Getter
public class AuthenticationResponse {
    private final String token;
    private final String role;

    public AuthenticationResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }
}
