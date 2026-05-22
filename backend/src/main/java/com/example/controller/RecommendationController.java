package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.RecommendationDTO;
import com.example.dto.RecommendationResponseDTO;
import com.example.entity.Recommendation;
import com.example.service.RecommendationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/recommendation")
@Tag(name = "Recommendation", description = "Personalized recommendation APIs")
public class RecommendationController {

    @Autowired
    private RecommendationService service;

    @Operation(summary = "Add recommendation")
    @PostMapping("/add")
    public ResponseEntity<RecommendationResponseDTO> add(
            @RequestBody RecommendationDTO recommendationDTO) {

        Recommendation rec = service.addRecommendation(
                recommendationDTO.getRecommendation());

        RecommendationResponseDTO response = new RecommendationResponseDTO();
        response.setRecommendation(rec);
        response.setStatusCode(201);
        response.setMessage("Recommendation added successfully");

        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Update recommendation")
    @PutMapping("/update")
    public ResponseEntity<RecommendationResponseDTO> update(
            @RequestBody RecommendationDTO recommendationDTO) {

        Recommendation rec = service.updateRecommendation(
                recommendationDTO.getRecommendation());

        RecommendationResponseDTO response = new RecommendationResponseDTO();
        response.setRecommendation(rec);
        response.setStatusCode(200);
        response.setMessage("Recommendation updated successfully");

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Get recommendations by customer")
    @GetMapping("/customer/{customerId}")
    public List<Recommendation> getByCustomer(
            @PathVariable Long customerId) {
        return service.findRecommendationsByCustomerId(customerId);
    }

    @Operation(summary = "Fetch all recommendations with pagination")
    @GetMapping("/fetchAllPaginated")
    public Page<Recommendation> fetchAll(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        Sort sort = asc ? Sort.by(sorting).ascending()
                        : Sort.by(sorting).descending();

        Pageable pageable = PageRequest.of(pgno, size, sort);
        return service.getAllRecommendationsWithPagination(pageable);
    }
}