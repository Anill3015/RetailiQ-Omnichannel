package com.example.repository;

import com.example.entity.User;
import com.example.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByRole(Role role);
    Optional<User> findByUsername(String username);
    List<User> findByStatus(String status);
    Optional<User> findByEmail(String email);
}