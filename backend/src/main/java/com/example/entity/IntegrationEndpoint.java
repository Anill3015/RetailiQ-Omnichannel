package com.example.entity;

import jakarta.persistence.*;

@Entity
public class IntegrationEndpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long endpointId;

    private String name;
    private String type;
    private String config;
    private boolean active;

    public Long getEndpointId() { return endpointId; }
    public void setEndpointId(Long endpointId) { this.endpointId = endpointId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getConfig() { return config; }
    public void setConfig(String config) { this.config = config; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
