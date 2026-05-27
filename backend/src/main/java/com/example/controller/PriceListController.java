package com.example.controller;

import com.example.entity.PriceList;
import com.example.service.PriceListService;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/pricelist")
@Tag(name = "PriceList Controller")
public class PriceListController {

    private final PriceListService service;

    public PriceListController(PriceListService service) {
        this.service = service;
    }

    @PostMapping("/add")
    @Operation(summary = "Add PriceList")
    public PriceList add(@RequestBody PriceList priceList) {
        return service.save(priceList);
    }

    // ✅ Added
    @PutMapping("/update")
    @Operation(summary = "Update PriceList")
    public PriceList update(@RequestBody PriceList priceList) {
        return service.save(priceList);
    }

    @GetMapping("/find/{id}")
    @Operation(summary = "Get PriceList by ID")
    public PriceList get(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Added
    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete PriceList")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "PriceList deleted successfully";
    }

    @GetMapping("/fetchAllPaginated")
    @Operation(summary = "Fetch PriceLists with Pagination")
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