package com.example.repository;

import com.example.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository
        extends JpaRepository<Order, Integer> {

    List<Order> findByCustomerID(int customerID);

    List<Order> findByStatus(String status);
}