package com.example.service;

import com.example.entity.Notification;
import com.example.entity.Notification.NotificationCategory;
import com.example.entity.Notification.DeliveryChannel;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.NotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repository;

    public NotificationService(NotificationRepository repository) {
        this.repository = repository;
    }

    // ── CRUD ──────────────────────────────────────────────

    public Notification save(Notification n) {
        return repository.save(n);
    }

    public Notification update(Notification n) {
        return repository.save(n);
    }

    public Notification getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Notification not found with id: " + id));
    }

    public List<Notification> getAll() {
        return repository.findAll();
    }

    public Page<Notification> getAllWithPagination(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    public Notification delete(Long id) {
        Notification n = getById(id);
        repository.deleteById(id);
        return n;
    }

    // ── READ / UNREAD ──────────────────────────────────────

    public List<Notification> getUnreadAlerts(Long userId) {
        return repository.findByUserIdAndReadFlagFalse(userId);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = getById(notificationId);
        notification.setReadFlag(true);
        notification.setStatus("READ");
        notification.setReadAt(LocalDateTime.now());
        return repository.save(notification);
    }

    public long countUnread(Long userId) {
        return repository.countByUserIdAndReadFlagFalse(userId);
    }

    // ── FILTER BY CATEGORY (Order/Inventory/Promotion) ────

    public List<Notification> getByCategory(NotificationCategory category) {
        return repository.findByCategory(category);
    }

    public List<Notification> getByUserAndCategory(Long userId, NotificationCategory category) {
        return repository.findByUserIdAndCategory(userId, category);
    }

    // ── FILTER BY STATUS ──────────────────────────────────

    public List<Notification> getByStatus(String status) {
        return repository.findByStatus(status);
    }

    public List<Notification> getByUserAndStatus(Long userId, String status) {
        return repository.findByUserIdAndStatus(userId, status);
    }

    // ── FILTER BY USER ────────────────────────────────────

    public List<Notification> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public Page<Notification> getByUserWithPagination(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findByUserId(userId, pageable);
    }

    // ── DELIVERY TRACKING (Email/SMS/Webhook) ─────────────

    public Notification markAsDelivered(Long notificationId) {
        Notification notification = getById(notificationId);
        notification.setDelivered(true);
        notification.setDeliveredAt(LocalDateTime.now());
        return repository.save(notification);
    }

    public List<Notification> getUndelivered() {
        return repository.findByDeliveredFalse();
    }

    public List<Notification> getUndeliveredByChannel(DeliveryChannel channel) {
        return repository.findByDeliveredFalseAndDeliveryChannel(channel);
    }

    // ── SEND HELPERS (hook your email/SMS/webhook clients here) ──

    public Notification sendInApp(Long userId, String message, NotificationCategory category) {
        Notification n = new Notification(userId, message, category, DeliveryChannel.IN_APP);
        n.setStatus("UNREAD");
        n.setDelivered(true);
        n.setDeliveredAt(LocalDateTime.now());
        return repository.save(n);
    }

    public Notification sendEmail(Long userId, String message, NotificationCategory category) {
        Notification n = new Notification(userId, message, category, DeliveryChannel.EMAIL);
        n.setStatus("UNREAD");
        // TODO: call your EmailService here, then mark delivered
        return repository.save(n);
    }

    public Notification sendSms(Long userId, String message, NotificationCategory category) {
        Notification n = new Notification(userId, message, category, DeliveryChannel.SMS);
        n.setStatus("UNREAD");
        // TODO: call your SmsService here, then mark delivered
        return repository.save(n);
    }

    public Notification sendWebhook(Long userId, String message, NotificationCategory category) {
        Notification n = new Notification(userId, message, category, DeliveryChannel.WEBHOOK);
        n.setStatus("UNREAD");
        // TODO: call your WebhookService here, then mark delivered
        return repository.save(n);
    }
    
}