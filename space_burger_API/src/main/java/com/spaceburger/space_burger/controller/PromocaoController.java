package com.spaceburger.space_burger.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.entity.Promocao;
import com.spaceburger.space_burger.repository.PromocaoRepository;

@RestController
@RequestMapping("/promocoes")
public class PromocaoController {
    
    private final PromocaoRepository promocaoRepository;

    public PromocaoController(PromocaoRepository promocaoRepository) {
        this.promocaoRepository = promocaoRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(promocaoRepository.findAll(), HttpStatus.OK);
    }
    
    @GetMapping("/nome")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(promocaoRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }

    @GetMapping("/dia_semana")
    public ResponseEntity<?> getByDiaSemana(@RequestParam String dia) {
        try {
            ArrayList<Promocao> promocoes = promocaoRepository.findByDiaSemanaDia(dia);
            
            if (promocoes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                       .body("Nenhuma promoção encontrada para " + dia);
            }
            
            return ResponseEntity.ok(promocoes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                   .body("Erro ao buscar promoções: " + e.getMessage());
    }
}
}
