package com.example.repository;

import com.example.entity.InventoryPosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryPositionRepository extends JpaRepository<InventoryPosition, Integer> {

    InventoryPosition findByLocationIDAndSku(Long locationID, String sku);

    List<InventoryPosition> findBySku(String sku);
    InventoryPosition findByInventoryIDAndSku(int inventoryId, String sku);
}