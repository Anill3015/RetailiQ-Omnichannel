package com.example.service;


import com.example.entity.ReturnAuthorization;
import com.example.exception.ReturnAuthorizationListEmptyException;
import com.example.exception.ReturnAuthorizationNotFoundException;
import com.example.repository.ReturnAuthorizationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ReturnAuthorizationService {

    @Autowired
    private ReturnAuthorizationRepository returnAuthorizationRepository;

    public ReturnAuthorization save(ReturnAuthorization rma) {
        return returnAuthorizationRepository.save(rma);
    }
    public ReturnAuthorization update(ReturnAuthorization rma) {
        return returnAuthorizationRepository.save(rma);
    }

    public ReturnAuthorization getById(Long id) {
        return returnAuthorizationRepository.findById(id)
            .orElseThrow(() ->
                new ReturnAuthorizationNotFoundException(
                    "ReturnAuthorization not found with id: " + id));
    }

    public List<ReturnAuthorization> getAll() {
        List<ReturnAuthorization> list = returnAuthorizationRepository.findAll();
        if (list.isEmpty()) {
            throw new ReturnAuthorizationListEmptyException(
                "No ReturnAuthorizations found");
        }
        return list;
    }
    
    

    public Page<ReturnAuthorization> getReturnAuthorizationsWithPagination(Pageable pageable) {
        return this.returnAuthorizationRepository.findAll(pageable);
    }


    public ReturnAuthorization delete(Long id) {
        ReturnAuthorization rma = getById(id);
        if (rma != null) {
            returnAuthorizationRepository.deleteById(id);
        }
        return rma;
    }
}
