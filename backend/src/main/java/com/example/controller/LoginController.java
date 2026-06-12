package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import com.example.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/loginapi")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {

        try {
            // ✅ 1. Find user
            User user = userService.findByUsername(loginRequest.getUsername());

            // ✅ 2. Check status
            if ("PENDING".equalsIgnoreCase(user.getStatus())) {
                return ResponseEntity.status(403)
                        .body("Your account is not approved yet");
            }

            if ("REJECTED".equalsIgnoreCase(user.getStatus())) {
                return ResponseEntity.status(403)
                        .body("Your account has been rejected");
            }

            // ✅ 3. Check password
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(401)
                        .body("Invalid username or password");
            }

            // ✅ 4. Get role
            String roleName = (user.getRole() != null)
                    ? user.getRole().getName()
                    : "USER";

            // ✅ 5. Generate JWT
            String token = jwtUtil.generateToken(user.getUsername(), roleName);

            // ✅ 6. Response
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", roleName);
            response.put("username", user.getUsername());

            return ResponseEntity.ok(response);

        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(ex.getMessage());
        }
    }
}
