package com.example.exception;

public class ForecastNotFoundException extends RuntimeException {

    public ForecastNotFoundException(Long id) {
        super("Forecast not found with id: " + id);
    }
}