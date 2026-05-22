package com.example.exception;

public class PriceListNotFoundException extends RuntimeException {

    public PriceListNotFoundException(String message) {
        super(message);
    }
}