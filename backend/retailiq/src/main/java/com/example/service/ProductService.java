package com.example.service;

import com.example.entity.Product;
import com.example.repository.ProductRepository;
import com.example.exception.ListEmptyException;
import com.example.exception.ProductNotFoundException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Product save(Product product) {
        return repository.save(product);
    }

    public Product getById(Long id) {
        Optional<Product> optional = repository.findById(id);
        if (!optional.isPresent()) {
            throw new ProductNotFoundException("Product not found with id " + id);
        }
        return optional.get();
    }

    public void delete(Long id) {
        Product product = getById(id);
        repository.delete(product);
    }

    public Page<Product> getAll(Pageable pageable) {
        Page<Product> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}
