package com.example.exception;

public class CustomerProfileNotFoundException extends RuntimeException {

    public CustomerProfileNotFoundException(String message) {
    	super(message);
    }
}
