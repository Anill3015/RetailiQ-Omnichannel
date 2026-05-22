package com.example.exception;

public class KPIReportListEmptyException extends RuntimeException {

    public KPIReportListEmptyException(String message) {
        super(message);
    }
}
