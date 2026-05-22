package com.example.controller;

import com.example.entity.PriceList;
import com.example.service.PriceListService;
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


import com.example.entity.PriceList;
import com.example.service.PriceListService;

@RestController
@RequestMapping("/pricelist")
@Tag(name = "PriceList Controller")
public class PriceListController {

    private final PriceListService service;

    public PriceListController(PriceListService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public PriceList add(@RequestBody PriceList priceList) {
        return service.save(priceList);
    }

    @GetMapping("/find/{id}")
    public PriceList get(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/fetchAllPaginated")
    public Page<PriceList> getAll(
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