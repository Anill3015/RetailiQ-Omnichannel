package com.example.controller;

import com.example.dto.OrderRequestDTO;
import com.example.dto.OrderResponseDTO;
import com.example.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/add")
    public OrderResponseDTO create(
            @RequestBody OrderRequestDTO dto) {
        return orderService.createOrder(dto);
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getById(
            @PathVariable int id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/getAll")
    public Page<OrderResponseDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return orderService.getAllOrders(page, size);
    }

    @PutMapping("/{id}")
    public OrderResponseDTO update(
            @PathVariable int id,
            @RequestBody OrderRequestDTO dto) {

        return orderService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        orderService.deleteOrder(id);
    }
}