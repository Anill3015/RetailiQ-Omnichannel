package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByCustomer_CustomerId(Long customerId); // ← this must exist
}