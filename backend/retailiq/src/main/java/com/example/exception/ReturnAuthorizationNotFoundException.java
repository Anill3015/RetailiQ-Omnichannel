package com.example.exception;

public class ReturnAuthorizationNotFoundException extends RuntimeException {

    public ReturnAuthorizationNotFoundException(String message) {
        super(message);
    }
}