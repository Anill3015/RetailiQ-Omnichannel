package com.example.service;

import com.example.entity.Role;
import com.example.repository.RoleRepository;
import com.example.exception.ListEmptyException;
import com.example.exception.RoleNotFoundException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class RoleService {

    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    // Save or Update Role
    public Role save(Role role) {
        return repository.save(role);
    }

    // Get Role by ID
    public Role getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RoleNotFoundException("Role not found with id " + id));
    }

    // Delete Role
    public void delete(Long id) {
        Role role = getById(id);
        repository.delete(role);
    }

    // Get all Roles with pagination
    public Page<Role> getAll(Pageable pageable) {
        Page<Role> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}