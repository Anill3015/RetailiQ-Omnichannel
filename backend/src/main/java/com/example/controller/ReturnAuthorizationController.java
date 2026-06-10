package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.example.dto.ReturnAuthorizationDTO;
import com.example.dto.ReturnAuthorizationResponseDTO;
import com.example.entity.ReturnAuthorization;
import com.example.service.ReturnAuthorizationService;

@RestController
@RequestMapping("/api")
public class ReturnAuthorizationController {

    @Autowired
    private ReturnAuthorizationService service;

    @PostMapping("/addReturnAuthorization")
    public ResponseEntity<ReturnAuthorizationResponseDTO> addReturnAuthorization(
            @RequestBody ReturnAuthorizationDTO dto) {

        ReturnAuthorization r = service.save(dto.getReturnAuthorization());

        ReturnAuthorizationResponseDTO res = new ReturnAuthorizationResponseDTO();
        res.setReturnAuthorization(r);
        res.setStatusCode(201);
        res.setMessage("Return Authorization added successfully");

        return ResponseEntity.status(201).body(res);
    }

    @PutMapping("/updateReturnAuthorization/{id}")
    public ResponseEntity<ReturnAuthorizationResponseDTO> updateReturnAuthorization(
            @PathVariable("id") Long id,
            @RequestBody ReturnAuthorizationDTO dto) {

        ReturnAuthorization r = dto.getReturnAuthorization();

        r.setRmaId(id);

        ReturnAuthorization updated = service.update(r);

        ReturnAuthorizationResponseDTO res = new ReturnAuthorizationResponseDTO();
        res.setReturnAuthorization(updated);
        res.setStatusCode(200);   
        res.setMessage("Return Authorization updated successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/deleteReturnAuthorization/{id}")
    public ResponseEntity<String> deleteReturnAuthorization(@PathVariable("id") Long id) {

        service.delete(id);

        return ResponseEntity.ok("Return Authorization deleted successfully");
    }

    @GetMapping("/findReturnAuthorization/{id}")
    public ResponseEntity<?> findReturnAuthorization(@PathVariable("id") Long id) {

        ReturnAuthorization rma = service.getById(id);

        if (rma != null) {

            ReturnAuthorizationResponseDTO res = new ReturnAuthorizationResponseDTO();
            res.setReturnAuthorization(rma);
            res.setStatusCode(200);
            res.setMessage("Return Authorization found");

            return ResponseEntity.ok(res);

        } else {
            return ResponseEntity.status(404)
                    .body("Return Authorization not found with id: " + id);
        }
    }

    @GetMapping("/fetchAllReturnAuthorizations")
    public List<ReturnAuthorization> fetchAllReturnAuthorizations() {
        return service.getAll();
    }

    @GetMapping("/fetchAllReturnAuthorizationsPaginated")
    public Page<ReturnAuthorization> fetchAllReturnAuthorizationsPaginated(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();

        Pageable pageable = PageRequest.of(pgno, size, sort);

        return service.getReturnAuthorizationsWithPagination(pageable);
    }
    
    @PutMapping("/approveReturn/{id}")
    public ReturnAuthorization approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PutMapping("/rejectReturn/{id}")
    public ReturnAuthorization reject(@PathVariable Long id) {
        return service.reject(id);
    }

    @PutMapping("/completeReturn/{id}")
    public ReturnAuthorization complete(@PathVariable Long id) {
        return service.complete(id);
    }
}