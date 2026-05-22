package com.example.repository;

import com.example.entity.Forecast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForecastRepository extends JpaRepository<Forecast, Long> {

    Forecast findByProduct_SkuAndLocation_LocationId(String sku, Long locationId);
}
