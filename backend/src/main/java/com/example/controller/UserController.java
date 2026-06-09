package com.example.controller;

import com.example.dto.UpdateUserRequest;
import com.example.entity.User;
import com.example.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller")
@CrossOrigin(origins = "http://localhost:3000")
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
    public User update(@RequestBody UpdateUserRequest request) {
        return service.update(
                request.getUserId(),
                request.getRoleId(),
                request.getName(),
                request.getEmail(),
                request.getPhone()
        );
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

    @GetMapping("/fetchAll")
    @Operation(summary = "Fetch All Users")
    public List<User> fetchAll() {
        return service.getAllUsers();
    }

    @GetMapping("/fetchAllPaginated")
    @Operation(summary = "Fetch Users with Pagination")
    public Page<User> getAll(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        return service.getAll(
                PageRequest.of(pgno, size,
                        asc ? Sort.by(sorting).ascending()
                                : Sort.by(sorting).descending()));
    }

    @PutMapping("/approve/{id}")
    @Operation(summary = "Approve User")
    public String approve(@PathVariable Long id) {
        service.approveUser(id);
        return "User approved successfully";
    }

    @PutMapping("/reject/{id}")
    @Operation(summary = "Reject User")
    public String reject(@PathVariable Long id) {
        service.rejectUser(id);
        return "User rejected successfully";
    }

    @GetMapping("/pending")
    @Operation(summary = "Get Pending Users")
    public List<User> getPending() {
        return service.getPendingUsers();
    }
}