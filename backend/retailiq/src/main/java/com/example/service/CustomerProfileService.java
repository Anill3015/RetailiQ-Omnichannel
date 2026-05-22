package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.entity.CustomerProfile;
import com.example.exception.CustomerProfileNotFoundException;
import com.example.repository.CustomerProfileRepository;
import com.example.repository.RecommendationRepository;

@Service
public class CustomerProfileService {

    @Autowired
    private CustomerProfileRepository repository;

    @Autowired
    private RecommendationRepository recommendationRepository;

    public CustomerProfile addCustomerProfile(CustomerProfile profile) {
        profile.setLoyaltyTier("SILVER"); // default tier
        return repository.save(profile);
    }

    private String calculateLoyaltyTier(int recCount) {
        if (recCount >= 20) return "PLATINUM";
        if (recCount >= 10) return "GOLD";
        return "SILVER";
    }

    public CustomerProfile updateCustomerProfile(CustomerProfile profile) {
        Long id = profile.getCustomerId();
        if (id == null || !repository.existsById(id)) {
            throw new CustomerProfileNotFoundException(id);
        }

        int recCount = recommendationRepository
                .findByCustomer_CustomerId(id).size();

        profile.setLoyaltyTier(calculateLoyaltyTier(recCount));

        return repository.save(profile);
    }

    public String deleteCustomerProfile(Long customerId) {
        CustomerProfile profile = findCustomerProfileById(customerId);
        repository.delete(profile);
        return "Customer profile deleted successfully";
    }

    public CustomerProfile findCustomerProfileById(Long customerId) {
        return repository.findById(customerId)
                .orElseThrow(() -> new CustomerProfileNotFoundException(customerId));
    }

    public List<CustomerProfile> getAllCustomerProfiles() {
        return repository.findAll();
    }

    public Page<CustomerProfile> getAllCustomersWithPagination(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
