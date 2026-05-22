package com.example.controller;

import com.example.service.InventoryAvailabilityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory/availability")
public class InventoryAvailabilityController {

    private final InventoryAvailabilityService availabilityService;

    public InventoryAvailabilityController(
            InventoryAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping
    public int getAvailableQuantity(
            @RequestParam int locationID,
            @RequestParam int sku) {

        return availabilityService.getAvailableQuantity(locationID, sku);
    }
}