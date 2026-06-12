package com.example.repository;

import com.example.entity.FulfillmentItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FulfillmentItemRepository extends JpaRepository<FulfillmentItem, Integer> {
    List<FulfillmentItem> findByInstruction_InstructionID(int instructionID);
}