package com.example.backend.service;

import com.example.backend.dto.UserDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    HttpEntity<?> saveUser(UserDto dto);
    ResponseEntity<?> getUser(String username, String password);
    String refreshToken(String refreshToken);
}
