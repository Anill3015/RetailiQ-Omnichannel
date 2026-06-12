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

    // ✅ REGISTER USER
    @Transactional
    public User register(User user) {

        // ✅ Username check
        if (repository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // ✅ Email check
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // ✅ Resolve role by name
        if (user.getRole() != null && user.getRole().getName() != null) {
            Role role = roleRepository.findByName(user.getRole().getName())
                    .orElseThrow(() ->
                            new RuntimeException("Role not found: "
                                    + user.getRole().getName()));

            // ❌ Prevent admin self-registration
            if ("ADMIN".equalsIgnoreCase(role.getName())) {
                throw new RuntimeException("You cannot register as ADMIN");
            }

            user.setRole(role);
        }

        // ✅ IMPORTANT: Set default status
        user.setStatus("PENDING");

        User saved = repository.save(user);
        logAction("USER_REGISTERED", saved);
        return saved;
    }


    // ✅ SAVE (Admin create/update)
    @Transactional
    public User save(User user) {
        boolean isNew = (user.getUserId() == null);

        if (user.getRole() != null) {
            Role role = roleRepository.findById(user.getRole().getRoleId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            user.setRole(role);
        }

        User saved = repository.save(user);

        logAction(isNew ? "USER_CREATED" : "USER_UPDATED", saved);

        return saved;
    }


    // ✅ UPDATE USER
    @Transactional
    public User update(Long userId, Long roleId, String name, String email, String phone) {

        User existingUser = getById(userId);

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        existingUser.setName(name);
        existingUser.setEmail(email);
        existingUser.setPhone(phone);
        existingUser.setRole(role);

        logAction("USER_UPDATED", existingUser);

        return existingUser;
    }


    // ✅ FIND BY USERNAME
    public User findByUsername(String username) {
        return repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    // ✅ LOGIN VALIDATION METHOD (IMPORTANT ✅)
    public User validateLoginUser(String username) {
        User user = findByUsername(username);

        if ("PENDING".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Your account is not approved yet");
        }

        if ("REJECTED".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Your account has been rejected");
        }

        return user;
    }


    // ✅ APPROVE USER
    @Transactional
    public void approveUser(Long id) {
        User user = getById(id);
        user.setStatus("APPROVED");
        logAction("USER_APPROVED", user);
    }


    // ✅ REJECT USER
    @Transactional
    public void rejectUser(Long id) {
        User user = getById(id);
        user.setStatus("REJECTED");
        logAction("USER_REJECTED", user);
    }


    // ✅ GET PENDING USERS
    public List<User> getPendingUsers() {
        List<User> users = repository.findByStatus("PENDING");

        if (users.isEmpty()) {
            throw new ListEmptyException("No pending users found");
        }

        return users;
    }


    // ✅ GET USER BY ID
    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }


    // ✅ DELETE USER
    @Transactional
    public void delete(Long id) {
        User user = getById(id);
        auditLogRepository.deleteByUser(user);
        repository.delete(user);
    }


    // ✅ GET ALL USERS
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


    // ✅ AUDIT LOG
    private void logAction(String action, User user) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        log.setUser(user);
        auditLogRepository.save(log);
    }
}
