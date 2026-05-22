package com.example.controller;

import com.example.service.OrderValidationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order/validation")
public class OrderValidationController {
    int quantity;

    private final OrderValidationService orderValidationService;

    public OrderValidationController(OrderValidationService orderValidationService){
        this.orderValidationService = orderValidationService;
    }

    @GetMapping
    public String validatation(@RequestParam int locationID , @RequestParam int sku, @RequestParam int quantity ){
        return this.orderValidationService.validateInventoryAvailability(locationID,sku, quantity);
     }
}
