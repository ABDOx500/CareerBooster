package com.ESI.CareerBooster.auth.controller;

import com.ESI.CareerBooster.auth.dto.AuthResponse;
import com.ESI.CareerBooster.auth.dto.LoginRequest;
import com.ESI.CareerBooster.auth.dto.RegisterRequest;
import com.ESI.CareerBooster.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        // Registration logic (stub)
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Login logic (stub)
        return ResponseEntity.ok(authService.login(request));
    }
} 