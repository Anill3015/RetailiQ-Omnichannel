package com.example.exception;

public class KPIReportNotFoundException extends RuntimeException {

    public KPIReportNotFoundException(String message) {
        super(message);
    }
}