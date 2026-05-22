package com.example.exception;

public class CustomerProfileNotFoundException extends RuntimeException {

    public CustomerProfileNotFoundException(Long id) {
        super("Customer profile not found with id: " + id);
    }
}
