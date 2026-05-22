package com.example.dto;

import java.util.List;

public class FulfillmentInstructionRequestDTO {

    private int orderID;
    private int sourceLocationID;
    private int destination;
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

    public int getDestination() {
        return destination;
    }

    public void setDestination(int destination) {
        this.destination = destination;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {
        private int sku;
        private int quantity;

        public int getSku() {
            return sku;
        }

        public void setSku(int sku) {
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