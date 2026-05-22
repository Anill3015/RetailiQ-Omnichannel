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

    @PostMapping("/updateReturnAuthorization")
    public ResponseEntity<ReturnAuthorizationResponseDTO> updateReturnAuthorization(
            @RequestBody ReturnAuthorizationDTO dto) {

        ReturnAuthorization r = service.update(dto.getReturnAuthorization());

        ReturnAuthorizationResponseDTO res = new ReturnAuthorizationResponseDTO();
        res.setReturnAuthorization(r);
        res.setStatusCode(201);
        res.setMessage("Return Authorization updated successfully");

        return ResponseEntity.status(201).body(res);
    }

    @DeleteMapping("/deleteReturnAuthorization")
    public String deleteReturnAuthorization(@RequestBody ReturnAuthorization rma) {
        service.delete(rma.getRmaId());
        return "Return Authorization deleted successfully";
    }

    @GetMapping("/findReturnAuthorization/{id}")
    public ReturnAuthorization findReturnAuthorization(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/fetchAllReturnAuthorizations")
    public List<ReturnAuthorization> fetchAllReturnAuthorizations() {
        return service.getAll();
    }
    
    @GetMapping("/fetchAllReturnAuthorizationsPaginated")
    public Page<ReturnAuthorization> fetchAllReturnAuthorizationsPaginated(
            @RequestParam(name = "pgno") int pgno,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "sorting") String sorting,
            @RequestParam(name = "asc") boolean asc) {
        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();
        Pageable pageable = PageRequest.of(pgno, size, sort);
        return this.service.getReturnAuthorizationsWithPagination(pageable);
    }
}