package com.spaceburger.space_burger.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spaceburger.space_burger.entity.Promocao;

public interface PromocaoRepository extends JpaRepository<Promocao, Integer> {

    
    @SuppressWarnings("null")
    @Override
    ArrayList<Promocao> findAll();
    
    ArrayList<Promocao> findByNomeLike(String nome); 

}
