package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
        name = "product",
        uniqueConstraints = @UniqueConstraint(columnNames = "sku")
)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false, unique = true)
    private String sku;

    private String name;
    private String category;

    private String attributes;

    public Long getProductId()                      { return productId; }
    public void setProductId(Long productId)        { this.productId = productId; }

    public String getSku()                          { return sku; }
    public void setSku(String sku)                  { this.sku = sku; }

    public String getName()                         { return name; }
    public void setName(String name)                { this.name = name; }

    public String getCategory()                     { return category; }
    public void setCategory(String category)        { this.category = category; }

    public String getAttributes()                   { return attributes; }
    public void setAttributes(String attributes)    { this.attributes = attributes; }
}