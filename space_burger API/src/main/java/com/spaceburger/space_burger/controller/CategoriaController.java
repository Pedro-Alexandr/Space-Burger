package com.spaceburger.space_burger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.CategoriaRepository;

@RestController
public class CategoriaController {

    private final CategoriaRepository categoriaRepository;

    public CategoriaController(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @GetMapping("/categoria")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(categoriaRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("categoria/nome/{nome}")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(categoriaRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }
}
