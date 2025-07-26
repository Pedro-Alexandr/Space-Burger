package com.spaceburger.space_burger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.repository.ProdutoRepository;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    private final ProdutoRepository produtoRepository;

    public ProdutoController(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<>(produtoRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<?> getByNome(@PathVariable String nome) {
        return new ResponseEntity<>(produtoRepository.findByNomeLike("%" + nome + "%"), HttpStatus.OK);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<?> getByCategoria(@PathVariable String categoriaNome) {
        return new ResponseEntity<>(produtoRepository.findByCategoria_NomeContaining("%" + categoriaNome + "%"), HttpStatus.OK);
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<?> getByCategoria(@PathVariable int categoria_IdStart , @PathVariable int categoria_IdEnd) {
        return new ResponseEntity<>(produtoRepository.findByCategoria_IdBetween(categoria_IdStart, categoria_IdEnd), HttpStatus.OK);
    }
}
