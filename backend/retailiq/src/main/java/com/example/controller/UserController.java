package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;

import com.example.entity.AuditLog;
import com.example.service.AuditLogService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @Operation(summary = "Add User")
    public User add(@RequestBody User user) {
        return service.save(user);
    }

    @PutMapping("/update")
    @Operation(summary = "Update User")
    public User update(@RequestBody User user) {
        return service.save(user);
    }

    @GetMapping("/find/{id}")
    @Operation(summary = "Get User by ID")
    public User get(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete User")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "User deleted successfully";
    }

    @GetMapping("/fetchAllPaginated")
    @Operation(summary = "Fetch Users with Pagination")
    public Page<User> getAll(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        Pageable pageable = PageRequest.of(
                pgno, size,
                asc ? Sort.by(sorting).ascending()
                    : Sort.by(sorting).descending());

        return service.getAll(pageable);
    }
}