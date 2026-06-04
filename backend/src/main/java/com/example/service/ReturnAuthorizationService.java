package com.example.service;

<<<<<<< HEAD
import com.example.exception.ReturnAuthorizationListEmptyException;import com.example.entity.ReturnAuthorization;
=======
import com.example.entity.ReturnAuthorization;
import com.example.entity.Order;
>>>>>>> Rakesh
import com.example.repository.ReturnAuthorizationRepository;
import com.example.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.entity.Order;

import java.util.List;

@Service
public class ReturnAuthorizationService {

    @Autowired
    private ReturnAuthorizationRepository returnAuthorizationRepository;

    @Autowired
    private OrderRepository orderRepository;

<<<<<<< HEAD
    public ReturnAuthorization save(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();   

        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        rma.setOrder(existingOrder);

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization update(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();   

        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        rma.setOrder(existingOrder);

        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization getById(Long id) {
        return returnAuthorizationRepository.findById(id).orElse(null);
=======
    // ✅ CREATE
    public ReturnAuthorization save(ReturnAuthorization rma) {

        int orderId = rma.getOrder().getOrderID();

        Order existingOrder = orderRepository.findById(orderId)
            .orElseThrow(() ->
                new RuntimeException("Order not found with ID: " + orderId)  // ✅ clear message
            );

        rma.setOrder(existingOrder);

        return returnAuthorizationRepository.save(rma);
>>>>>>> Rakesh
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
<<<<<<< HEAD

        List<ReturnAuthorization> list = returnAuthorizationRepository.findAll();

        if (list.isEmpty()) {
            throw new ReturnAuthorizationListEmptyException(
                    "No ReturnAuthorizations found");
        }

        return list;
=======
        return returnAuthorizationRepository.findAll();
>>>>>>> Rakesh
    }

    // ✅ PAGINATION
    public Page<ReturnAuthorization> getReturnAuthorizationsWithPagination(Pageable pageable) {
        return returnAuthorizationRepository.findAll(pageable);
    }

<<<<<<< HEAD
    public void delete(Long id) {

        if (!returnAuthorizationRepository.existsById(id)) {
            throw new RuntimeException(
                    "ReturnAuthorization not found with id: " + id);
        }

=======
    // ✅ DELETE
    public void delete(Long id) {
        if (!returnAuthorizationRepository.existsById(id)) {
            throw new RuntimeException("ReturnAuthorization not found with id: " + id);
        }
>>>>>>> Rakesh
        returnAuthorizationRepository.deleteById(id);
    }
}

