package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.entity.ReplenishmentOrder;

@Repository
public interface ReplenishmentOrderRepository
        extends JpaRepository<ReplenishmentOrder, Long> {

    List<ReplenishmentOrder> findByStatus(String status);
    @Query("SELECT r FROM ReplenishmentOrder r " +
    	       "LEFT JOIN FETCH r.product " +
    	       "LEFT JOIN FETCH r.fromLocation " +
    	       "LEFT JOIN FETCH r.toLocation")
    	List<ReplenishmentOrder> findAllWithDetails();
}