package com.example.controller;

import com.example.dto.InventoryPositionRequestDTO;
import com.example.dto.InventoryPositionResponseDTO;
import com.example.service.InventoryPositionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryPositionController {

    private InventoryPositionService service;

    public InventoryPositionController(InventoryPositionService service) {

        this.service = service;
    }

    @PostMapping("/create")
    public InventoryPositionResponseDTO create(@RequestBody InventoryPositionRequestDTO dto){
        return service.create(dto);
    }


    @GetMapping("/{id}")
    public InventoryPositionResponseDTO getById(@PathVariable int id) {

        return service.getById(id);
    }

    @GetMapping("/getAll")
    public Page<InventoryPositionResponseDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.getAll(page, size);
    }

    @PutMapping("/{id}")
    public InventoryPositionResponseDTO update(
            @PathVariable int id,
            @RequestBody InventoryPositionRequestDTO dto) {
        return service.update(id, dto);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }


}
