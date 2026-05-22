package com.example.controller;
import com.example.dto.FulfillmentInstructionRequestDTO;
import com.example.dto.FulfillmentInstructionResponseDTO;
import com.example.service.FulfillmentInstructionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fulfillments")
public class FulfillmentInstructionController {

    private final FulfillmentInstructionService service;

    public FulfillmentInstructionController(FulfillmentInstructionService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public FulfillmentInstructionResponseDTO create(
            @RequestBody FulfillmentInstructionRequestDTO dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public FulfillmentInstructionResponseDTO getById(
            @PathVariable int id) {
        return service.getById(id);
    }

    @GetMapping("/getAll")
    public Page<FulfillmentInstructionResponseDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.getAll(page, size);
    }

    @PutMapping("/{id}")
    public FulfillmentInstructionResponseDTO update(
            @PathVariable int id,
            @RequestBody FulfillmentInstructionRequestDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}


