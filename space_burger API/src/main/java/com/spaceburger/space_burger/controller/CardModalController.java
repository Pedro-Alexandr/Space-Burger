package com.spaceburger.space_burger.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.spaceburger.space_burger.entity.CardModal;
import com.spaceburger.space_burger.repository.CardModalRepository;

@RestController
@RequestMapping("/cardmodal")
@CrossOrigin(origins = "*")
public class CardModalController {

    @Autowired
    private CardModalRepository cardModalRepository;

    // Buscar CardModal + Complementos pelo ID do produto
    @GetMapping("/{produtoId}")
    public CardModal getCardModalPorProdutoId(@PathVariable Integer produtoId) {
        return cardModalRepository.findByProdutoId(produtoId);
    }
}
