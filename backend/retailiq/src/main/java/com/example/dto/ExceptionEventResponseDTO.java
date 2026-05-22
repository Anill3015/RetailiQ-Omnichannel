package com.example.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.example.entity.ExceptionEvent;

@JsonPropertyOrder({ "exceptionEvent", "message", "statusCode" })
public class ExceptionEventResponseDTO {

    private ExceptionEvent exceptionEvent;
    private String message;
    private int statusCode;

    public ExceptionEvent getExceptionEvent() {
        return exceptionEvent;
    }

    public void setExceptionEvent(ExceptionEvent exceptionEvent) {
        this.exceptionEvent = exceptionEvent;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
