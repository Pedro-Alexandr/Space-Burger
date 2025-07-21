package com.spaceburger.space_burger.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spaceburger.space_burger.entity.Promocao;

public interface PromocaoRepository extends JpaRepository<Promocao, Integer> {

    
    @SuppressWarnings("null")
    @Override
    ArrayList<Promocao> findAll();
    
    ArrayList<Promocao> findByNomeLike(String nome); 
    
    @Query("SELECT p FROM Promocao p WHERE p.diaSemana.dia = :dia")
    ArrayList<Promocao> findByDiaSemanaDia(@Param("dia") String dia);

    List<Promocao> findByDiaSemana_Id(int id);

}

