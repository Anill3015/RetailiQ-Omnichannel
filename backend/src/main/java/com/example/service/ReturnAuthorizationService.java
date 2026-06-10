package com.example.service;

import com.example.entity.ReturnAuthorization;
import com.example.entity.InventoryPosition;
import com.example.entity.Order;
import com.example.repository.ReturnAuthorizationRepository;
import com.example.repository.InventoryPositionRepository;
import com.example.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ReturnAuthorizationService {

    @Autowired
    private ReturnAuthorizationRepository returnAuthorizationRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ExceptionEventService exceptionEventService;

    @Autowired
    private InventoryPositionRepository inventoryRepository;
    

    // ✅ CREATE
    public ReturnAuthorization save(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found with ID: " + orderId));

        // ✅ DUPLICATE CHECK
        if (returnAuthorizationRepository.existsByOrderAndSku(existingOrder, rma.getSku())) {

            exceptionEventService.createException(
                    "RETURN_FAILURE",
                    String.valueOf(orderId),
                    "HIGH"
            );

            throw new RuntimeException("Return already exists for this Order & SKU");
        }

        rma.setOrder(existingOrder);

        // ✅ DEFAULT STATUS
        rma.setStatus("REQUESTED");

        return returnAuthorizationRepository.save(rma);
    }

    // ✅ UPDATE
    public ReturnAuthorization update(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
            .orElseThrow(() ->
                new RuntimeException("Order not found with ID: " + orderId)  // ✅ same handling
            );

        rma.setOrder(existingOrder);

        return returnAuthorizationRepository.save(rma);
    }

    // ✅ FIND BY ID
    public ReturnAuthorization getById(Long id) {
        return returnAuthorizationRepository.findById(id).orElse(null);
    }

    // ✅ FIND ALL
    public List<ReturnAuthorization> getAll() {
        return returnAuthorizationRepository.findAll();
    }

    // ✅ PAGINATION
    public Page<ReturnAuthorization> getReturnAuthorizationsWithPagination(Pageable pageable) {
        return returnAuthorizationRepository.findAll(pageable);
    }

    // ✅ DELETE
    public void delete(Long id) {
        if (!returnAuthorizationRepository.existsById(id)) {
            throw new RuntimeException("ReturnAuthorization not found with id: " + id);
        }
        returnAuthorizationRepository.deleteById(id);
    }
    
    public ReturnAuthorization approve(Long id) {

        ReturnAuthorization rma = returnAuthorizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("RMA not found"));

        if (!rma.getStatus().equals("REQUESTED")) {
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

        if (!rma.getStatus().equals("APPROVED")) {
            throw new RuntimeException("Only APPROVED returns can be completed");
        }

        // ✅ FIND INVENTORY BY SKU
        List<InventoryPosition> list = inventoryRepository.findAll();

        InventoryPosition inventory = null;

        for (InventoryPosition inv : list) {
            if (inv.getSku() == Integer.parseInt(rma.getSku())) {
                inventory = inv;
                break;
            }
        }

        if (inventory != null) {

            inventory.setQuantityOnHand(
                    inventory.getQuantityOnHand() + 1
            );

            inventoryRepository.save(inventory);

            System.out.println("✅ Inventory updated!");

        } else {

            System.out.println("❌ Inventory not found for SKU: " + rma.getSku());
        }

        rma.setStatus("COMPLETED");

        return returnAuthorizationRepository.save(rma);
    }
    
}
