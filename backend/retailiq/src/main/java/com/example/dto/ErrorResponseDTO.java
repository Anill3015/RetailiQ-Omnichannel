package com.example.dto;

import java.time.LocalDateTime;

public class ErrorResponseDTO {

    private String message;
    private int statusCode;
    private LocalDateTime timestamp = LocalDateTime.now();

    public ErrorResponseDTO(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }

    public String getMessage() { return message; }
    public int getStatusCode() { return statusCode; }
    public LocalDateTime getTimestamp() { return timestamp; }
}