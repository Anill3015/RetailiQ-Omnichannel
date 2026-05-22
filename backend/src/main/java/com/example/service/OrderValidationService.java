package com.example.service;

import com.example.service.InventoryAvailabilityService;
import org.springframework.stereotype.Service;

@Service
public class OrderValidationService {

    private final InventoryAvailabilityService availabilityService;

    public OrderValidationService(
            InventoryAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }



    public String validateInventoryAvailability(
            int locationID, int sku, int quantity) {

        int availableQty =
                availabilityService.getAvailableQuantity(locationID, sku);

        if (quantity > availableQty) {
            return "Order not placed due to insufficient quantity";
        }


        return "Yes order placed";
    }
}