package com.spaceburger.space_burger.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spaceburger.space_burger.entity.DiaSemana;

public interface DiaSemanaRepository extends JpaRepository<DiaSemana, Integer> {

    @SuppressWarnings("null")
    @Override
    ArrayList<DiaSemana> findAll();
    
    ArrayList<DiaSemana> findByDiaLike(String dia);

}

