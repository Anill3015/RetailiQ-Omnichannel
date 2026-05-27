package com.example.service;

import com.example.entity.PromotionType;
import com.example.repository.PromotionTypeRepository;
import com.example.exception.ListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class PromotionTypeService {

    private final PromotionTypeRepository repository;

    public PromotionTypeService(PromotionTypeRepository repository) {
        this.repository = repository;
    }

    public PromotionType save(PromotionType promotionType) {
        return repository.save(promotionType);
    }

    public PromotionType getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("PromotionType not found with id: " + id));
    }

    // ✅ Added
    public List<PromotionType> getAllPromotionTypes() {
        List<PromotionType> types = repository.findAll();
        if (types.isEmpty()) {
            throw new ListEmptyException("Promotion type list is empty");
        }
        return types;
    }

    public Page<PromotionType> getAll(Pageable pageable) {
        Page<PromotionType> page = repository.findAll(pageable);
        if (page.isEmpty()) {
            throw new ListEmptyException("Promotion type list is empty");
        }
        return page;
    }
}