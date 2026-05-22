package com.example.exception;

public class ReturnAuthorizationListEmptyException extends RuntimeException {

    public ReturnAuthorizationListEmptyException(String message) {
        super(message);
    }
}