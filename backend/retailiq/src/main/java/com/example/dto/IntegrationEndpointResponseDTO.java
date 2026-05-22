package com.example.dto;

import com.example.entity.IntegrationEndpoint;

public class IntegrationEndpointResponseDTO {

    private IntegrationEndpoint integrationEndpoint;
    private String message;
    private int statusCode;

    public IntegrationEndpoint getIntegrationEndpoint() { return integrationEndpoint; }
    public void setIntegrationEndpoint(IntegrationEndpoint integrationEndpoint) {
        this.integrationEndpoint = integrationEndpoint;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }
}
