package com.example.service;

import com.example.entity.InventoryPosition;
import com.example.entity.Order;
import com.example.entity.ReturnAuthorization;
import com.example.repository.InventoryPositionRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ReturnAuthorizationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReturnAuthorizationService {

    @Autowired
    private ReturnAuthorizationRepository returnAuthorizationRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private InventoryPositionRepository inventoryRepository;

    @Autowired
    private ExceptionEventService exceptionEventService;

    public ReturnAuthorization save(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        List<InventoryPosition> matchingInventory = inventoryRepository.findBySku(rma.getSku());

        if (matchingInventory == null || matchingInventory.isEmpty()) {
            throw new RuntimeException("SKU not found in inventory: " + rma.getSku());
        }

        if (returnAuthorizationRepository.existsByOrderAndSku(existingOrder, rma.getSku())) {

            exceptionEventService.createException(
                    "RETURN_FAILURE",
                    String.valueOf(orderId),
                    "HIGH"
            );

            throw new RuntimeException("Return already exists for this Order & SKU");
        }

        rma.setOrder(existingOrder);
        rma.setStatus("REQUESTED");

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization update(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        rma.setOrder(existingOrder);

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization getById(Long id) {
        return returnAuthorizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RMA not found"));
    }

    public List<ReturnAuthorization> getAll() {
        return returnAuthorizationRepository.findAll();
    }

    public Page<ReturnAuthorization> getReturnAuthorizationsWithPagination(Pageable pageable) {
        return returnAuthorizationRepository.findAll(pageable);
    }

    public void delete(Long id) {
        if (!returnAuthorizationRepository.existsById(id)) {
            throw new RuntimeException("ReturnAuthorization not found with id: " + id);
        }
        returnAuthorizationRepository.deleteById(id);
    }

    public ReturnAuthorization approve(Long id) {

        ReturnAuthorization rma = returnAuthorizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RMA not found"));

        if (!"REQUESTED".equalsIgnoreCase(rma.getStatus())) {
            throw new RuntimeException("Only REQUESTED returns can be approved");
        }

        rma.setStatus("APPROVED");

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization reject(Long id) {

        ReturnAuthorization rma = returnAuthorizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RMA not found"));

        rma.setStatus("REJECTED");

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization complete(Long id) {

        ReturnAuthorization rma = returnAuthorizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RMA not found"));

        if (!"APPROVED".equalsIgnoreCase(rma.getStatus())) {
            throw new RuntimeException("Only APPROVED returns can be completed");
        }

        List<InventoryPosition> inventoryList = inventoryRepository.findBySku(rma.getSku());

        if (inventoryList != null && !inventoryList.isEmpty()) {
            InventoryPosition inventory = inventoryList.get(0);
            inventory.setQuantityOnHand(inventory.getQuantityOnHand() + 1);
            inventoryRepository.save(inventory);
        } else {
            exceptionEventService.createException(
                    "INVENTORY_NOT_FOUND",
                    rma.getSku(),
                    "HIGH"
            );
        }

        rma.setStatus("COMPLETED");

        return returnAuthorizationRepository.save(rma);
    }
}