package com.example.service;

import com.example.entity.PriceList;
import com.example.repository.PriceListRepository;
import com.example.exception.ListEmptyException;
import com.example.exception.PriceListNotFoundException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class PriceListService {

    private final PriceListRepository repository;

    public PriceListService(PriceListRepository repository) {
        this.repository = repository;
    }

    public PriceList save(PriceList priceList) {
        return repository.save(priceList);
    }

    public PriceList getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new PriceListNotFoundException("PriceList not found with id " + id));
    }

    public Page<PriceList> getAll(Pageable pageable) {
        Page<PriceList> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}