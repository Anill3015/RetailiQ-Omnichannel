package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.example.dto.KPIReportDTO;
import com.example.dto.KPIReportResponseDTO;
import com.example.entity.KPIReport;
import com.example.service.KPIReportService;

@RestController
@RequestMapping("/api")
public class KPIReportController {

    @Autowired
    private KPIReportService service;

    @PostMapping("/addKPIReport")
    public ResponseEntity<KPIReportResponseDTO> addKPIReport(
            @RequestBody KPIReportDTO dto) {

        KPIReport r = service.save(dto.getKpiReport());

        KPIReportResponseDTO res = new KPIReportResponseDTO();
        res.setKpiReport(r);
        res.setStatusCode(201);
        res.setMessage("KPI Report added successfully");

        return ResponseEntity.status(201).body(res);
    }

    @PostMapping("/updateKPIReport")
    public ResponseEntity<KPIReportResponseDTO> updateKPIReport(
            @RequestBody KPIReportDTO dto) {

        KPIReport r = service.update(dto.getKpiReport());

        KPIReportResponseDTO res = new KPIReportResponseDTO();
        res.setKpiReport(r);
        res.setStatusCode(201);
        res.setMessage("KPI Report updated successfully");

        return ResponseEntity.status(201).body(res);
    }

    @DeleteMapping("/deleteKPIReport")
    public String deleteKPIReport(@RequestBody KPIReport report) {
        service.delete(report.getReportId());
        return "KPI Report deleted successfully";
    }

    @GetMapping("/findKPIReport/{id}")
    public KPIReport findKPIReport(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/fetchAllKPIReports")
    public List<KPIReport> fetchAllKPIReports() {
        return service.getAll();
    }
    
    @GetMapping("/fetchAllKPIReportsPaginated")
    public Page<KPIReport> fetchAllKPIReportsPaginated(
            @RequestParam(name = "pgno") int pgno,
            @RequestParam(name = "size") int size,
            @RequestParam(name = "sorting") String sorting,
            @RequestParam(name = "asc") boolean asc) {
        Sort sort = asc
                ? Sort.by(sorting).ascending()
                : Sort.by(sorting).descending();
        Pageable pageable = PageRequest.of(pgno, size, sort);
        return this.service.getKPIReportsWithPagination(pageable);
    }

}
