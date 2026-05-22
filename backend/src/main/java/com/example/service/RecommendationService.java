package com.example.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.entity.CustomerProfile;
import com.example.entity.Recommendation;
import com.example.exception.RecommendationNotFoundException;
import com.example.repository.RecommendationRepository;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository repository;

    // ✅ FEATURE: Personalized recommendation generation
    public Recommendation generateRecommendation(Long customerId, List<String> skuList) {
        Recommendation rec = new Recommendation();
        rec.setCustomer(new CustomerProfile());
        rec.setSkuList(skuList);
        rec.setGeneratedAt(LocalDateTime.now());
        return repository.save(rec);
    }

    public Recommendation addRecommendation(Recommendation recommendation) {
        recommendation.setGeneratedAt(LocalDateTime.now());
        return repository.save(recommendation);
    }

    public Recommendation updateRecommendation(Recommendation recommendation) {
        Long id = recommendation.getRecId();
        if (id == null || !repository.existsById(id)) {
            throw new RecommendationNotFoundException(id);
        }
        return repository.save(recommendation);
    }

    public String deleteRecommendation(Long recId) {
        Recommendation rec = findRecommendationById(recId);
        repository.delete(rec);
        return "Recommendation deleted successfully";
    }

    public Recommendation findRecommendationById(Long recId) {
        return repository.findById(recId)
                .orElseThrow(() -> new RecommendationNotFoundException(recId));
    }

    public List<Recommendation> findRecommendationsByCustomerId(Long customerId) {
        return repository.findByCustomer_CustomerId(customerId);
    }

    public Page<Recommendation> getAllRecommendationsWithPagination(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
