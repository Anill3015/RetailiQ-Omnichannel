package com.example.service;

import com.example.entity.User;
import com.example.repository.UserRepository;
import com.example.exception.UserNotFoundException;
import com.example.exception.ListEmptyException;
import com.example.exception.UserListEmptyException;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User save(User user) {
        return repository.save(user);
    }

    public User getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found with id " + id));
    }

    public void delete(Long id) {
        User user = getById(id);
        repository.delete(user);
    }

    public Page<User> getAll(Pageable pageable) {
        Page<User> page = repository.findAll(pageable);
        if (page.isEmpty()) {
        	throw new ListEmptyException("Product list is empty");
        }
        return page;
    }
}