package com.example.dto;

public class InventoryPositionRequestDTO  {

    private  Long locationID;
    private String sku;
    private int quantityOnHand;
    private int quantityReserved;
    private int safetyStock;

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
}
