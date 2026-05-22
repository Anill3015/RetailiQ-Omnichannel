package com.example.exception;

public class ReplenishmentOrderNotFoundException extends RuntimeException {

    public ReplenishmentOrderNotFoundException(Long id) {
        super("Replenishment order not found with id: " + id);
    }
}