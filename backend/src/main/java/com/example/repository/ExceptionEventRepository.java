package com.example.repository;

import com.example.entity.ExceptionEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExceptionEventRepository extends JpaRepository<ExceptionEvent, Long> {

    // ✅ Filter by status (OPEN, IN_PROGRESS, RESOLVED)
    List<ExceptionEvent> findByStatusIgnoreCase(String status);

    // ✅ Filter by severity (LOW, MEDIUM, HIGH)
    List<ExceptionEvent> findBySeverityIgnoreCase(String severity);

}