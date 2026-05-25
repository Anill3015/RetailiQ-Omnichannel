package com.example.service;

import com.example.entity.Role;
import com.example.entity.User;
import com.example.repository.RoleRepository;
import com.example.repository.UserRepository;
import com.example.repository.AuditLogRepository;
import com.example.exception.ListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository repository;
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    public RoleService(RoleRepository repository,
                       UserRepository userRepository,
                       AuditLogRepository auditLogRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.auditLogRepository = auditLogRepository;
    }

    public Role save(Role role) {
        return repository.save(role);
    }

    public Role getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Role not found with id: " + id));
    }

    @Transactional
    public void delete(Long id) {
        Role role = getById(id);

        // ✅ Step 1 — delete audit logs for all users with this role
        List<User> users = userRepository.findByRole(role);
        for (User user : users) {
            auditLogRepository.deleteByUser(user);
            user.setRole(null);
            userRepository.save(user);
        }

        // ✅ Step 2 — delete the role
        repository.delete(role);
    }

    public List<Role> getAllRoles() {
        List<Role> roles = repository.findAll();
        if (roles.isEmpty()) {
            throw new ListEmptyException("Role list is empty");
        }
        return roles;
    }

    public Page<Role> getAll(Pageable pageable) {
        Page<Role> page = repository.findAll(pageable);
        if (page.isEmpty()) {
            throw new ListEmptyException("Role list is empty");
        }
        return page;
    }
}