package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.ExceptionEventDTO;
import com.example.dto.ExceptionEventResponseDTO;
import com.example.entity.ExceptionEvent;
import com.example.service.ExceptionEventService;

@RestController
@RequestMapping("/api")
public class ExceptionEventController {

    @Autowired
    private ExceptionEventService service;

    @PostMapping("/addExceptionEvent")
    public ResponseEntity<ExceptionEventResponseDTO> addExceptionEvent(
            @RequestBody ExceptionEventDTO dto) {

        ExceptionEvent e = service.save(dto.getExceptionEvent());

        ExceptionEventResponseDTO res = new ExceptionEventResponseDTO();
        res.setExceptionEvent(e);
        res.setStatusCode(201);
        res.setMessage("ExceptionEvent added successfully");

        return ResponseEntity.status(201).body(res);
    }

    @PutMapping("/updateExceptionEvent/{id}")
    public ResponseEntity<ExceptionEventResponseDTO> updateExceptionEvent(
            @PathVariable("id") Long id,
            @RequestBody ExceptionEventDTO dto) {

        ExceptionEvent event = dto.getExceptionEvent();
        event.setExceptionId(id);

        ExceptionEvent updated = service.update(event);

        ExceptionEventResponseDTO res = new ExceptionEventResponseDTO();
        res.setExceptionEvent(updated);
        res.setStatusCode(200);
        res.setMessage("ExceptionEvent updated successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/deleteExceptionEvent/{id}")
    public String delete(@PathVariable("id") Long id) {
        service.delete(id);
        return "Deleted successfully";
    }

    @GetMapping("/filterByStatus")
    public List<ExceptionEvent> filterByStatus(@RequestParam String status) {
        return service.getByStatus(status);
    }

    @GetMapping("/filterBySeverity")
    public List<ExceptionEvent> filterBySeverity(@RequestParam String severity) {
        return service.getBySeverity(severity);
    }

    @GetMapping("/findExceptionEvent/{id}")
    public ResponseEntity<?> findExceptionEvent(@PathVariable("id") Long id) {

        ExceptionEvent event = service.getById(id);

        ExceptionEventResponseDTO res = new ExceptionEventResponseDTO();
        res.setExceptionEvent(event);
        res.setStatusCode(200);
        res.setMessage("ExceptionEvent found");

        return ResponseEntity.ok(res);
    }

    @GetMapping("/fetchAllExceptionEvents")
    public List<ExceptionEvent> fetchAllExceptionEvents() {
        return service.getAll();
    }
}