package com.example.service;
import com.example.service.LocationServiceClient;
import com.example.repository.LocationRepository;
import org.springframework.stereotype.Component;

@Component
public class LocationServiceClientImp implements LocationServiceClient{
    private final LocationRepository repository;

    public LocationServiceClientImp(LocationRepository repository){
        this.repository = repository;
    }
    public boolean locationExists(Long locationId){
        return repository.existsById(locationId);
    }

}
