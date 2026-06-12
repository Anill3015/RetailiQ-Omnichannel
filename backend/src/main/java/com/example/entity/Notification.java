package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, length = 1000)
    private String message;

    // Category: Order / Inventory / Promotion (as per PDF section 4.9)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationCategory category;

    // Status: NEW / UNREAD / READ
    @Column(nullable = false)
    private String status = "NEW";

    @Column(nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    // Delivery channel: IN_APP / EMAIL / SMS / WEBHOOK
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DeliveryChannel deliveryChannel = DeliveryChannel.IN_APP;

    private boolean readFlag = false;

    // For email/SMS delivery tracking
    private boolean delivered = false;

    private LocalDateTime deliveredAt;

    private LocalDateTime readAt;

    // Enums
    public enum NotificationCategory {
        ORDER, INVENTORY, PROMOTION, INTEGRATION
    }

    public enum DeliveryChannel {
        IN_APP, EMAIL, SMS, WEBHOOK
    }

    // Constructors
    public Notification() {}

    public Notification(Long userId, String message, NotificationCategory category, DeliveryChannel deliveryChannel) {
        this.userId = userId;
        this.message = message;
        this.category = category;
        this.deliveryChannel = deliveryChannel;
        this.status = "NEW";
        this.createdDate = LocalDateTime.now();
        this.readFlag = false;
        this.delivered = false;
    }

    // Getters and Setters
    public Long getNotificationId() { return notificationId; }
    public void setNotificationId(Long notificationId) { this.notificationId = notificationId; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public NotificationCategory getCategory() { return category; }
    public void setCategory(NotificationCategory category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }

    public DeliveryChannel getDeliveryChannel() { return deliveryChannel; }
    public void setDeliveryChannel(DeliveryChannel deliveryChannel) { this.deliveryChannel = deliveryChannel; }

    public boolean isReadFlag() { return readFlag; }
    public void setReadFlag(boolean readFlag) { this.readFlag = readFlag; }

    public boolean isDelivered() { return delivered; }
    public void setDelivered(boolean delivered) { this.delivered = delivered; }

    public LocalDateTime getDeliveredAt() { return deliveredAt; }
    public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }

    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }
}