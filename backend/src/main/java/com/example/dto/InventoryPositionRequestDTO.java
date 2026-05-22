package com.example.dto;

public class InventoryPositionRequestDTO extends InventoryPositionResponseDTO {

    private  int locationID;
    private int sku;
    private int quantityOnHand;
    private int quantityReserved;
    private int safetyStock;

    public int getLocationID() {

        return locationID;
    }

    public void setLocationID(int locationID) {

        this.locationID = locationID;
    }

    public int getSku() {

        return sku;
    }

    public void setSku(int sku) {

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
