package com.example.service;

import com.example.dto.OrderRequestDTO;
import com.example.dto.OrderResponseDTO;
import com.example.entity.Order;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponseDTO createOrder(OrderRequestDTO dto) {

        Order order = new Order();
        order.setCustomerID(dto.getCustomerID());
        order.setChannel(dto.getChannel());
        order.setTotalAmount(dto.getTotalAmount());

        // System-controlled fields
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("CREATED");

        Order savedOrder = orderRepository.save(order);
        return mapToResponseDTO(savedOrder);
    }

    public OrderResponseDTO getOrderById(int orderID) {

        Order order = orderRepository.findById(orderID)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id " + orderID));

        return mapToResponseDTO(order);
    }


    public Page<OrderResponseDTO> getAllOrders(int page, int size) {

        return orderRepository
                .findAll(PageRequest.of(page, size))
                .map(this::mapToResponseDTO);
    }


    public OrderResponseDTO updateOrder(
            int orderID, OrderRequestDTO dto) {

        Order order = orderRepository.findById(orderID)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id " + orderID));

        order.setCustomerID(dto.getCustomerID());
        order.setChannel(dto.getChannel());
        order.setTotalAmount(dto.getTotalAmount());

        Order updatedOrder = orderRepository.save(order);
        return mapToResponseDTO(updatedOrder);
    }


    public void deleteOrder(int orderID) {

        Order order = orderRepository.findById(orderID)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id " + orderID));

        orderRepository.delete(order);
    }


    private OrderResponseDTO mapToResponseDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderID(order.getOrderID());
        dto.setCustomerID(order.getCustomerID());
        dto.setChannel(order.getChannel());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setTotalAmount(order.getTotalAmount());

        return dto;
    }

    public OrderResponseDTO update(int id, OrderRequestDTO dto) {
        return null;
    }
}
