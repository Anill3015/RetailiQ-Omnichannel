package com.example.repository;

import com.example.entity.FulfillmentInstruction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FulfillmentInstructionRepository
        extends JpaRepository<FulfillmentInstruction, Integer> {

    List<FulfillmentInstruction> findByOrderID(int orderID);

    List<FulfillmentInstruction> findByStatus(String status);
    @Query("SELECT f FROM FulfillmentInstruction f LEFT JOIN FETCH f.items")
    List<FulfillmentInstruction> findAllWithItems();
}