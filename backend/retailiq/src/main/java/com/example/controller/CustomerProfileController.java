package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.CustomerProfileDTO;
import com.example.dto.CustomerProfileResponseDTO;
import com.example.entity.CustomerProfile;
import com.example.service.CustomerProfileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/customer")
@Tag(name = "Customer Profile", description = "Customer profile and personalization APIs")
public class CustomerProfileController {

    @Autowired
    private CustomerProfileService service;

    @Operation(summary = "Add customer profile")
    @PostMapping("/add")
    public ResponseEntity<CustomerProfileResponseDTO> addCustomer(
            @RequestBody CustomerProfileDTO customerDTO) {

        CustomerProfile saved =
                service.addCustomerProfile(customerDTO.getCustomerProfile());

        CustomerProfileResponseDTO response = new CustomerProfileResponseDTO();
        response.setCustomerProfile(saved);
        response.setStatusCode(201);
        response.setMessage("Customer Profile added successfully");

        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Update customer profile and loyalty tier")
    @PutMapping("/update")
    public ResponseEntity<CustomerProfileResponseDTO> updateCustomer(
            @RequestBody CustomerProfileDTO customerDTO) {

        CustomerProfile updated =
                service.updateCustomerProfile(customerDTO.getCustomerProfile());

        CustomerProfileResponseDTO response = new CustomerProfileResponseDTO();
        response.setCustomerProfile(updated);
        response.setStatusCode(200);
        response.setMessage("Customer Profile updated successfully");

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete customer profile")
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Long id) {
        return service.deleteCustomerProfile(id);
    }

    @Operation(summary = "Find customer by ID")
    @GetMapping("/find/{id}")
    public CustomerProfile findCustomer(@PathVariable Long id) {
        return service.findCustomerProfileById(id);
    }

    @Operation(summary = "Fetch all customers")
    @GetMapping("/fetchAll")
    public List<CustomerProfile> fetchAllCustomers() {
        return service.getAllCustomerProfiles();
    }

    @Operation(summary = "Fetch customers with pagination")
    @GetMapping("/fetchAllPaginated")
    public Page<CustomerProfile> fetchAllCustomersPaginated(
            @RequestParam int pgno,
            @RequestParam int size,
            @RequestParam String sorting,
            @RequestParam boolean asc) {

        Sort sort = asc ? Sort.by(sorting).ascending()
                        : Sort.by(sorting).descending();

        Pageable pageable = PageRequest.of(pgno, size, sort);
        return service.getAllCustomersWithPagination(pageable);
    }
}