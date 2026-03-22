package com.studentrisk.controller;

import com.studentrisk.dto.LoginRequest;
import com.studentrisk.dto.LoginResponse;
import com.studentrisk.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Auth", description = "User authentication")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticate with username and password. Returns user id, role, name, and department.")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        if (response != null) return ResponseEntity.ok(response);
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
