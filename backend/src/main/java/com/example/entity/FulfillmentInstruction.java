package com.example.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "FulfillmentInstruction")
public class FulfillmentInstruction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int instructionID;

    @Column(nullable = false)
    private int orderID;

    @Column(nullable = false)
    private int sourceLocationID;

    @Column(nullable = false)
    private int destination;

    @Column(nullable = false)
    private String status;

    @OneToMany(mappedBy = "instruction", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FulfillmentItem> items = new ArrayList<>();

    // Getter and Setter
    public List<FulfillmentItem> getItems() { return items; }
    public void setItems(List<FulfillmentItem> items) { this.items = items; }

    public int getInstructionID() {
        return instructionID;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}