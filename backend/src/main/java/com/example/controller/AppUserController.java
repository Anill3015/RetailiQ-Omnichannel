package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/appuserapi")
public class AppUserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/add")
    public User register(@RequestBody User user) {
        // ✅ Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.register(user);
    }
}