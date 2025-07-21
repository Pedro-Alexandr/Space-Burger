package com.spaceburger.space_burger.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spaceburger.space_burger.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Integer> {

    @SuppressWarnings("null")
    @Override
    ArrayList<Produto> findAll();

    ArrayList<Produto> findByNomeLike(String nome);

    ArrayList<Produto> findByCategoria_NomeContaining(String categoriaNome);

    ArrayList<Produto> findByCategoria_IdBetween(int Categoria_IdStart, int Categoria_IdEnd);

}
