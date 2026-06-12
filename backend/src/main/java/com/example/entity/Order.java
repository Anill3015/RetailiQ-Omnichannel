package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "Orders")   // "Order" is a reserved SQL keyword
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "OrderID")
    private int orderID;


    @Column(name = "CustomerID", nullable = false)
    private Long customerID;

    @Column(name = "Channel", nullable = false)
    private String channel;   // from where the user is buying the product

    @Column(name = "OrderDate", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "Status", nullable = false)
    private String status;    // CREATED, CONFIRMED, SHIPPED

    @Column(name = "TotalAmount", nullable = false)
    private int totalAmount;

    @Column(name = "sku", nullable = false)
    private String sku;

    @Column(name= "quantity", nullable = false)
    private int quantity;

    @Column(name = "inventoryId", nullable = false)
    private int inventoryId;

    @Column(name="destination", nullable = false)
    private String destination;

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

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

    public Order() {
    }

    public Order(Long customerID, String channel, LocalDateTime orderDate, String status, int totalAmount, String sku, int quantity, String destination) {
        this.customerID = customerID;
        this.channel = channel;
        this.orderDate = orderDate;
        this.status = status;
        this.totalAmount = totalAmount;
        this.quantity= quantity;
        this.sku = sku;
        this.destination = destination;

    }

    public int getOrderID() {

        return orderID;
    }

    public Long getCustomerID() {

        return customerID;
    }

    public void setCustomerID(Long customerID) {

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Order order)) return false;
        return orderID == order.orderID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderID);
    }
}