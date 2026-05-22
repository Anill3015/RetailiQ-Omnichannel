package com.example.repository;

import com.example.entity.IntegrationEndpoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IntegrationEndpointRepository
        extends JpaRepository<IntegrationEndpoint, Long> {
}
