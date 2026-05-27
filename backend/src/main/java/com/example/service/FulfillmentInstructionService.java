package com.example.service;

import com.example.dto.FulfillmentInstructionRequestDTO;
import com.example.dto.FulfillmentInstructionResponseDTO;
import com.example.entity.FulfillmentInstruction;
import com.example.entity.FulfillmentItem;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.FulfillmentInstructionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FulfillmentInstructionService {

    private final FulfillmentInstructionRepository repository;

    public FulfillmentInstructionService(FulfillmentInstructionRepository repository) {
        this.repository = repository;
    }

    public FulfillmentInstructionResponseDTO create(FulfillmentInstructionRequestDTO dto) {
        FulfillmentInstruction entity = new FulfillmentInstruction();
        entity.setOrderID(dto.getOrderID());
        entity.setSourceLocationID(dto.getSourceLocationID());
        entity.setDestination(dto.getDestination());
        entity.setStatus("CREATED");

        if (dto.getItems() != null) {
            List<FulfillmentItem> itemEntities = dto.getItems().stream()
                    .map(i -> {
                        FulfillmentItem item = new FulfillmentItem();
                        item.setSku(i.getSku());
                        item.setQuantity(i.getQuantity());
                        item.setInstruction(entity); // link back to parent
                        return item;
                    }).collect(Collectors.toList());
            entity.setItems(itemEntities);
        }

        return mapToResponse(repository.save(entity)); // cascade saves items too
    }

    public FulfillmentInstructionResponseDTO getById(int id) {

        FulfillmentInstruction entity = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "FulfillmentInstruction not found with id " + id));

        return mapToResponse(entity);
    }

    public Page<FulfillmentInstructionResponseDTO> getAll(int page, int size) {
        return repository.findAll(PageRequest.of(page, size))
                .map(this::mapToResponse);
    }

    public FulfillmentInstructionResponseDTO update(
            int id, FulfillmentInstructionRequestDTO dto) {

        FulfillmentInstruction entity = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "FulfillmentInstruction not found with id " + id));

        entity.getItems().clear(); // orphanRemoval deletes old rows
        if (dto.getItems() != null) {
            dto.getItems().forEach(i -> {
                FulfillmentItem item = new FulfillmentItem();
                item.setSku(i.getSku());
                item.setQuantity(i.getQuantity());
                item.setInstruction(entity);
                entity.getItems().add(item);
            });
        }
        return mapToResponse(repository.save(entity));
    }

    public void delete(int id) {

        FulfillmentInstruction entity = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "FulfillmentInstruction not found with id " + id));

        repository.delete(entity);
    }

    private FulfillmentInstructionResponseDTO mapToResponse(FulfillmentInstruction entity) {
        FulfillmentInstructionResponseDTO dto = new FulfillmentInstructionResponseDTO();
        dto.setInstructionID(entity.getInstructionID());
        dto.setOrderID(entity.getOrderID());
        dto.setSourceLocationID(entity.getSourceLocationID());
        dto.setDestination(entity.getDestination());
        dto.setStatus(entity.getStatus());

        if (entity.getItems() != null) {
            List<FulfillmentInstructionResponseDTO.Item> itemDTOs = entity.getItems().stream()
                    .map(i -> {
                        FulfillmentInstructionResponseDTO.Item itemDTO =
                                new FulfillmentInstructionResponseDTO.Item();
                        itemDTO.setSku(i.getSku());
                        itemDTO.setQuantity(i.getQuantity());
                        return itemDTO;
                    }).collect(Collectors.toList());
            dto.setItems(itemDTOs);
        }
        return dto;
    }
}