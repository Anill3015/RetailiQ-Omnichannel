package com.example.service;

import com.example.entity.ReturnAuthorization;
import com.example.entity.Order;
import com.example.repository.ReturnAuthorizationRepository;
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

    // ✅ CREATE
    public ReturnAuthorization save(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
            .orElseThrow(() ->
                new RuntimeException("Order not found with ID: " + orderId)  // ✅ clear message
            );

        rma.setOrder(existingOrder);

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
}
