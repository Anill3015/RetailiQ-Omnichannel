package com.example.exception;

public class RecommendationNotFoundException extends RuntimeException {

    public RecommendationNotFoundException(Long id) {
        super("Recommendation not found with id: " + id);
    }
}
