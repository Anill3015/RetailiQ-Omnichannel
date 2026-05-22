package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "replenishment_order")
public class ReplenishmentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replenishmentId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sku", referencedColumnName = "sku")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_location_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Location fromLocation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_location_id")
    @JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
    private Location toLocation;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private String status;

    public ReplenishmentOrder() {}

    public Long getReplenishmentId() {
        return replenishmentId;
    }

    public void setReplenishmentId(Long replenishmentId) {
        this.replenishmentId = replenishmentId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Location getFromLocation() {
        return fromLocation;
    }

    public void setFromLocation(Location fromLocation) {
        this.fromLocation = fromLocation;
    }

    public Location getToLocation() {
        return toLocation;
    }

    public void setToLocation(Location toLocation) {
        this.toLocation = toLocation;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ReplenishmentOrder [replenishmentId=" + replenishmentId +
                ", productSku=" + (product != null ? product.getSku() : null) +
                ", fromLocationId=" + (fromLocation != null ? fromLocation.getLocationId() : null) +
                ", toLocationId=" + (toLocation != null ? toLocation.getLocationId() : null) +
                ", quantity=" + quantity +
                ", status=" + status + "]";
    }
}
