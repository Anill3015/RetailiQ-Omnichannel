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
public class IntegrationEndpointController {

    private final IntegrationEndpointService service;

    public IntegrationEndpointController(IntegrationEndpointService service) {
        this.service = service;
    }

    // ✅ Add Integration Endpoint
    @PostMapping("/addIntegrationEndpoint")
    public IntegrationEndpointResponseDTO addIntegrationEndpoint(
            @RequestBody IntegrationEndpointDTO dto) {

        IntegrationEndpoint saved =
                service.save(dto.getIntegrationEndpoint());

        IntegrationEndpointResponseDTO response =
                new IntegrationEndpointResponseDTO();

        response.setIntegrationEndpoint(saved);
        response.setMessage("Integration endpoint added successfully");
        response.setStatusCode(201);
        return response;
    }

    // ✅ Fetch all Integration Endpoints
    @GetMapping("/fetchAllIntegrationEndpoints")
    public List<IntegrationEndpoint> fetchAll() {
        return service.getAll();
    }

    // ✅ Find by ID
    @GetMapping("/findIntegrationEndpoint/{id}")
    public IntegrationEndpoint findById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Pagination
    @GetMapping("/fetchIntegrationEndpointsWithPagination")
    public Page<IntegrationEndpoint> fetchWithPagination(
            @RequestParam int page,
            @RequestParam int size) {
        return service.getAllWithPagination(page, size);
    }
}