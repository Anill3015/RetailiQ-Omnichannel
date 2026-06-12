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
<<<<<<< HEAD
    private String sku;   // FIXED: was int, must be String to match Order.sku and InventoryPosition.sku
=======
    private int sku;
>>>>>>> origin/nari-final

    @Column(nullable = false)
    private int quantity;

    // Getters and Setters
    public int getItemID() { return itemID; }

    public FulfillmentInstruction getInstruction() { return instruction; }
    public void setInstruction(FulfillmentInstruction instruction) {
        this.instruction = instruction;
    }

<<<<<<< HEAD
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
=======
    public int getSku() { return sku; }
    public void setSku(int sku) { this.sku = sku; }
>>>>>>> origin/nari-final

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
}