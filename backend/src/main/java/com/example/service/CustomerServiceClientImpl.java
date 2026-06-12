package com.example.service;

import com.example.service.CustomerServiceClient;
import org.springframework.stereotype.Component;
import com.example.repository.CustomerProfileRepository;

@Component
public class CustomerServiceClientImpl implements CustomerServiceClient {

    private final CustomerProfileRepository repository;

    public CustomerServiceClientImpl(CustomerProfileRepository repository) {
        this.repository = repository;
    }

    @Override
    public boolean customerExists(Long customerId) {
        return repository.existsById(customerId);
    }
}