package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.CustomerProfile;

public interface CustomerProfileRepository
        extends JpaRepository<CustomerProfile, Long> {
}
