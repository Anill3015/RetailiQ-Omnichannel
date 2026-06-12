package com.example.controller;

import com.example.dto.IntegrationEndpointDTO;
import com.example.dto.IntegrationEndpointResponseDTO;
import com.example.entity.IntegrationEndpoint;
import com.example.service.IntegrationEndpointService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class IntegrationEndpointController {

    private final IntegrationEndpointService service;

    public IntegrationEndpointController(IntegrationEndpointService service) {
        this.service = service;
    }

    @PostMapping("/addIntegrationEndpoint")
    public IntegrationEndpointResponseDTO addIntegrationEndpoint(
            @RequestBody IntegrationEndpointDTO dto) {
        IntegrationEndpoint saved = service.save(dto.getIntegrationEndpoint());
        IntegrationEndpointResponseDTO response = new IntegrationEndpointResponseDTO();
        response.setIntegrationEndpoint(saved);
        response.setMessage("Integration endpoint added successfully");
        response.setStatusCode(201);
        return response;
    }

    @GetMapping("/fetchAllIntegrationEndpoints")
    public List<IntegrationEndpoint> fetchAll() {
        return service.getAll();
    }

    @GetMapping("/findIntegrationEndpoint/{id}")
    public IntegrationEndpoint findById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping("/updateIntegrationEndpoint")
    public IntegrationEndpointResponseDTO updateIntegrationEndpoint(
            @RequestBody IntegrationEndpointDTO dto) {
        IntegrationEndpoint updated = service.update(dto.getIntegrationEndpoint());
        IntegrationEndpointResponseDTO response = new IntegrationEndpointResponseDTO();
        response.setIntegrationEndpoint(updated);
        response.setMessage("Integration endpoint updated successfully");
        response.setStatusCode(200);
        return response;
    }

    @DeleteMapping("/deleteIntegrationEndpoint/{id}")
    public String deleteIntegrationEndpoint(@PathVariable Long id) {
        service.delete(id);
        return "Integration Endpoint deleted successfully";
    }

    @GetMapping("/fetchIntegrationEndpointsWithPagination")
    public Page<IntegrationEndpoint> fetchWithPagination(
            @RequestParam int page,
            @RequestParam int size) {
        return service.getAllWithPagination(page, size);
    }
}