package com.spaceburger.space_burger.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spaceburger.space_burger.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Integer> {

    @SuppressWarnings("null")
    @Override
    ArrayList<Categoria> findAll();
    
    ArrayList<Categoria> findByNomeLike(String nome);

}

