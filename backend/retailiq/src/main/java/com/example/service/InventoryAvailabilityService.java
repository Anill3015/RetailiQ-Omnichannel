package com.example.service;

import com.example.entity.InventoryPosition;
import com.example.repository.InventoryPositionRepository;
import org.springframework.stereotype.Service;

@Service
public class InventoryAvailabilityService {

    private final InventoryPositionRepository inventoryRepository;

    public InventoryAvailabilityService(InventoryPositionRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public int getAvailableQuantity(int locationID, int sku) {

        InventoryPosition position =
                inventoryRepository.findByLocationIDAndSku(locationID, sku);

        if (position == null) {
            return 0;
        }

        return position.getQuantityOnHand()
                - position.getQuantityReserved()
                - position.getSafetyStock();
    }
}