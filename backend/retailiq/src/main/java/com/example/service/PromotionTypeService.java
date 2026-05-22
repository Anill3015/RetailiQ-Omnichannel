package com.example.service;

import com.example.entity.PromotionType;
import com.example.repository.PromotionTypeRepository;
import com.example.exception.ListEmptyException;
import com.example.exception.PromotionNotFoundException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
                        new PromotionNotFoundException("PromotionType not found with id " + id));
    }

    public Page<PromotionType> getAll(Pageable pageable) {
        Page<PromotionType> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}