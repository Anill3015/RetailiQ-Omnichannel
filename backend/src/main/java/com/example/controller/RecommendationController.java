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

@CrossOrigin(origins = "http://localhost:3000")
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

    @Operation(summary = "Delete recommendation")
    @DeleteMapping("/delete/{id}")
    public String deleteRecommendation(@PathVariable Long id) {
        return service.deleteRecommendation(id);
    }

    @Operation(summary = "Find recommendation by ID")
    @GetMapping("/find/{id}")
    public Recommendation findById(@PathVariable Long id) {
        return service.findRecommendationById(id);
    }

    @Operation(summary = "Get recommendations by customer")
    @GetMapping("/customer/{customerId}")
    public List<Recommendation> getByCustomer(
            @PathVariable Long customerId) {
        return service.findRecommendationsByCustomerId(customerId);
    }

    // ✅ Added fetchAll endpoint
    @Operation(summary = "Fetch all recommendations")
    @GetMapping("/fetchAll")
    public List<Recommendation> fetchAllRecommendations() {
        return service.getAllRecommendations();
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