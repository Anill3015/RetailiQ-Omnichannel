package com.example.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.dto.ErrorResponse;
import com.example.exception.*;

@RestControllerAdvice
public class MyExceptionHandler {

    private ResponseEntity<ErrorResponse> buildResponse(
            int status, String message) {

        ErrorResponse response = new ErrorResponse();
        response.setHttpStatusCode(status);
        response.setErrormessage(message);
        return ResponseEntity.status(status).body(response);
    }

    @ExceptionHandler(ExceptionEventNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleExceptionEventNotFound(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }

    @ExceptionHandler(ExceptionEventListEmptyException.class)
    public ResponseEntity<ErrorResponse> handleExceptionEventListEmpty(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }

    @ExceptionHandler(ReturnAuthorizationNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleReturnAuthNotFound(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }

    @ExceptionHandler(ReturnAuthorizationListEmptyException.class)
    public ResponseEntity<ErrorResponse> handleReturnAuthListEmpty(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }

    @ExceptionHandler(KPIReportNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleKPIReportNotFound(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }

    @ExceptionHandler(KPIReportListEmptyException.class)
    public ResponseEntity<ErrorResponse> handleKPIReportListEmpty(
            Exception e) {
        return buildResponse(404, e.getMessage());
    }
}