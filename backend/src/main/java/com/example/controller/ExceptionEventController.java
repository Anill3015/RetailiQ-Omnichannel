package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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

    @PostMapping("/updateExceptionEvent")
    public ResponseEntity<ExceptionEventResponseDTO> updateExceptionEvent(
            @RequestBody ExceptionEventDTO dto) {

        ExceptionEvent e = service.update(dto.getExceptionEvent());

        ExceptionEventResponseDTO res = new ExceptionEventResponseDTO();
        res.setExceptionEvent(e);
        res.setStatusCode(201);
        res.setMessage("ExceptionEvent updated successfully");

        return ResponseEntity.status(201).body(res);
    }

    @DeleteMapping("/deleteExceptionEvent")
    public String deleteExceptionEvent(@RequestBody ExceptionEvent event) {
        service.delete(event.getExceptionId());
        return "ExceptionEvent deleted successfully";
    }

    @GetMapping("/findExceptionEvent/{id}")
    public ExceptionEvent findExceptionEvent(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/fetchAllExceptionEvents")
    public List<ExceptionEvent> fetchAllExceptionEvents() {
        return service.getAll();
    }
    
    @GetMapping("/fetchAllExceptionEventsPaginated")
    public Page<ExceptionEvent> fetchAllExceptionEventsPaginated(
            @RequestParam(name = "pgno") int pgno,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "sorting") String sorting,
            @RequestParam(name = "asc") boolean asc) {
        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();
        Pageable pageable = PageRequest.of(pgno, size, sort);
        return this.service.getExceptionEventsWithPagination(pageable);
    }
    
}
