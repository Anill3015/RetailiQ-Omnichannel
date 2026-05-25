package com.example.service;

import com.example.entity.User;
import com.example.entity.Role;
import com.example.entity.AuditLog;
import com.example.repository.UserRepository;
import com.example.repository.RoleRepository;
import com.example.repository.AuditLogRepository;
import com.example.exception.UserNotFoundException;
import com.example.exception.ListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final AuditLogRepository auditLogRepository;

    public UserService(UserRepository repository,
                       RoleRepository roleRepository,
                       AuditLogRepository auditLogRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.auditLogRepository = auditLogRepository;
    }

    // ✅ Used for CREATE only
    @Transactional
    public User save(User user) {
        if (user.getRole() != null && user.getRole().getName() != null) {
            Role managedRole = roleRepository.findByName(user.getRole().getName())
                    .orElseThrow(() ->
                            new RuntimeException("Role not found: " + user.getRole().getName()));
            user.setRole(managedRole);
        }
        User saved = repository.save(user);
        logAction("USER_CREATED", saved);
        return saved;
    }

    // ✅ Used for UPDATE only — fetches existing user and updates fields
    @Transactional
    public User update(Long userId, Long roleId, String name, String email, String phone) {
        // Get existing managed user from DB
        User existingUser = getById(userId);

        // Get managed role from DB by ID
        Role managedRole = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new RuntimeException("Role not found with id: " + roleId));

        // Update fields on managed entity
        existingUser.setName(name);
        existingUser.setEmail(email);
        existingUser.setPhone(phone);
        existingUser.setRole(managedRole);

        // No need to call save() — managed entity auto-persists on transaction commit
        logAction("USER_UPDATED", existingUser);
        return existingUser;
    }

    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with id " + id));
    }

    @Transactional
    public void delete(Long id) {
        User user = getById(id);
        auditLogRepository.deleteByUser(user);
        repository.delete(user);
    }

    public List<User> getAllUsers() {
        List<User> users = repository.findAll();
        if (users.isEmpty()) {
            throw new ListEmptyException("User list is empty");
        }
        return users;
    }

    public Page<User> getAll(Pageable pageable) {
        Page<User> page = repository.findAll(pageable);
        if (page.isEmpty()) {
            throw new ListEmptyException("User list is empty");
        }
        return page;
    }

    private void logAction(String action, User user) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        log.setUser(user);
        auditLogRepository.save(log);
    }
}