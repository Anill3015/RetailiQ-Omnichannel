package com.example.controller;

import com.example.entity.Notification;
import com.example.entity.Notification.NotificationCategory;
import com.example.entity.Notification.DeliveryChannel;
import com.example.service.NotificationService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // ── CRUD ──────────────────────────────────────────────

    @PostMapping("/addNotification")
    public ResponseEntity<Notification> add(@RequestBody Notification n) {
        return ResponseEntity.ok(service.save(n));
    }

    @PutMapping("/updateNotification/{id}")
    public ResponseEntity<Notification> update(@PathVariable Long id, @RequestBody Notification n) {
        n.setNotificationId(id);
        return ResponseEntity.ok(service.update(n));
    }

    @GetMapping("/fetchNotificationById/{id}")
    public ResponseEntity<Notification> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/fetchAllNotifications")
    public ResponseEntity<List<Notification>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/fetchAllNotifications/paginated")
    public ResponseEntity<Page<Notification>> getAllPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getAllWithPagination(page, size));
    }

    @DeleteMapping("/deleteNotification/{id}")
    public ResponseEntity<Notification> delete(@PathVariable Long id) {
        return ResponseEntity.ok(service.delete(id));
    }

    // ── READ / UNREAD ──────────────────────────────────────

    @GetMapping("/fetchUnreadNotifications/{userId}")
    public ResponseEntity<List<Notification>> getUnread(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getUnreadAlerts(userId));
    }

    @PutMapping("/markAsRead/{id}")
    public ResponseEntity<Notification> markAsRead(@PathVariable Long id) {
        return ResponseEntity.ok(service.markAsRead(id));
    }

    @GetMapping("/countUnread/{userId}")
    public ResponseEntity<Long> countUnread(@PathVariable Long userId) {
        return ResponseEntity.ok(service.countUnread(userId));
    }

    // ── FILTER BY CATEGORY ────────────────────────────────

    @GetMapping("/fetchNotificationsByCategory/{category}")
    public ResponseEntity<List<Notification>> getByCategory(@PathVariable NotificationCategory category) {
        return ResponseEntity.ok(service.getByCategory(category));
    }

    @GetMapping("/fetchNotificationsByUserAndCategory/{userId}/{category}")
    public ResponseEntity<List<Notification>> getByUserAndCategory(
            @PathVariable Long userId,
            @PathVariable NotificationCategory category) {
        return ResponseEntity.ok(service.getByUserAndCategory(userId, category));
    }

    // ── FILTER BY STATUS ──────────────────────────────────

    @GetMapping("/fetchNotificationsByStatus/{status}")
    public ResponseEntity<List<Notification>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @GetMapping("/fetchNotificationsByUserAndStatus/{userId}/{status}")
    public ResponseEntity<List<Notification>> getByUserAndStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        return ResponseEntity.ok(service.getByUserAndStatus(userId, status));
    }

    // ── FILTER BY USER ────────────────────────────────────

    @GetMapping("/fetchNotificationsByUser/{userId}")
    public ResponseEntity<List<Notification>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUser(userId));
    }

    @GetMapping("/fetchNotificationsByUser/{userId}/paginated")
    public ResponseEntity<Page<Notification>> getByUserPaginated(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(service.getByUserWithPagination(userId, page, size));
    }

    // ── DELIVERY ──────────────────────────────────────────

    @PutMapping("/markAsDelivered/{id}")
    public ResponseEntity<Notification> markAsDelivered(@PathVariable Long id) {
        return ResponseEntity.ok(service.markAsDelivered(id));
    }

    @GetMapping("/fetchUndeliveredNotifications")
    public ResponseEntity<List<Notification>> getUndelivered() {
        return ResponseEntity.ok(service.getUndelivered());
    }

    @GetMapping("/fetchUndeliveredByChannel/{channel}")
    public ResponseEntity<List<Notification>> getUndeliveredByChannel(@PathVariable DeliveryChannel channel) {
        return ResponseEntity.ok(service.getUndeliveredByChannel(channel));
    }

    // ── SEND ──────────────────────────────────────────────

    @PostMapping("/sendInApp/{userId}")
    public ResponseEntity<Notification> sendInApp(
            @PathVariable Long userId,
            @RequestParam String message,
            @RequestParam NotificationCategory category) {
        return ResponseEntity.ok(service.sendInApp(userId, message, category));
    }

    @PostMapping("/sendEmail/{userId}")
    public ResponseEntity<Notification> sendEmail(
            @PathVariable Long userId,
            @RequestParam String message,
            @RequestParam NotificationCategory category) {
        return ResponseEntity.ok(service.sendEmail(userId, message, category));
    }

    @PostMapping("/sendSms/{userId}")
    public ResponseEntity<Notification> sendSms(
            @PathVariable Long userId,
            @RequestParam String message,
            @RequestParam NotificationCategory category) {
        return ResponseEntity.ok(service.sendSms(userId, message, category));
    }

    @PostMapping("/sendWebhook/{userId}")
    public ResponseEntity<Notification> sendWebhook(
            @PathVariable Long userId,
            @RequestParam String message,
            @RequestParam NotificationCategory category) {
        return ResponseEntity.ok(service.sendWebhook(userId, message, category));
    }
}