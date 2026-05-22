package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    @Column
    private String name;

    @Column
    private String type;   // Store / DC

    @Column
    private String region;

    public Location() {
        super();
    }

    public Location(Long locationId, String name,
                    String type, String region) {
        this.locationId = locationId;
        this.name = name;
        this.type = type;
        this.region = region;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }    

    public void setType(String type) {
        this.type = type;
    }

    public String getRegion() {
        return region;
    }    

    public void setRegion(String region) {
        this.region = region;
    }

    @Override
    public String toString() {
        return "Location [" +
                "locationId=" + locationId +
                ", name=" + name +
                ", type=" + type +
                ", region=" + region +
                "]";
    }
}