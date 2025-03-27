package com.spaceburger.space_burger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.DiaSemanaRepository;

@RestController
@RequestMapping("/api")
public class DiaSemanaController {

    private final DiaSemanaRepository diaSemanaRepository;

    public DiaSemanaController(DiaSemanaRepository diaSemanaRepository) {
        this.diaSemanaRepository = diaSemanaRepository;
    }

    @GetMapping("/dia_semana")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(diaSemanaRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("dia_semana/dia/{dia}")
    public ResponseEntity<?> getByDia(@PathVariable String dia) {
        return new ResponseEntity<>(diaSemanaRepository.findByDiaLike("%" + dia + "%"), HttpStatus.OK);
    }
}
