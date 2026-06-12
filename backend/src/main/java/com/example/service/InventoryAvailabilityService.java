package com.example.service;

import com.example.entity.InventoryPosition;
import com.example.repository.InventoryPositionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryAvailabilityService {

    private final InventoryPositionRepository inventoryRepository;

    public InventoryAvailabilityService(InventoryPositionRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // Returns available quantity for a specific location + SKU combination
    public int getAvailableQuantity(Long locationID, String sku) {

        InventoryPosition position =
                inventoryRepository.findByLocationIDAndSku(locationID, sku);

        if (position == null) {
            return 0;
        }

        return position.getQuantityOnHand()
                - position.getQuantityReserved()
                - position.getSafetyStock();
    }

    /**
     * Checks availability for a SPECIFIC inventory record (by inventoryId + sku).
     * Used by createOrder and updateOrder to validate against the exact
     * inventory location the order references.
     *
     * @throws RuntimeException if the inventory record is not found
     */
    public boolean isAvailable(String sku, int requiredQty, int inventoryId) {

        InventoryPosition position =
                inventoryRepository.findByInventoryIDAndSku(inventoryId, sku);

        if (position == null) {
            throw new RuntimeException(
                    "No inventory record found for inventoryId: " + inventoryId + ", SKU: " + sku);
        }

        int available = position.getQuantityOnHand()
                - position.getQuantityReserved()
                - position.getSafetyStock();

        return available >= requiredQty;
    }

    /**
     * Deducts ordered quantity from quantityOnHand and increments quantityReserved.
     * Called ONLY after isAvailable() confirms sufficient stock.
     * Must be called within the same @Transactional context as order creation.
     *
     * @throws RuntimeException if the inventory record is not found
     */
    public void deductInventory(String sku, int quantity, int inventoryId) {

        InventoryPosition position =
                inventoryRepository.findByInventoryIDAndSku(inventoryId, sku);

        if (position == null) {
            throw new RuntimeException(
                    "No inventory record found for inventoryId: " + inventoryId + ", SKU: " + sku);
        }

        position.setQuantityOnHand(position.getQuantityOnHand() - quantity);
        position.setQuantityReserved(position.getQuantityReserved() + quantity);

        inventoryRepository.save(position);
    }

    /**
     * Checks availability across ALL locations for a SKU (sum-based).
     * Kept as a utility — not used by order placement directly.
     */
    public boolean isAvailable(String sku, int requiredQty) {

        List<InventoryPosition> inventoryList = inventoryRepository.findBySku(sku);

        if (inventoryList.isEmpty()) {
            throw new RuntimeException("SKU not found: " + sku);
        }

        int totalAvailable = inventoryList.stream()
                .mapToInt(inv -> inv.getQuantityOnHand() - inv.getQuantityReserved())
                .sum();

        return totalAvailable >= requiredQty;
    }
}