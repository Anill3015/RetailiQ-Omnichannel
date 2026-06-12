package com.example.dto;

import java.util.List;

public class FulfillmentInstructionRequestDTO {

    private int orderID;
    private int sourceLocationID;
    private String destination;
    private List<Item> items;

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public int getSourceLocationID() {
        return sourceLocationID;
    }

    public void setSourceLocationID(int sourceLocationID) {
        this.sourceLocationID = sourceLocationID;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {
        private String sku;   // FIXED: was int, must be String to match Order.sku and InventoryPosition.sku
        private int quantity;

        public String getSku() {
            return sku;
        }

        public void setSku(String sku) {
            this.sku = sku;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}