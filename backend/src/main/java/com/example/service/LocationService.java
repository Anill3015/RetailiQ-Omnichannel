package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Location;
import com.example.repository.LocationRepository;

@Service
public class LocationService {

    @Autowired
    private LocationRepository repository;

    public Location addLocation(Location location) {
        return repository.save(location);
    }

    public Location updateLocation(Location location) {
        return repository.save(location);
    }

    public String deleteLocation(Long locationId) throws Exception {
        Location location = findLocationById(locationId);
        repository.delete(location);
        return "Location deleted successfully";
    }

    public Location findLocationById(Long locationId) throws Exception {
        return repository.findById(locationId)
                .orElseThrow(() -> new Exception("Location not found"));
    }

    public List<Location> getAllLocations() {
        return repository.findAll();
    }
}