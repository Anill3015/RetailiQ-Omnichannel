package com.example.exception;

public class AuditLogListEmptyException extends RuntimeException {

    public AuditLogListEmptyException(String message) {
        super(message);
    }
}
