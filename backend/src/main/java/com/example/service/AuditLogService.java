package com.example.service;

import com.example.entity.AuditLog;
import com.example.repository.AuditLogRepository;
import com.example.exception.AuditLogListEmptyException;
import com.example.exception.ListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository repository;

    public AuditLogService(AuditLogRepository repository) {
        this.repository = repository;
    }
    public List<AuditLog> getAllLogs() {
        List<AuditLog> logs = repository.findAll();
        if (logs.isEmpty()) {
            throw new ListEmptyException("Audit log list is empty");
        }
        return logs;
    }

    public Page<AuditLog> getAll(Pageable pageable) {
        Page<AuditLog> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}