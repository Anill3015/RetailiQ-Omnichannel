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

    @Transactional
    public User save(User user) {
        boolean isNew = (user.getUserId() == null);

        if (user.getRole() != null) {
            Role managedRole = null;

            if (user.getRole().getRoleId() != null) {
                managedRole = roleRepository.findById(user.getRole().getRoleId())
                        .orElseThrow(() ->
                                new RuntimeException("Role not found with id: "
                                        + user.getRole().getRoleId()));
            } else if (user.getRole().getName() != null
                    && !user.getRole().getName().isEmpty()) {
                managedRole = roleRepository.findByName(user.getRole().getName())
                        .orElseThrow(() ->
                                new RuntimeException("Role not found: "
                                        + user.getRole().getName()));
            }

            if (managedRole != null) {
                user.setRole(managedRole);
            }
        }

        // ✅ Set default status if not set
        if (user.getStatus() == null) {
            user.setStatus("APPROVED");
        }

        User saved = repository.save(user);
        String action = isNew ? "USER_CREATED" : "USER_UPDATED";
        logAction(action, saved);
        return saved;
    }

    @Transactional
    public User update(Long userId, Long roleId, String name,
                       String email, String phone) {
        User existingUser = getById(userId);

        Role managedRole = roleRepository.findById(roleId)
                .orElseThrow(() ->
                        new RuntimeException("Role not found with id: " + roleId));

        existingUser.setName(name);
        existingUser.setEmail(email);
        existingUser.setPhone(phone);
        existingUser.setRole(managedRole);

        logAction("USER_UPDATED", existingUser);
        return existingUser;
    }

    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with id " + id));
    }

    public User findByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
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

    @Transactional
    public User register(User user) {

        // ✅ Check duplicate username
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // ✅ Check duplicate email
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // ✅ Resolve role by name
        if (user.getRole() != null && user.getRole().getName() != null) {
            Role role = roleRepository.findByName(user.getRole().getName())
                    .orElseThrow(() ->
                            new RuntimeException("Role not found: "
                                    + user.getRole().getName()));

            // ✅ Block admin self-register
            if ("ADMIN".equalsIgnoreCase(role.getName())) {
                throw new RuntimeException("You cannot register as ADMIN");
            }

            user.setRole(role);
        }

        // ✅ Set status to PENDING for new registrations
        user.setStatus("PENDING");

        User saved = repository.save(user);
        logAction("USER_REGISTERED", saved);
        return saved;
    }

    public List<User> getPendingUsers() {
        return repository.findByStatus("PENDING");
    }

    @Transactional
    public void approveUser(Long id) {
        User user = getById(id);
        user.setStatus("APPROVED");
        logAction("USER_APPROVED", user);
    }

    @Transactional
    public void rejectUser(Long id) {
        User user = getById(id);
        user.setStatus("REJECTED");
        logAction("USER_REJECTED", user);
    }

    private void logAction(String action, User user) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        log.setUser(user);
        auditLogRepository.save(log);
    }
}