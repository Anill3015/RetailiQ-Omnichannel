package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "fulfillment_item")
public class FulfillmentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructionID", nullable = false)
    private FulfillmentInstruction instruction;

    @Column(nullable = false)
    private String sku;   // FIXED: was int, must be String to match Order.sku and InventoryPosition.sku

    @Column(nullable = false)
    private int quantity;

    // Getters and Setters
    public int getItemID() { return itemID; }

    public FulfillmentInstruction getInstruction() { return instruction; }
    public void setInstruction(FulfillmentInstruction instruction) {
        this.instruction = instruction;
    }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}