package com.example.service;

import com.example.entity.Notification;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    public Notification save(Notification n) {
        return repository.save(n);
    }

    public Notification update(Notification n) {
        return repository.save(n);
    }

    public Notification getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Notification not found with id: " + id));
    }

    public List<Notification> getAll() {
        return repository.findAll();
    }


    public Page<Notification> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }
    public List<Notification> getUnreadAlerts(Long userId) {
        return repository.findByUserIdAndReadFlagFalse(userId);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = getById(notificationId);
        notification.setReadFlag(true);
        notification.setStatus("READ");
        return repository.save(notification);
    }

    public Notification delete(Long id) {
        Notification n = getById(id);
        repository.deleteById(id);
        return n;
    }
}