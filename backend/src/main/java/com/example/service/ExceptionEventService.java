package com.example.service;



import com.example.entity.ExceptionEvent;
import com.example.exception.ExceptionEventListEmptyException;
import com.example.exception.ExceptionEventNotFoundException;
import com.example.repository.ExceptionEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExceptionEventService {

    @Autowired
    private ExceptionEventRepository exceptionEventRepository;

    public ExceptionEvent save(ExceptionEvent event) {
    	event.setDetectedDate(LocalDate.now());
        return exceptionEventRepository.save(event);
    }

    public ExceptionEvent update(ExceptionEvent event) {

        ExceptionEvent existing = exceptionEventRepository.findById(event.getExceptionId())
                .orElseThrow(() -> new RuntimeException("Not found"));

        existing.setType(event.getType());
        existing.setReferenceId(event.getReferenceId());
        existing.setSeverity(event.getSeverity());
        existing.setStatus(event.getStatus());

        return exceptionEventRepository.save(existing);
    }


    public ExceptionEvent getById(Long id) {
        return exceptionEventRepository.findById(id).orElse(null);  
    }
    
    public List<ExceptionEvent> getAll() {
        List<ExceptionEvent> list = exceptionEventRepository.findAll();
        if (list.isEmpty()) {
            throw new ExceptionEventListEmptyException("No ExceptionEvents found");
        }
        return list;
    }
    
    public Page<ExceptionEvent> getExceptionEventsWithPagination(Pageable pageable) {
        return exceptionEventRepository.findAll(pageable);
    }

    public void delete(Long id) {

        if (!exceptionEventRepository.existsById(id)) {
            throw new RuntimeException("ExceptionEvent not found with id " + id);
        }

        exceptionEventRepository.deleteById(id);
    }
    
  
}