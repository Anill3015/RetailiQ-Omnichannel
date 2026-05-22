package com.example.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.example.entity.ReturnAuthorization;

@JsonPropertyOrder({ "returnAuthorization", "message", "statusCode" })
public class ReturnAuthorizationResponseDTO {

    private ReturnAuthorization returnAuthorization;
    private String message;
    private int statusCode;

    public ReturnAuthorization getReturnAuthorization() {
        return returnAuthorization;
    }

    public void setReturnAuthorization(ReturnAuthorization returnAuthorization) {
        this.returnAuthorization = returnAuthorization;
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
