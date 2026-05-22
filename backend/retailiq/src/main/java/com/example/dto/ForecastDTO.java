package com.example.dto;

import com.example.entity.Forecast;

public class ForecastDTO {

    private Forecast forecast;

    public Forecast getForecast() {
        return forecast;
    }
    public void setForecast(Forecast forecast) {
        this.forecast = forecast;
    }
}