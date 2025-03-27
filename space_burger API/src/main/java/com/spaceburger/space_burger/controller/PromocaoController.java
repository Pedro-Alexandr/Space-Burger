package com.spaceburger.space_burger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.PromocaoRepository;

@RestController
@RequestMapping("/api")
public class PromocaoController {
    
    private final PromocaoRepository promocaoRepository;

    public PromocaoController(PromocaoRepository promocaoRepository) {
        this.promocaoRepository = promocaoRepository;
    }

    @GetMapping("/promocao")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(promocaoRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("promocao/nome/{nome}")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(promocaoRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }

    @GetMapping("promocao/dia_semana/{dia}")
    public ResponseEntity<?> getByDiaSemana(@PathVariable String dia) {
        return new ResponseEntity<>(promocaoRepository.findByDiaSemana_DiaContaining("%" + dia + "%"), HttpStatus.OK);
    }
}
