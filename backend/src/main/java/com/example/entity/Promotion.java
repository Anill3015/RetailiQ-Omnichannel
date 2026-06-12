package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "promotion")
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promotionId;

    private String name;

    @Column(name = "type")
    private String type;

    private String rules;
    private String validity;

    @ManyToOne
    @JoinColumn(name = "promotion_type_id")
    private PromotionType promotionType;

    public Long getPromotionId()                            { return promotionId; }
    public void setPromotionId(Long promotionId)            { this.promotionId = promotionId; }

    public String getName()                                 { return name; }
    public void setName(String name)                        { this.name = name; }

    public String getType()                                 { return type; }
    public void setType(String type)                        { this.type = type; }

    public String getRules()                                { return rules; }
    public void setRules(String rules)                      { this.rules = rules; }

    public String getValidity()                             { return validity; }
    public void setValidity(String validity)                { this.validity = validity; }

    public PromotionType getPromotionType()                 { return promotionType; }
    public void setPromotionType(PromotionType promotionType) { this.promotionType = promotionType; }
}