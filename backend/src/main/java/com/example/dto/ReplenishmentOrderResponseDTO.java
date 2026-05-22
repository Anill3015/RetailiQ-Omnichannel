package com.example.dto;

import com.example.entity.ReplenishmentOrder;

public class ReplenishmentOrderResponseDTO {

    private ReplenishmentOrder replenishmentOrder;
    private int statusCode;
    private String message;

    public ReplenishmentOrder getReplenishmentOrder() {
        return replenishmentOrder;
    }

    public void setReplenishmentOrder(ReplenishmentOrder replenishmentOrder) {
        this.replenishmentOrder = replenishmentOrder;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
