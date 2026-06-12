package com.example.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "InventoryPosition")
public class InventoryPosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "InventoryID")
    private int inventoryID;

    @Column(name = "LocationID", nullable = false)
    private Long locationID;

    @Column(name = "SKU", nullable = false)
    private String sku;

    @Column(name = "QuantityOnHand", nullable = false)
    private int quantityOnHand;

    @Column(name = "QuantityReserved", nullable = false)
    private int quantityReserved;

    @Column(name = "SafetyStock", nullable = false)
    private int safetyStock;

    public InventoryPosition() {
    }

    public InventoryPosition(Long locationID, String sku,
                             int quantityOnHand,
                             int quantityReserved,
                             int safetyStock) {
        this.locationID = locationID;
        this.sku = sku;
        this.quantityOnHand = quantityOnHand;
        this.quantityReserved = quantityReserved;
        this.safetyStock = safetyStock;
    }

    public int getInventoryID() {

        return inventoryID;
    }

    public Long getLocationID() {

        return locationID;
    }

    public void setLocationID(Long locationID) {

        this.locationID = locationID;
    }

    public String getSku() {

        return sku;
    }

    public void setSku(String sku) {

        this.sku = sku;
    }

    public int getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(int quantityOnHand) {

        this.quantityOnHand = quantityOnHand;
    }

    public int getQuantityReserved() {

        return quantityReserved;
    }

    public void setQuantityReserved(int quantityReserved) {

        this.quantityReserved = quantityReserved;
    }

    public int getSafetyStock() {

        return safetyStock;
    }

    public void setSafetyStock(int safetyStock) {

        this.safetyStock = safetyStock;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InventoryPosition)) return false;
        InventoryPosition that = (InventoryPosition) o;
        return inventoryID == that.inventoryID;
    }

    @Override
    public int hashCode() {

        return Objects.hash(inventoryID);
    }
}