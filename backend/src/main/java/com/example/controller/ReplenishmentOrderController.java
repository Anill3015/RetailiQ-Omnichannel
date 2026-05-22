package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.dto.ReplenishmentOrderDTO;
import com.example.dto.ReplenishmentOrderResponseDTO;
import com.example.entity.ReplenishmentOrder;
import com.example.service.ReplenishmentOrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/replenishment")
@Tag(
    name = "Replenishment Orders",
    description = "Inventory replenishment and stock transfer APIs"
)
public class ReplenishmentOrderController {

    @Autowired
    private ReplenishmentOrderService service;

    @Operation(
        summary = "Create replenishment order",
        description = "Creates a replenishment order between source and destination locations"
    )
    @PostMapping("/add")
    public ResponseEntity<ReplenishmentOrderResponseDTO> addOrder(
            @RequestBody ReplenishmentOrderDTO orderDTO) {

        ReplenishmentOrder saved =
                service.addReplenishmentOrder(orderDTO.getReplenishmentOrder());

        ReplenishmentOrderResponseDTO response = new ReplenishmentOrderResponseDTO();
        response.setReplenishmentOrder(saved);
        response.setStatusCode(201);
        response.setMessage("Replenishment Order added successfully");

        return ResponseEntity.status(201).body(response);
    }

    @Operation(
        summary = "Update replenishment order",
        description = "Updates quantity or locations for an existing replenishment order"
    )
    @PutMapping("/update")
    public ResponseEntity<ReplenishmentOrderResponseDTO> updateOrder(
            @RequestBody ReplenishmentOrderDTO orderDTO) {

        ReplenishmentOrder updated =
                service.updateReplenishmentOrder(orderDTO.getReplenishmentOrder());

        ReplenishmentOrderResponseDTO response = new ReplenishmentOrderResponseDTO();
        response.setReplenishmentOrder(updated);
        response.setStatusCode(200);
        response.setMessage("Replenishment Order updated successfully");

        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Delete replenishment order",
        description = "Deletes a replenishment order by ID"
    )
    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable Long id) throws Exception {
        return service.deleteReplenishmentOrder(id);
    }

    @Operation(
        summary = "Find replenishment order by ID",
        description = "Fetches a single replenishment order by its identifier"
    )
    @GetMapping("/find/{id}")
    public ReplenishmentOrder findOrder(@PathVariable Long id) throws Exception {
        return service.findReplenishmentOrderById(id);
    }

    @Operation(
        summary = "Get replenishment orders by status",
        description = "Fetches replenishment orders filtered by status (CREATED, COMPLETED, etc.)"
    )
    @GetMapping("/status/{status}")
    public List<ReplenishmentOrder> getByStatus(
            @PathVariable String status) {
        return service.getOrdersByStatus(status);
    }

    @Operation(
        summary = "Fetch replenishment orders with pagination",
        description = "Returns paginated and sorted replenishment orders"
    )
    @GetMapping("/fetchAllPaginated")
    public Page<ReplenishmentOrder> fetchAllPaginated(
            @RequestParam(name = "pgno") int pgno,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "sorting") String sorting,
            @RequestParam(name = "asc") boolean asc) {

        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();

        Pageable pageable = PageRequest.of(pgno, size, sort);
        return service.getAllOrdersWithPagination(pageable);
    }
}
