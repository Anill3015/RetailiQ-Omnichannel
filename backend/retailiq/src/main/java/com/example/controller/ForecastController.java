package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.ForecastDTO;
import com.example.dto.ForecastResponseDTO;
import com.example.entity.Forecast;
import com.example.service.ForecastService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/forecast")
@Tag(name = "Forecast", description = "Demand forecasting and inventory planning APIs")
public class ForecastController {

    @Autowired
    private ForecastService service;

    @Operation(summary = "Create demand forecast")
    @PostMapping("/add")
    public ResponseEntity<ForecastResponseDTO> addForecast(
            @RequestBody ForecastDTO forecastDTO) {

        Forecast saved = service.addForecast(forecastDTO.getForecast());

        ForecastResponseDTO response = new ForecastResponseDTO();
        response.setForecast(saved);
        response.setStatusCode(201);
        response.setMessage("Forecast added successfully");

        return ResponseEntity.status(201).body(response);
    }

    @Operation(summary = "Update forecast")
    @PutMapping("/update")
    public ResponseEntity<ForecastResponseDTO> updateForecast(
            @RequestBody ForecastDTO forecastDTO) {

        Forecast updated = service.updateForecast(forecastDTO.getForecast());

        ForecastResponseDTO response = new ForecastResponseDTO();
        response.setForecast(updated);
        response.setStatusCode(200);
        response.setMessage("Forecast updated successfully");

        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Delete forecast")
    @DeleteMapping("/delete/{id}")
    public String deleteForecast(@PathVariable Long id) throws Exception {
        return service.deleteForecast(id);
    }

    @Operation(summary = "Find forecast by ID")
    @GetMapping("/find/{id}")
    public Forecast findForecast(@PathVariable Long id) throws Exception {
        return service.findForecastById(id);
    }

    @Operation(summary = "Fetch all forecasts")
    @GetMapping("/fetchAll")
    public List<Forecast> fetchAllForecasts() {
        return service.getAllForecasts();
    }

    @Operation(summary = "Fetch forecasts with pagination")
    @GetMapping("/fetch")
    public Page<Forecast> fetchForecastsPaginated(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam String sortBy,
            @RequestParam String direction) {

        return service.getForecastsPaginated(page, size, sortBy, direction);
    }
}