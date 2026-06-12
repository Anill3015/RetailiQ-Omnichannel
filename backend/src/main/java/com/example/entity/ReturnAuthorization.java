package com.example.entity;

import jakarta.persistence.*;

@Entity
public class ReturnAuthorization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rmaId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String sku;
    private String reason;
    private String status;

    @PrePersist
    public void onCreate() {
        if (this.status == null) {
            this.status = "REQUESTED";
        }
    }

    public ReturnAuthorization() {
    }

    public ReturnAuthorization(Long rmaId, Order order, String sku, String reason, String status) {
        this.rmaId = rmaId;
        this.order = order;
        this.sku = sku;
        this.reason = reason;
        this.status = status;
    }

    public Long getRmaId() {
        return rmaId;
    }

    public void setRmaId(Long rmaId) {
        this.rmaId = rmaId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ReturnAuthorization [rmaId=" + rmaId +
                ", order=" + (order != null ? order.getOrderID() : null) +
                ", sku=" + sku +
                ", reason=" + reason +
                ", status=" + status + "]";
    }
}