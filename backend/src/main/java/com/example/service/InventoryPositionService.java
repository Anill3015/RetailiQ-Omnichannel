package com.example.service;

import com.example.dto.InventoryPositionRequestDTO;
import com.example.dto.InventoryPositionResponseDTO;
import com.example.entity.InventoryPosition;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.InventoryPositionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryPositionService {

    private final InventoryPositionRepository repository;
    private final LocationServiceClient locationClient;

    public InventoryPositionService(InventoryPositionRepository repository,
                                    LocationServiceClient locationClient) {
        this.repository = repository;
        this.locationClient = locationClient;
    }
    
    public InventoryPositionResponseDTO create(InventoryPositionRequestDTO dto) {

        Long locationId = dto.getLocationID();
        if (!locationClient.locationExists(locationId)) {
            throw new ResourceNotFoundException("Location not found: " + locationId);
        }

        InventoryPosition inventory = new InventoryPosition(
                dto.getLocationID(),
                dto.getSku(),
                dto.getQuantityOnHand(),
                dto.getQuantityReserved(),
                dto.getSafetyStock()
        );

        return toResponseDTO(repository.save(inventory));
    }

    public InventoryPositionResponseDTO getById(int id) {

        InventoryPosition inventory = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found with id: " + id));

        return toResponseDTO(inventory);
    }

    public Page<InventoryPositionResponseDTO> getAll(int page, int size) {

        return repository.findAll(PageRequest.of(page, size))
                .map(this::toResponseDTO);
    }

    public InventoryPositionResponseDTO update(int id, InventoryPositionRequestDTO dto) {

        InventoryPosition inventory = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Inventory not found with id: " + id));

        Long locationId = dto.getLocationID();
        if (!locationClient.locationExists(locationId)) {
            throw new ResourceNotFoundException("Location not found: " + locationId);
        }

        inventory.setLocationID(dto.getLocationID());
        inventory.setSku(dto.getSku());
        inventory.setQuantityOnHand(dto.getQuantityOnHand());
        inventory.setQuantityReserved(dto.getQuantityReserved());
        inventory.setSafetyStock(dto.getSafetyStock());

        return toResponseDTO(repository.save(inventory));
    }
    

    // FIX: Added existence check before delete — previously silently did nothing for a missing ID
    public void delete(int id) {

        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Inventory not found with id: " + id);
        }
        repository.deleteById(id);
    }

    public List<InventoryPosition> fetchAll() {
        return repository.findAll();
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
}