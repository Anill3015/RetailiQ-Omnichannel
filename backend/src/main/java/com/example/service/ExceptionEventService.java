package com.example.service;

import com.example.entity.ExceptionEvent;
import com.example.repository.ExceptionEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExceptionEventService {

    @Autowired
    private ExceptionEventRepository exceptionEventRepository;

    public ExceptionEvent save(ExceptionEvent event) {

        if (event.getType() == null || event.getType().trim().isEmpty()) {
            throw new RuntimeException("Type is required");
        }

        List<String> validSeverity = List.of("LOW", "MEDIUM", "HIGH");
        if (event.getSeverity() == null || !validSeverity.contains(event.getSeverity())) {
            throw new RuntimeException("Invalid severity (LOW, MEDIUM, HIGH)");
        }

        event.setDetectedDate(LocalDate.now());
        event.setStatus("OPEN");

        return exceptionEventRepository.save(event);
    }

    public ExceptionEvent update(ExceptionEvent event) {

        ExceptionEvent existing = exceptionEventRepository.findById(event.getExceptionId())
                .orElseThrow(() -> new RuntimeException("Exception Event not found"));

        if ("RESOLVED".equalsIgnoreCase(existing.getStatus())) {
            throw new RuntimeException("Resolved event cannot be modified");
        }

        List<String> validStatus = List.of("OPEN", "IN_PROGRESS", "RESOLVED");
        if (event.getStatus() == null || !validStatus.contains(event.getStatus())) {
            throw new RuntimeException("Invalid status");
        }

        existing.setType(event.getType());
        existing.setReferenceId(event.getReferenceId());
        existing.setSeverity(event.getSeverity());
        existing.setStatus(event.getStatus());

        return exceptionEventRepository.save(existing);
    }

    public List<ExceptionEvent> getByStatus(String status) {
        return exceptionEventRepository.findByStatusIgnoreCase(status);
    }

    public List<ExceptionEvent> getBySeverity(String severity) {
        return exceptionEventRepository.findBySeverityIgnoreCase(severity);
    }

    public ExceptionEvent getById(Long id) {
        return exceptionEventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ExceptionEvent not found"));
    }

    public List<ExceptionEvent> getAll() {
        return exceptionEventRepository.findAll();
    }

    public void delete(Long id) {

        if (!exceptionEventRepository.existsById(id)) {
            throw new RuntimeException("ExceptionEvent not found with id " + id);
        }

        exceptionEventRepository.deleteById(id);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createException(String type, String referenceId, String severity) {

        if (type == null || type.trim().isEmpty()) {
            throw new RuntimeException("Exception type is required");
        }

        if (referenceId == null || referenceId.trim().isEmpty()) {
            throw new RuntimeException("Reference ID is required");
        }

        List<String> validSeverity = List.of("LOW", "MEDIUM", "HIGH");
        if (severity == null || !validSeverity.contains(severity)) {
            throw new RuntimeException("Invalid severity (LOW, MEDIUM, HIGH)");
        }

        ExceptionEvent event = new ExceptionEvent();
        event.setType(type);
        event.setReferenceId(referenceId);
        event.setSeverity(severity);
        event.setStatus("OPEN");
        event.setDetectedDate(LocalDate.now());

        exceptionEventRepository.save(event);
    }
}