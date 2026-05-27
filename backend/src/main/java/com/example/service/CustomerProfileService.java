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
        profile.setLoyaltyTier("SILVER");
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

        // ✅ Fetch existing profile to preserve recommendations reference
        CustomerProfile existing = repository.findById(id)
                .orElseThrow(() -> new CustomerProfileNotFoundException(id));

        // ✅ Copy recommendations from existing to avoid orphan error
        profile.setRecommendations(existing.getRecommendations());

        // ✅ Calculate loyalty tier safely
        try {
            List recommendations = recommendationRepository.findByCustomer_CustomerId(id);
            int recCount = (recommendations != null) ? recommendations.size() : 0;
            profile.setLoyaltyTier(calculateLoyaltyTier(recCount));
        } catch (Exception e) {
            profile.setLoyaltyTier(existing.getLoyaltyTier());
        }

        return repository.save(profile);
    }

    public String deleteCustomerProfile(Long customerId) {
        CustomerProfile profile = findCustomerProfileById(customerId);
        repository.delete(profile);
        return "Customer profile deleted successfully";
    }

    public CustomerProfile findCustomerProfileById(Long customerId) {
        return repository.findById(customerId).orElse(null);
            
    }

    public List<CustomerProfile> getAllCustomerProfiles() {
        return repository.findAll();
    }

    public Page<CustomerProfile> getAllCustomersWithPagination(Pageable pageable) {
        return repository.findAll(pageable);
    }
}