package com.example.service;

import com.example.dto.FulfillmentInstructionRequestDTO;
import com.example.dto.OrderRequestDTO;
import com.example.dto.OrderResponseDTO;
import com.example.entity.Order;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerServiceClient customerClient;
    private final InventoryAvailabilityService inventoryService;
    private final FulfillmentInstructionService fulfillmentService;

    public OrderService(OrderRepository orderRepository,
                        CustomerServiceClient customerClient,
                        InventoryAvailabilityService inventoryService,
                        FulfillmentInstructionService fulfillmentService) {
        this.orderRepository = orderRepository;
        this.customerClient = customerClient;
        this.inventoryService = inventoryService;
        this.fulfillmentService = fulfillmentService;
    }

    // -------------------------------------------------------------------------
    // CREATE
    // -------------------------------------------------------------------------
    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {
    	System.out.println("👉 customerID value = " + dto.getCustomerID());

        // 1. Validate customer exists
        if (!customerClient.customerExists(dto.getCustomerID())) {
            throw new ResourceNotFoundException(
                    "Customer not found with id " + dto.getCustomerID());
        }

        // 2. Validate inventory is available for the specific inventoryId + SKU
        if (!inventoryService.isAvailable(dto.getSku(), dto.getQuantity(), dto.getInventoryId())) {
            throw new RuntimeException(
                    "Insufficient stock for SKU: " + dto.getSku()
                            + " at inventoryId: " + dto.getInventoryId());
        }

        // 3. Deduct quantityOnHand and increment quantityReserved
        inventoryService.deductInventory(dto.getSku(), dto.getQuantity(), dto.getInventoryId());

        // 4. Build and persist the order
        Order order = new Order();
        order.setCustomerID(dto.getCustomerID());
        order.setChannel(dto.getChannel());
        order.setTotalAmount(dto.getTotalAmount());
        order.setOrderDate(LocalDateTime.now());   // always server-side
        order.setStatus("CREATED");                // always starts as CREATED
        order.setSku(dto.getSku());
        order.setQuantity(dto.getQuantity());
        order.setInventoryId(dto.getInventoryId());
        order.setDestination(dto.getDestination());

        Order savedOrder = orderRepository.save(order);

        // 5. Auto-create fulfillment instruction for the placed order
        FulfillmentInstructionRequestDTO fulfillmentDTO = new FulfillmentInstructionRequestDTO();
        fulfillmentDTO.setOrderID(savedOrder.getOrderID());
        fulfillmentDTO.setSourceLocationID(savedOrder.getInventoryId());
        fulfillmentDTO.setDestination(dto.getDestination());

        FulfillmentInstructionRequestDTO.Item item = new FulfillmentInstructionRequestDTO.Item();
        item.setSku(savedOrder.getSku());
        item.setQuantity(savedOrder.getQuantity());
        fulfillmentDTO.setItems(List.of(item));

        fulfillmentService.create(fulfillmentDTO);

        return mapToResponseDTO(savedOrder);
    }

    // -------------------------------------------------------------------------
    // READ ONE
    // -------------------------------------------------------------------------
    public OrderResponseDTO getOrderById(int orderID) {

        Order order = orderRepository.findById(orderID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Order not found with id " + orderID));

        return mapToResponseDTO(order);
    }

    // -------------------------------------------------------------------------
    // READ ALL (paginated)
    // -------------------------------------------------------------------------
    public Page<OrderResponseDTO> getAllOrders(int page, int size) {

        return orderRepository
                .findAll(PageRequest.of(page, size))
                .map(this::mapToResponseDTO);
    }

    // -------------------------------------------------------------------------
    // UPDATE
    // -------------------------------------------------------------------------
    public OrderResponseDTO updateOrder(int orderID, OrderRequestDTO dto) {

        // 1. Check order exists
        Order order = orderRepository.findById(orderID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Order not found with id " + orderID));

        // 2. Validate customer exists
        if (!customerClient.customerExists(dto.getCustomerID())) {
            throw new ResourceNotFoundException(
                    "Customer not found with id " + dto.getCustomerID());
        }

        // 3. Validate inventory is available for the specific inventoryId + SKU
        if (!inventoryService.isAvailable(dto.getSku(), dto.getQuantity(), dto.getInventoryId())) {
            throw new RuntimeException(
                    "Insufficient stock for SKU: " + dto.getSku()
                            + " at inventoryId: " + dto.getInventoryId());
        }

        // 4. Apply changes — orderDate and status are NOT updated from DTO
        order.setCustomerID(dto.getCustomerID());
        order.setChannel(dto.getChannel());
        order.setTotalAmount(dto.getTotalAmount());
        order.setSku(dto.getSku());
        order.setQuantity(dto.getQuantity());
        order.setInventoryId(dto.getInventoryId());
        order.setDestination(dto.getDestination());

        return mapToResponseDTO(orderRepository.save(order));
    }

    // -------------------------------------------------------------------------
    // DELETE
    // -------------------------------------------------------------------------
    public void deleteOrder(int orderID) {

        Order order = orderRepository.findById(orderID)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Order not found with id " + orderID));

        orderRepository.delete(order);
    }

    // -------------------------------------------------------------------------
    // MAPPER
    // -------------------------------------------------------------------------
    private OrderResponseDTO mapToResponseDTO(Order order) {

        OrderResponseDTO dto = new OrderResponseDTO();
        dto.setOrderID(order.getOrderID());
        dto.setCustomerID(order.getCustomerID());
        dto.setChannel(order.getChannel());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setSku(order.getSku());
        dto.setQuantity(order.getQuantity());
        dto.setInventoryId(order.getInventoryId());
        dto.setDestination(order.getDestination());


        return dto;
    }
}