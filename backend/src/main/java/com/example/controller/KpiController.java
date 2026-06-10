package com.example.controller;

import com.example.entity.ExceptionEvent;
import com.example.entity.InventoryPosition;
import com.example.entity.ReturnAuthorization;
import com.example.repository.ExceptionEventRepository;
import com.example.repository.InventoryPositionRepository;
import com.example.repository.OrderRepository;
import com.example.repository.ReturnAuthorizationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/kpi")
public class KpiController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ExceptionEventRepository exceptionRepository;

    @Autowired
    private ReturnAuthorizationRepository returnRepository;

    @Autowired
    private InventoryPositionRepository inventoryRepository;

    // ✅ MAIN KPI API
    @GetMapping("/summary")
    public Map<String, Object> getKpiSummary() {

        Map<String, Object> kpi = new HashMap<>();

        // ✅ ORDERS
        kpi.put("totalOrders", orderRepository.count());

        // ✅ EXCEPTIONS
        List<ExceptionEvent> exceptions = exceptionRepository.findAll();

        kpi.put("totalExceptions", exceptions.size());

        long openExceptions = exceptions.stream()
                .filter(e -> "OPEN".equalsIgnoreCase(e.getStatus()))
                .count();

        kpi.put("openExceptions", openExceptions);

        // ✅ RETURNS
        List<ReturnAuthorization> returns = returnRepository.findAll();

        kpi.put("totalReturns", returns.size());

        kpi.put("approvedReturns",
                returns.stream().filter(r -> "APPROVED".equalsIgnoreCase(r.getStatus())).count());

        kpi.put("rejectedReturns",
                returns.stream().filter(r -> "REJECTED".equalsIgnoreCase(r.getStatus())).count());

        kpi.put("completedReturns",
                returns.stream().filter(r -> "COMPLETED".equalsIgnoreCase(r.getStatus())).count());

        // ✅ INVENTORY
        List<InventoryPosition> inventoryList = inventoryRepository.findAll();

        long stockoutCount = inventoryList.stream()
                .filter(i -> i.getQuantityOnHand() == 0)
                .count();

        long lowStockCount = inventoryList.stream()
                .filter(i -> i.getQuantityOnHand() < i.getSafetyStock())
                .count();

        kpi.put("stockouts", stockoutCount);
        kpi.put("lowStock", lowStockCount);

        return kpi;
    }
}