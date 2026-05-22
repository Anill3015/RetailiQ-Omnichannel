package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.LocationDTO;
import com.example.dto.LocationResponseDTO;
import com.example.entity.Location;
import com.example.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    private LocationService service;

    @PostMapping("/add")
    public ResponseEntity<LocationResponseDTO> addLocation(
            @RequestBody LocationDTO locationDTO) {

        Location saved = service.addLocation(locationDTO.getLocation());

        LocationResponseDTO response = new LocationResponseDTO();
        response.setLocation(saved);
        response.setStatusCode(201);
        response.setMessage("Location added successfully");

        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<LocationResponseDTO> updateLocation(
            @RequestBody LocationDTO locationDTO) {

        Location updated = service.updateLocation(locationDTO.getLocation());

        LocationResponseDTO response = new LocationResponseDTO();
        response.setLocation(updated);
        response.setStatusCode(200);
        response.setMessage("Location updated successfully");

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteLocation(@PathVariable("id") Long id) throws Exception {
        return service.deleteLocation(id);
    }

    @GetMapping("/find/{id}")
    public Location findLocationById(@PathVariable("id") Long id) throws Exception {
        return service.findLocationById(id);
    }

    @GetMapping("/fetchAll")
    public List<Location> fetchAllLocations() {
        return service.getAllLocations();
    }
}