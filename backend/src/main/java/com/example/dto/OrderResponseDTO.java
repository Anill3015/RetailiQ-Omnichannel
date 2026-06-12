package com.example.dto;

import java.time.LocalDateTime;

public class OrderResponseDTO {
    private int orderID;
<<<<<<< HEAD
    private Long customerID;
=======
    private Integer customerID;
>>>>>>> origin/nari-final
    private String channel;
    private LocalDateTime orderDate;
    private String status;
    private int totalAmount;
    private String destination;

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    private String sku;
    private int quantity;

    private  int inventoryId;

    public int getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

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

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

<<<<<<< HEAD
    public Long getCustomerID() {
        return customerID;
    }

    public void setCustomerID(Long customerID) {
=======
    public Integer getCustomerID() {
        return customerID;
    }

    public void setCustomerID(Integer customerID) {
>>>>>>> origin/nari-final
        this.customerID = customerID;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(int totalAmount) {
        this.totalAmount = totalAmount;
    }
}
