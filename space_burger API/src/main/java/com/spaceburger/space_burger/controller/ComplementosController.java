package com.spaceburger.space_burger.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spaceburger.space_burger.entity.Complementos;
import com.spaceburger.space_burger.repository.ComplementosRepository;

@RestController
@RequestMapping("/complementos")
@CrossOrigin(origins = "*")
public class ComplementosController {

    @Autowired
    private ComplementosRepository complementosRepository;

    @GetMapping
    public ResponseEntity<List<Complementos>> listarTodos() {
        return ResponseEntity.ok(complementosRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complementos> buscarPorId(@PathVariable Integer id) {
        return complementosRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cardmodal/{cardModalId}")
    public ResponseEntity<List<Complementos>> listarPorCardModal(@PathVariable Integer cardModalId) {
        try {
            List<Complementos> lista = complementosRepository.findByCardModalId(cardModalId);
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            System.err.println("Erro ao buscar complementos: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Complementos> criar(@RequestBody Complementos complemento) {
        return ResponseEntity.ok(complementosRepository.save(complemento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Complementos> atualizar(@PathVariable Integer id, @RequestBody Complementos atualizado) {
        return complementosRepository.findById(id)
                .map(c -> {
                    c.setTitulo(atualizado.getTitulo());
                    c.setDescricao(atualizado.getDescricao());
                    c.setTipoItem(atualizado.getTipoItem());
                    c.setNomeItem(atualizado.getNomeItem());
                    c.setDescItem(atualizado.getDescItem());
                    c.setImagemItem(atualizado.getImagemItem());
                    c.setPrecoItem(atualizado.getPrecoItem());
                    c.setObrigatorio(atualizado.getObrigatorio());
                    c.setQtdMax(atualizado.getQtdMax());
                    return ResponseEntity.ok(complementosRepository.save(c));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Integer id) {
        if (complementosRepository.existsById(id)) {
            complementosRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
