package com.example.repository;

import com.example.entity.PromotionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionTypeRepository extends JpaRepository<PromotionType, Long> {
}