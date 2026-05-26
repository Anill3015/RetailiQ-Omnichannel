package com.example.controller;

import com.example.entity.PromotionType;
import com.example.service.PromotionTypeService;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/promotionType")
@Tag(name = "PromotionType Controller")
public class PromotionTypeController {

    private final PromotionTypeService service;

    public PromotionTypeController(PromotionTypeService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @Operation(summary = "Add Promotion Type")
    public PromotionType add(@RequestBody PromotionType promotionType) {
        return service.save(promotionType);
    }

    @GetMapping("/find/{id}")
    @Operation(summary = "Get Promotion Type by ID")
    public PromotionType get(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Added
    @GetMapping("/fetchAll")
    @Operation(summary = "Fetch All Promotion Types")
    public List<PromotionType> fetchAll() {
        return service.getAllPromotionTypes();
    }

    @GetMapping("/fetchAllPaginated")
    @Operation(summary = "Fetch Promotion Types with Pagination")
    public Page<PromotionType> getAll(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        Pageable pageable = PageRequest.of(
                pgno, size,
                asc ? Sort.by(sorting).ascending()
                        : Sort.by(sorting).descending());

        return service.getAll(pageable);
    }
}