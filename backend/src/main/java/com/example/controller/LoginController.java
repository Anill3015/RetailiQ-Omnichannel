package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import com.example.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/loginapi")
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User loginRequest) {
        // ✅ Find user by username
        User user = userService.findByUsername(loginRequest.getUsername());
<<<<<<< HEAD

        // ✅ Check password
=======
        

		if (!"APPROVED".equalsIgnoreCase(user.getStatus())) {
		    throw new RuntimeException("Your account is not approved yet");
		}


>>>>>>> Rakesh
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

<<<<<<< HEAD
        // ✅ Get role name from Role entity
        String roleName = user.getRole() != null ? user.getRole().getName() : "USER";

        // ✅ Generate token
=======
        String roleName = user.getRole() != null ? user.getRole().getName() : "USER";

>>>>>>> Rakesh
        String token = jwtUtil.generateToken(user.getUsername(), roleName);

        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("role", roleName);
        response.put("username", user.getUsername());
        return response;
    }
}