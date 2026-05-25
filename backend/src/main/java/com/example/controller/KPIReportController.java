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

    @PutMapping("/updateKPIReport/{id}")
    public ResponseEntity<KPIReportResponseDTO> updateKPIReport(
            @PathVariable("id") Long id,
            @RequestBody KPIReportDTO dto) {

        KPIReport report = dto.getKpiReport();
        report.setReportId(id);

        KPIReport updated = service.update(report);

        KPIReportResponseDTO res = new KPIReportResponseDTO();
        res.setKpiReport(updated);
        res.setStatusCode(200);
        res.setMessage("KPI Report updated successfully");

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/deleteKPIReport/{id}")
    public ResponseEntity<String> deleteKPIReport(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.ok("KPI Report deleted successfully");
    }

    @GetMapping("/findKPIReport/{id}")
    public ResponseEntity<?> findKPIReport(@PathVariable("id") Long id) {

        KPIReport report = service.getById(id);

        if (report != null) {

            KPIReportResponseDTO res = new KPIReportResponseDTO();
            res.setKpiReport(report);
            res.setStatusCode(200);
            res.setMessage("KPI Report found");

            return ResponseEntity.ok(res);

        } else {
            return ResponseEntity.status(404)
                    .body("KPI Report not found with id: " + id);
        }
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

        return service.getKPIReportsWithPagination(pageable);
    }
}
