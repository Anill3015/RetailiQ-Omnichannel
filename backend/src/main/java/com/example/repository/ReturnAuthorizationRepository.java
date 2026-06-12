package com.example.repository;

import com.example.entity.Order;
import com.example.entity.ReturnAuthorization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReturnAuthorizationRepository
        extends JpaRepository<ReturnAuthorization, Long> {

    boolean existsByOrderAndSku(Order order, String sku);
}