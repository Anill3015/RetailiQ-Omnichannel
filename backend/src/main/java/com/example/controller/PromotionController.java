package com.example.controller;

import com.example.entity.Promotion;
import com.example.service.PromotionService;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/promotion")
@Tag(name = "Promotion Controller")
public class PromotionController {

    private final PromotionService service;

    public PromotionController(PromotionService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @Operation(summary = "Add Promotion")
    public Promotion add(@RequestBody Promotion promotion) {
        return service.save(promotion);
    }

    // ✅ Added
    @PutMapping("/update")
    @Operation(summary = "Update Promotion")
    public Promotion update(@RequestBody Promotion promotion) {
        return service.save(promotion);
    }

    @GetMapping("/find/{id}")
    @Operation(summary = "Get Promotion by ID")
    public Promotion get(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Added
    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete Promotion")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Promotion deleted successfully";
    }

    @GetMapping("/fetchAllPaginated")
    @Operation(summary = "Fetch Promotions with Pagination")
    public Page<Promotion> getAll(
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