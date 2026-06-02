package com.example.controller;

import com.example.dto.UpdateUserRequest;
import com.example.entity.User;
import com.example.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name = "User Controller")
@CrossOrigin(origins="http://localhost:3000")
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

    // ✅ Now uses UpdateUserRequest DTO instead of User entity
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

        Pageable pageable = PageRequest.of(
                pgno, size,
                asc ? Sort.by(sorting).ascending()
                        : Sort.by(sorting).descending());

        return service.getAll(pageable);
    }
    
 // ✅ Get pending users
    @GetMapping("/pending")
    public List<User> getPendingUsers() {
        return service.getPendingUsers();
    }

    // ✅ Approve user
    @PutMapping("/approve/{id}")
    public String approveUser(@PathVariable Long id) {
        service.approveUser(id);
        return "User approved successfully";
    }

    // ✅ Reject user
    @PutMapping("/reject/{id}")
    public String rejectUser(@PathVariable Long id) {
        service.rejectUser(id);
        return "User rejected";
    }
    
}