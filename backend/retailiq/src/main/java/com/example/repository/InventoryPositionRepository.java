package com.example.repository;

import com.example.entity.InventoryPosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryPositionRepository extends JpaRepository<InventoryPosition, Integer>{

    InventoryPosition findByLocationIDAndSku(int locationID, int sku);
}
