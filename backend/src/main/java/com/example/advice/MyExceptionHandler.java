package com.example.advice;

import com.example.exception.UserNotFoundException;
import com.example.exception.ListEmptyException;
import com.example.exception.CustomerProfileNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class MyExceptionHandler {

    // ✅ USER NOT FOUND (404)
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFoundException(UserNotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        error.put("status", "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // ✅ LIST EMPTY (404)
    @ExceptionHandler(ListEmptyException.class)
    public ResponseEntity<Map<String, String>> handleListEmptyException(ListEmptyException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        error.put("status", "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // ✅ ✅ CUSTOMER NOT FOUND (FIX ADDED)
    @ExceptionHandler(CustomerProfileNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleCustomerNotFound(CustomerProfileNotFoundException ex) {
        Map<String, String>error = new HashMap<>();
        error.put("error", ex.getMessage());
        error.put("status", "404");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    // ✅ RUNTIME EXCEPTION (400)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        error.put("status", "400");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    // ✅ GENERAL EXCEPTION (500 - better practice)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(Exception ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Internal Server Error ❌");
        error.put("status", "500");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}

