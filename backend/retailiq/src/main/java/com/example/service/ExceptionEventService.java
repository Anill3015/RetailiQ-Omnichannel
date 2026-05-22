package com.example.service;



import com.example.entity.ExceptionEvent;
import com.example.exception.ExceptionEventListEmptyException;
import com.example.exception.ExceptionEventNotFoundException;
import com.example.repository.ExceptionEventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class ExceptionEventService {

    @Autowired
    private ExceptionEventRepository exceptionEventRepository;

    public ExceptionEvent save(ExceptionEvent event) {
        return exceptionEventRepository.save(event);
    }

    public ExceptionEvent update(ExceptionEvent event) {
        return exceptionEventRepository.save(event);
    }

    public ExceptionEvent getById(Long id) {
        return exceptionEventRepository.findById(id)
            .orElseThrow(() ->
                new ExceptionEventNotFoundException(
                    "ExceptionEvent not found with id: " + id));
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

    public ExceptionEvent delete(Long id) {
        ExceptionEvent event = getById(id);
        if (event != null) {
            exceptionEventRepository.deleteById(id);
        }
        return event;
    }
    
  
}