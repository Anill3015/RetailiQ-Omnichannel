package com.example.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.NotificationDTO;
import com.example.dto.NotificationResponseDTO;
import com.example.entity.Notification;
import com.example.service.NotificationService;

import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    // ✅ Add Notification
    @PostMapping("/addNotification")
    public ResponseEntity<NotificationResponseDTO> addNotification(
            @RequestBody NotificationDTO dto) {

        Notification saved = service.save(dto.getNotification());

        NotificationResponseDTO response = new NotificationResponseDTO();
        response.setNotification(saved);
        response.setMessage("Notification added successfully");
        response.setStatusCode(201);

        return ResponseEntity.status(201).body(response);
    }

    // ✅ Update Notification
    @PostMapping("/updateNotification")
    public ResponseEntity<NotificationResponseDTO> updateNotification(
            @RequestBody NotificationDTO dto) {

        Notification updated = service.update(dto.getNotification());

        NotificationResponseDTO response = new NotificationResponseDTO();
        response.setNotification(updated);
        response.setMessage("Notification updated successfully");
        response.setStatusCode(200);

        return ResponseEntity.ok(response);
    }

    // ✅ Find Notification by ID
    @GetMapping("/findNotification/{id}")
    public Notification findNotification(@PathVariable Long id) {
        return service.getById(id);
    }


    @GetMapping("/fetchNotificationsWithPagination")
    public Page<Notification> fetchNotificationsWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return service.getAllWithPagination(page, size);
    }

    // ✅ Fetch All Notifications
    @GetMapping("/fetchAllNotifications")
    public List<Notification> fetchAllNotifications() {
        return service.getAll();
    }

    // ✅ Delete Notification
    @DeleteMapping("/deleteNotification")
    public String deleteNotification(@RequestBody Notification notification) {
        service.delete(notification.getNotificationId());
        return "Notification deleted successfully";
    }

    // ✅ Fetch unread in‑app alerts for a user
    @GetMapping("/alerts/{userId}")
    public List<Notification> getUnreadAlerts(@PathVariable Long userId) {
        return service.getUnreadAlerts(userId);
    }

    // ✅ Mark alert as READ
    @PutMapping("/alerts/read/{id}")
    public Notification markAlertAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }
}
