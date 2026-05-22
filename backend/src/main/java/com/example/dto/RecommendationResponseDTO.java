package com.example.dto;

import com.example.entity.Recommendation;

public class RecommendationResponseDTO {

        private Recommendation recommendation;
        private int statusCode;
        private String message;

        public Recommendation getRecommendation() {
            return recommendation;
        }

        public void setRecommendation(Recommendation recommendation) {
            this.recommendation = recommendation;
        }

        public int getStatusCode() {
            return statusCode;
        }

        public void setStatusCode(int statusCode) {
            this.statusCode = statusCode;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

