package com.example.service;


import com.example.entity.KPIReport;
import com.example.exception.KPIReportListEmptyException;
import com.example.exception.KPIReportNotFoundException;
import com.example.repository.KPIReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class KPIReportService {

    @Autowired
    private KPIReportRepository kpiReportRepository;

    public KPIReport save(KPIReport report) {
        return kpiReportRepository.save(report);
    }

    public KPIReport update(KPIReport report) {
        return kpiReportRepository.save(report);
    }

    public KPIReport getById(Long id) {
        return kpiReportRepository.findById(id)
            .orElseThrow(() ->
                new KPIReportNotFoundException(
                    "KPIReport not found with id: " + id));
    }

    public List<KPIReport> getAll() {
        List<KPIReport> list = kpiReportRepository.findAll();
        if (list.isEmpty()) {
            throw new KPIReportListEmptyException("No KPIReports found");
        }
        return list;
    }
    

    public Page<KPIReport> getKPIReportsWithPagination(Pageable pageable) {
        return this.kpiReportRepository.findAll(pageable);
    }


    public KPIReport delete(Long id) {
        KPIReport report = getById(id);
        if (report != null) {
            kpiReportRepository.deleteById(id);
        }
        return report;
    }
}