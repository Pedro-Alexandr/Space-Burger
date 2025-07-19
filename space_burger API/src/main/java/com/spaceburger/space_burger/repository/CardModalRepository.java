package com.spaceburger.space_burger.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spaceburger.space_burger.entity.CardModal;

@Repository
public interface CardModalRepository extends JpaRepository<CardModal, Integer> {
    CardModal findByProdutoId(Integer produtoId);
}