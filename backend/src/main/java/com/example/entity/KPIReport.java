package com.example.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class KPIReport {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    private String scope;

    @Column(columnDefinition="TEXT")
    private String metrics;

    private LocalDateTime generatedDate;
    
    

	public KPIReport() {
		super();
	}

	public KPIReport(Long reportId, String scope, String metrics, LocalDateTime generatedDate) {
		super();
		this.reportId = reportId;
		this.scope = scope;
		this.metrics = metrics;
		this.generatedDate = generatedDate;
	}

	public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getMetrics() {
		return metrics;
	}

	public void setMetrics(String metrics) {
		this.metrics = metrics;
	}

	public LocalDateTime getGeneratedDate() {
		return generatedDate;
	}

	public void setGeneratedDate(LocalDateTime generatedDate) {
		this.generatedDate = generatedDate;
	}

	@Override
	public String toString() {
		return "KPIReport [reportId=" + reportId + ", scope=" + scope + ", metrics=" + metrics + ", generatedDate="
				+ generatedDate + "]";
	}

	
	
    // getters & setters
}
