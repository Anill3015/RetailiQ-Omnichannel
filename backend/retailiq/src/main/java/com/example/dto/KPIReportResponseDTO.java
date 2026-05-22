package com.example.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.example.entity.KPIReport;

@JsonPropertyOrder({ "kpiReport", "message", "statusCode" })
public class KPIReportResponseDTO {

    private KPIReport kpiReport;
    private String message;
    private int statusCode;

    public KPIReport getKpiReport() {
        return kpiReport;
    }

    public void setKpiReport(KPIReport kpiReport) {
        this.kpiReport = kpiReport;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}
