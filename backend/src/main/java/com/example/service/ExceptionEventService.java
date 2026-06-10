package com.example.service;

import com.example.entity.ExceptionEvent;
import com.example.repository.ExceptionEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExceptionEventService {

    @Autowired
    private ExceptionEventRepository exceptionEventRepository;

    // ✅ CREATE (Manual)
    public ExceptionEvent save(ExceptionEvent event) {

        if (event.getType() == null || event.getType().isEmpty()) {
            throw new RuntimeException("Type is required");
        }

        List<String> validSeverity = List.of("LOW", "MEDIUM", "HIGH");
        if (!validSeverity.contains(event.getSeverity())) {
            throw new RuntimeException("Invalid severity (LOW, MEDIUM, HIGH)");
        }

        event.setDetectedDate(LocalDate.now());
        event.setStatus("OPEN");

        return exceptionEventRepository.save(event);
    }

    // ✅ UPDATE WITH STATUS FLOW
    public ExceptionEvent update(ExceptionEvent event) {

        ExceptionEvent existing = exceptionEventRepository.findById(event.getExceptionId())
                .orElseThrow(() -> new RuntimeException("Exception Event not found"));

        if ("RESOLVED".equalsIgnoreCase(existing.getStatus())) {
            throw new RuntimeException("Resolved event cannot be modified");
        }

        List<String> validStatus = List.of("OPEN", "IN_PROGRESS", "RESOLVED");
        if (!validStatus.contains(event.getStatus())) {
            throw new RuntimeException("Invalid status");
        }

        existing.setType(event.getType());
        existing.setReferenceId(event.getReferenceId());
        existing.setSeverity(event.getSeverity());
        existing.setStatus(event.getStatus());

        return exceptionEventRepository.save(existing);
    }

    // ✅ FILTER BY STATUS
    public List<ExceptionEvent> getByStatus(String status) {
        return exceptionEventRepository.findByStatus(status);
    }

    // ✅ FILTER BY SEVERITY
    public List<ExceptionEvent> getBySeverity(String severity) {
        return exceptionEventRepository.findBySeverity(severity);
    }

    // ✅ GET BY ID
    public ExceptionEvent getById(Long id) {
        return exceptionEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ExceptionEvent not found"));
    }

    // ✅ GET ALL (FIXED ❗ DO NOT THROW ERROR ON EMPTY)
    public List<ExceptionEvent> getAll() {
        return exceptionEventRepository.findAll();
    }

    // ✅ PAGINATION
    public Page<ExceptionEvent> getExceptionEventsWithPagination(Pageable pageable) {
        return exceptionEventRepository.findAll(pageable);
    }

    // ✅ DELETE
    public void delete(Long id) {

        if (!exceptionEventRepository.existsById(id)) {
            throw new RuntimeException("ExceptionEvent not found with id " + id);
        }

        exceptionEventRepository.deleteById(id);
    }

    // 🔥 ✅ AUTO EXCEPTION CREATION (CRITICAL FIX)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createException(String type, String referenceId, String severity) {

        try {
            ExceptionEvent event = new ExceptionEvent();

            event.setType(type);
            event.setReferenceId(referenceId);
            event.setSeverity(severity);
            event.setStatus("OPEN");
            event.setDetectedDate(LocalDate.now());

            exceptionEventRepository.save(event);

            System.out.println("✅ Exception created: " + type);

        } catch (Exception e) {
            System.out.println("❌ Failed to save exception: " + e.getMessage());
        }
    }
}
