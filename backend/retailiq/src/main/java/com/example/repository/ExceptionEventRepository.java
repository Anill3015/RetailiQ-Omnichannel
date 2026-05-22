package com.example.repository;

import com.example.entity.ExceptionEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExceptionEventRepository
        extends JpaRepository<ExceptionEvent, Long> {
}
