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

    @GetMapping("/summary")
    public Map<String, Object> getKpiSummary() {

        Map<String, Object> kpi = new HashMap<>();

        long totalOrders = orderRepository.count();
        kpi.put("totalOrders", totalOrders);

        List<ExceptionEvent> exceptions = exceptionRepository.findAll();

        long totalExceptions = exceptions.size();
        long openExceptions = exceptions.stream()
                .filter(e -> "OPEN".equalsIgnoreCase(e.getStatus()))
                .count();

        kpi.put("totalExceptions", totalExceptions);
        kpi.put("openExceptions", openExceptions);

        List<ReturnAuthorization> returns = returnRepository.findAll();

        long totalReturns = returns.size();
        long approvedReturns = returns.stream()
                .filter(r -> "APPROVED".equalsIgnoreCase(r.getStatus()))
                .count();
        long rejectedReturns = returns.stream()
                .filter(r -> "REJECTED".equalsIgnoreCase(r.getStatus()))
                .count();
        long completedReturns = returns.stream()
                .filter(r -> "COMPLETED".equalsIgnoreCase(r.getStatus()))
                .count();

        kpi.put("totalReturns", totalReturns);
        kpi.put("approvedReturns", approvedReturns);
        kpi.put("rejectedReturns", rejectedReturns);
        kpi.put("completedReturns", completedReturns);

        List<InventoryPosition> inventoryList = inventoryRepository.findAll();

        long totalInventory = inventoryList.size();

        long stockoutCount = inventoryList.stream()
                .filter(i -> i.getQuantityOnHand() == 0)
                .count();

        long lowStockCount = inventoryList.stream()
                .filter(i -> i.getQuantityOnHand() > 0 && i.getQuantityOnHand() < i.getSafetyStock())
                .count();

        long normalStock = totalInventory - stockoutCount - lowStockCount;

        if (normalStock < 0) {
            normalStock = 0;
        }

        kpi.put("stockouts", stockoutCount);
        kpi.put("lowStock", lowStockCount);
        kpi.put("normalStock", normalStock);

        return kpi;
    }
}