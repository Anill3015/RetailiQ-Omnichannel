package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.entity.Forecast;
import com.example.entity.Location;
import com.example.entity.Product;
import com.example.entity.ReplenishmentOrder;
import com.example.repository.LocationRepository;
import com.example.repository.ProductRepository;
import com.example.exception.ReplenishmentOrderNotFoundException;
import com.example.repository.ReplenishmentOrderRepository;

@Service
public class ReplenishmentOrderService {

    @Autowired
    private ReplenishmentOrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private LocationRepository locationRepository;

    public ReplenishmentOrder addReplenishmentOrder(ReplenishmentOrder order) {

        if (order.getProduct() == null ||
            order.getFromLocation() == null ||
            order.getToLocation() == null) {
            throw new RuntimeException("Product and Locations are mandatory");
        }

        String sku = order.getProduct().getSku();
        Long fromLocId = order.getFromLocation().getLocationId();
        Long toLocId = order.getToLocation().getLocationId();

        Product product = productRepository.findBySku(sku)
                .orElseThrow(() ->
                        new RuntimeException("Product not found: " + sku));

        Location fromLocation = locationRepository.findById(fromLocId)
                .orElseThrow(() ->
                        new RuntimeException("From location not found: " + fromLocId));

        Location toLocation = locationRepository.findById(toLocId)
                .orElseThrow(() ->
                        new RuntimeException("To location not found: " + toLocId));

        order.setProduct(product);
        order.setFromLocation(fromLocation);
        order.setToLocation(toLocation);
        order.setStatus("CREATED");

        return orderRepository.save(order);
    }

    public ReplenishmentOrder updateReplenishmentOrder(ReplenishmentOrder order) {
        return addReplenishmentOrder(order);
    }


    // ✅ FEATURE: Replenishment qty calculation
       private int calculateReplenishmentQuantity(Forecast forecast) {
           int safetyStock = (int)(forecast.getForecastQty() * 0.2);
           return forecast.getForecastQty() + safetyStock;
       }
       

    // ✅ FEATURE: Auto replenishment from forecast
        public ReplenishmentOrder generateFromForecast(
                Forecast forecast, Long fromLocId, Long toLocId) {

            Location from = locationRepository.findById(fromLocId)
                    .orElseThrow(() -> new RuntimeException("Location not found with id " + fromLocId));

            Location to = locationRepository.findById(toLocId)
                    .orElseThrow(() -> new RuntimeException("Location not found with id " + toLocId));

            int qty = calculateReplenishmentQuantity(forecast);

            ReplenishmentOrder order = new ReplenishmentOrder();
            order.setProduct(forecast.getProduct());
            order.setFromLocation(from);

            order.setToLocation(to);
            order.setQuantity(qty);
            order.setStatus("CREATED");

        return orderRepository.save(order);
    }


    public String deleteReplenishmentOrder(Long id) throws Exception {
        ReplenishmentOrder order = findReplenishmentOrderById(id);
        orderRepository.delete(order);
        return "Replenishment order deleted successfully";
    }

    public ReplenishmentOrder findReplenishmentOrderById(Long id) throws Exception {

return orderRepository.findById(id)
                .orElseThrow(() -> new ReplenishmentOrderNotFoundException(id));

    }

    public List<ReplenishmentOrder> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public Page<ReplenishmentOrder> getAllOrdersWithPagination(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }
}