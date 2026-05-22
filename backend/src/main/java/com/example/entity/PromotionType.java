package com.example.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
public class PromotionType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promotionTypeId;

    private String name;

    @OneToMany(mappedBy = "promotionType")
    @JsonIgnore
    private List<Promotion> promotions;

    public Long getPromotionTypeId() {
        return promotionTypeId;
    }

    public void setPromotionTypeId(Long promotionTypeId) {
        this.promotionTypeId = promotionTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}