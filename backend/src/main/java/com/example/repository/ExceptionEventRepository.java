package com.example.repository;

import com.example.entity.ExceptionEvent;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExceptionEventRepository
        extends JpaRepository<ExceptionEvent, Long> {

	List<ExceptionEvent> findByStatus(String status);

    List<ExceptionEvent> findBySeverity(String severity);

}
