package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "recommendation")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recId;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerProfile customer;

    @ElementCollection
    @CollectionTable(
            name = "recommendation_item",
            joinColumns = @JoinColumn(name = "rec_id")
    )
    @Column(name = "sku")
    private List<String> skuList;

    private LocalDateTime generatedAt;

    public Recommendation() {
        super();
    }

    public Recommendation(Long recId, CustomerProfile customer,
                          List<String> skuList, LocalDateTime generatedAt) {
        this.recId = recId;
        this.customer = customer;
        this.skuList = skuList;
        this.generatedAt = generatedAt;
    }

    public Long getRecId() { return recId; }
    public void setRecId(Long recId) { this.recId = recId; }

    public CustomerProfile getCustomer() { return customer; }
    public void setCustomer(CustomerProfile customer) { this.customer = customer; }

    public List<String> getSkuList() { return skuList; }
    public void setSkuList(List<String> skuList) { this.skuList = skuList; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

    @Override
    public String toString() {
        return "Recommendation [recId=" + recId +
                ", customerId=" + (customer != null ? customer.getCustomerId() : null) +
                ", skuList=" + skuList +
                ", generatedAt=" + generatedAt +
                "]";
    }
}