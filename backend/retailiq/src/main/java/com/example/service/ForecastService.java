package com.example.service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.exception.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.example.entity.Forecast;
import com.example.entity.Product;
import com.example.entity.Location;
import com.example.repository.ForecastRepository;


import com.example.exception.ForecastNotFoundException;

import com.example.repository.ProductRepository;
import com.example.repository.LocationRepository;

@Service
public class ForecastService {

    @Autowired
    private ForecastRepository forecastRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private LocationRepository locationRepository;

    public Forecast addForecast(Forecast forecast) {

        String sku = forecast.getProduct().getSku();
        Long locationId = forecast.getLocation().getLocationId();

        Product product = productRepository.findBySku(sku).orElseThrow(() ->
                        new ProductNotFoundException("Product not found with sku " + sku));

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() ->
                        new RuntimeException("Location not found with id " + locationId));

        forecast.setProduct(product);
        forecast.setLocation(location);
        forecast.setGeneratedAt(LocalDateTime.now());

        return forecastRepository.save(forecast);
    }

 // ✅ FEATURE: Safety stock calculation
     public int calculateSafetyStock(Long forecastId) throws Exception {
         Forecast f = findForecastById(forecastId);
         return (int) (f.getForecastQty() * 0.2);
     }


    public Forecast updateForecast(Forecast forecast) {
        return addForecast(forecast);
    }

    public String deleteForecast(Long forecastId) throws Exception {
        Forecast forecast = findForecastById(forecastId);
        forecastRepository.delete(forecast);
        return "Forecast deleted successfully";
    }

    public Forecast findForecastById(Long forecastId) throws Exception {

      return forecastRepository.findById(forecastId)
                .orElseThrow(() -> new ForecastNotFoundException(forecastId));

    }

    public List<Forecast> getAllForecasts() {
        return forecastRepository.findAll();
    }

    public Page<Forecast> getForecastsPaginated(int page, int size,
                                                 String sortBy, String direction) {

        size = Math.min(size, 50);

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        return forecastRepository.findAll(pageable);
    }
}