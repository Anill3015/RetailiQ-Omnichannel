package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "forecast")
public class Forecast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long forecastId;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "sku", referencedColumnName = "sku")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Product product;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Location location;

    @Column(nullable = false)
    private String period;

    @Column(nullable = false)
    private Integer forecastQty;

    private LocalDateTime generatedAt;

    public Forecast() {}

    public Long getForecastId() {
        return forecastId;
    }

    public void setForecastId(Long forecastId) {
        this.forecastId = forecastId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Integer getForecastQty() {
        return forecastQty;
    }

    public void setForecastQty(Integer forecastQty) {
        this.forecastQty = forecastQty;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    @Override
    public String toString() {
        return "Forecast [forecastId=" + forecastId +
                ", productSku=" + (product != null ? product.getSku() : null) +
                ", locationId=" + (location != null ? location.getLocationId() : null) +
                ", period=" + period +
                ", forecastQty=" + forecastQty +
                ", generatedAt=" + generatedAt +
                "]";
    }
}