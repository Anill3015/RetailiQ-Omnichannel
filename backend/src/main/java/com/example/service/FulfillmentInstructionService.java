package com.example.service;

import com.example.dto.FulfillmentInstructionRequestDTO;
import com.example.dto.FulfillmentInstructionResponseDTO;
import com.example.entity.FulfillmentInstruction;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.FulfillmentInstructionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class FulfillmentInstructionService {

    private final FulfillmentInstructionRepository repository;
    private final ExceptionEventService exceptionEventService;

    public FulfillmentInstructionService(
            FulfillmentInstructionRepository repository,
            ExceptionEventService exceptionEventService) {

        this.repository = repository;
        this.exceptionEventService = exceptionEventService;
    }

    public FulfillmentInstructionResponseDTO create(FulfillmentInstructionRequestDTO dto) {

        // ✅ VALIDATION FIRST (CRITICAL)
        if (dto.getOrderID() <= 0) {

            System.out.println("🔥 Fulfillment validation failed");

            exceptionEventService.createException(
                    "FULFILLMENT_FAILURE",
                    "INVALID_ORDER_ID",
                    "CRITICAL"
            );

            throw new RuntimeException("Order ID must be valid");
        }

        if (dto.getSourceLocationID() <= 0) {

            exceptionEventService.createException(
                    "FULFILLMENT_FAILURE",
                    String.valueOf(dto.getOrderID()),
                    "HIGH"
            );

            throw new RuntimeException("Invalid Source Location ID");
        }

        try {

            FulfillmentInstruction entity = new FulfillmentInstruction();

            entity.setOrderID(dto.getOrderID());
            entity.setSourceLocationID(dto.getSourceLocationID());
            entity.setDestination(dto.getDestination());
            entity.setStatus("CREATED");
            entity.setItems(dto.getItems() == null ? null : dto.getItems().toString());

            return mapToResponse(repository.save(entity));

        } catch (Exception e) {

            // ✅ SYSTEM FAILURE
            exceptionEventService.createException(
                    "FULFILLMENT_FAILURE",
                    String.valueOf(dto.getOrderID()),
                    "CRITICAL"
            );

            throw new RuntimeException("Fulfillment failed: " + e.getMessage());
        }
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

        entity.setSourceLocationID(dto.getSourceLocationID());
        entity.setDestination(dto.getDestination());
        entity.setItems(dto.getItems() == null ? null : dto.getItems().toString());

        return mapToResponse(repository.save(entity));
    }

    public void delete(int id) {

        FulfillmentInstruction entity = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "FulfillmentInstruction not found with id " + id));

        repository.delete(entity);
    }

    private FulfillmentInstructionResponseDTO mapToResponse(
            FulfillmentInstruction entity) {

        FulfillmentInstructionResponseDTO dto =
                new FulfillmentInstructionResponseDTO();

        dto.setInstructionID(entity.getInstructionID());
        dto.setOrderID(entity.getOrderID());
        dto.setSourceLocationID(entity.getSourceLocationID());
        dto.setDestination(entity.getDestination());
        dto.setStatus(entity.getStatus());

        return dto;
    }
}