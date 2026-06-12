package com.example.repository;

import com.example.entity.Notification;
import com.example.entity.Notification.NotificationCategory;
import com.example.entity.Notification.DeliveryChannel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Unread alerts for a user
    List<Notification> findByUserIdAndReadFlagFalse(Long userId);

    // All notifications for a user
    List<Notification> findByUserId(Long userId);

    // Filter by category (Order / Inventory / Promotion)
    List<Notification> findByCategory(NotificationCategory category);

    // Filter by status (NEW / UNREAD / READ)
    List<Notification> findByStatus(String status);

    // Filter by userId and category
    List<Notification> findByUserIdAndCategory(Long userId, NotificationCategory category);

    // Filter by userId and status
    List<Notification> findByUserIdAndStatus(Long userId, String status);

    // Undelivered notifications for retry
    List<Notification> findByDeliveredFalse();

    // Undelivered by channel (EMAIL / SMS / WEBHOOK)
    List<Notification> findByDeliveredFalseAndDeliveryChannel(DeliveryChannel channel);

    // Paginated by userId
    Page<Notification> findByUserId(Long userId, Pageable pageable);

    // Count unread by userId
    long countByUserIdAndReadFlagFalse(Long userId);
}