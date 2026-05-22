package com.example.controller;

import com.example.entity.Promotion;
import com.example.service.PromotionService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import com.example.entity.Promotion;
import com.example.service.PromotionService;

@RestController
@RequestMapping("/promotion")
@Tag(name = "Promotion Controller")
public class PromotionController {

    private final PromotionService service;

    public PromotionController(PromotionService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Promotion add(@RequestBody Promotion promotion) {
        return service.save(promotion);
    }

    @GetMapping("/find/{id}")
    public Promotion get(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/fetchAllPaginated")
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