package com.example.service;

import com.example.dto.InventoryPositionRequestDTO;
import com.example.dto.InventoryPositionResponseDTO;
import com.example.entity.InventoryPosition;
import com.example.repository.InventoryPositionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryPositionService {

    private final InventoryPositionRepository repository;
    private final ExceptionEventService exceptionEventService;

    public InventoryPositionService(
            InventoryPositionRepository repository,
            ExceptionEventService exceptionEventService) {

        this.repository = repository;
        this.exceptionEventService = exceptionEventService;
    }
    
    public InventoryPositionResponseDTO create(InventoryPositionRequestDTO dto) {

        InventoryPosition inventory = new InventoryPosition(
                dto.getLocationID(),
                dto.getSku(),
                dto.getQuantityOnHand(),
                dto.getQuantityReserved(),
                dto.getSafetyStock()
        );

        // ✅ STOCKOUT ON CREATE
        if (dto.getQuantityOnHand() == 0) {

            exceptionEventService.createException(
                    "STOCKOUT",
                    String.valueOf(dto.getSku()),
                    "HIGH"
            );
        }

        InventoryPosition saved = repository.save(inventory);
        return toResponseDTO(saved);
    }

    public InventoryPositionResponseDTO getById(int id) {

        InventoryPosition inventory = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        return toResponseDTO(inventory);
    }

    public Page<InventoryPositionResponseDTO> getAll(int page, int size) {

        return repository.findAll(PageRequest.of(page, size))
                .map(this::toResponseDTO);
    }

    public InventoryPositionResponseDTO update(int id, InventoryPositionRequestDTO dto) {

        InventoryPosition inventory = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventory.setLocationID(dto.getLocationID());
        inventory.setSku(dto.getSku());
        inventory.setQuantityOnHand(dto.getQuantityOnHand());
        inventory.setQuantityReserved(dto.getQuantityReserved());
        inventory.setSafetyStock(dto.getSafetyStock());

        // 🔥 ✅ STOCKOUT DETECTION
        if (inventory.getQuantityOnHand() == 0) {

            System.out.println("🔥 STOCKOUT DETECTED");

            exceptionEventService.createException(
                    "STOCKOUT",
                    String.valueOf(inventory.getSku()),
                    "HIGH"
            );
        }

        // ✅ LOW STOCK (Optional but good)
        else if (inventory.getQuantityOnHand() < inventory.getSafetyStock()) {

            System.out.println("⚠️ LOW STOCK DETECTED");

            exceptionEventService.createException(
                    "LOW_STOCK",
                    String.valueOf(inventory.getSku()),
                    "MEDIUM"
            );
        }

        InventoryPosition saved = repository.save(inventory);
        return toResponseDTO(saved);
    }
    

    public void delete(int id) {
        repository.deleteById(id);
    }

    private InventoryPositionResponseDTO toResponseDTO(InventoryPosition inventory) {

        InventoryPositionResponseDTO dto = new InventoryPositionResponseDTO();
        dto.setInventoryId(inventory.getInventoryID());
        dto.setLocationID(inventory.getLocationID());
        dto.setSku(inventory.getSku());
        dto.setQuantityOnHand(inventory.getQuantityOnHand());
        dto.setQuantityReserved(inventory.getQuantityReserved());
        dto.setSafetyStock(inventory.getSafetyStock());
        return dto;
    }

    public List<InventoryPosition>  fetchAll(){
        return this.repository.findAll();
    }
}