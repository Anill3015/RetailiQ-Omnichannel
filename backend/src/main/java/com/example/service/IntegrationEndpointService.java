package com.example.service;

import com.example.entity.IntegrationEndpoint;
import com.example.entity.Notification;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.IntegrationEndpointRepository;
import com.example.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IntegrationEndpointService {
    @Autowired
    private NotificationRepository notificationRepository;

    private final IntegrationEndpointRepository repository;

    public IntegrationEndpointService(IntegrationEndpointRepository repository) {
        this.repository = repository;
    }

    public IntegrationEndpoint save(IntegrationEndpoint endpoint) {

        IntegrationEndpoint saved = repository.save(endpoint);

        // ✅ Auto‑create in‑app alert
        Notification notification = new Notification();
        notification.setUserId(101L);
        notification.setMessage(
                "Integration endpoint " + endpoint.getName() + " added successfully");
        notification.setCategory("INTEGRATION");
        notification.setStatus("NEW");
        notification.setReadFlag(false);
        notification.setCreatedDate(LocalDateTime.now());

        notificationRepository.save(notification);

        return saved;
    }


    public IntegrationEndpoint update(IntegrationEndpoint e) {
        return repository.save(e);
    }

    public IntegrationEndpoint getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "IntegrationEndpoint not found with id: " + id));
    }

    public List<IntegrationEndpoint> getAll() {
        return repository.findAll();
    }



    public Page<IntegrationEndpoint> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    public IntegrationEndpoint delete(Long id) {
        IntegrationEndpoint e = getById(id);
        repository.deleteById(id);
        return e;
    }
}
