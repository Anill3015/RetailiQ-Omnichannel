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


		@PutMapping("/updateExceptionEvent/{id}")
		public ResponseEntity<ExceptionEventResponseDTO> updateExceptionEvent(
		    @PathVariable("id") Long id,
		    @RequestBody ExceptionEventDTO dto){


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


    @GetMapping("/findExceptionEvent/{id}")
    public ResponseEntity<?> findExceptionEvent(@PathVariable("id") Long id){

        ExceptionEvent event = service.getById(id);

        if (event != null) {

            ExceptionEventResponseDTO res = new ExceptionEventResponseDTO();
            res.setExceptionEvent(event);
            res.setStatusCode(200);
            res.setMessage("ExceptionEvent found");

            return ResponseEntity.ok(res);

        } else {

            return ResponseEntity.status(404)
                    .body("ExceptionEvent not found with id: " + id);
        }
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
