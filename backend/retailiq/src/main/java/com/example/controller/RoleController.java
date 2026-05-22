package com.example.controller;

import com.example.entity.Role;
import com.example.service.RoleService;

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
@RequestMapping("/role")
@Tag(name = "Role Controller")
public class RoleController {

    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Role add(@RequestBody Role role) {
        return service.save(role);
    }

    @GetMapping("/find/{id}")
    public Role get(@PathVariable Long id) {
        return service.getById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Role deleted successfully";
    }

    @GetMapping("/fetchAllPaginated")
    public Page<Role> getAll(
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
