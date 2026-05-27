package com.example.repository;

import com.example.entity.AuditLog;
import com.example.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    @Transactional
    void deleteByUser(User user);
}