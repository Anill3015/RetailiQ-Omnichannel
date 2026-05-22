
package com.example.service;
import com.example.entity.Promotion;
import com.example.repository.PromotionRepository;
import com.example.exception.ListEmptyException;
import com.example.exception.PromotionNotFoundException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class PromotionService {

    private final PromotionRepository repository;

    public PromotionService(PromotionRepository repository) {
        this.repository = repository;
    }

    public Promotion save(Promotion promotion) {
        return repository.save(promotion);
    }

    public Promotion getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new PromotionNotFoundException("Promotion not found with id " + id));
    }

    public Page<Promotion> getAll(Pageable pageable) {
        Page<Promotion> page = repository.findAll(pageable);

        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }

        return page;
    }
}
