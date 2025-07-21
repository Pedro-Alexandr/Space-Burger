package com.spaceburger.space_burger.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spaceburger.space_burger.entity.Complementos;

@Repository
public interface ComplementosRepository extends JpaRepository<Complementos, Integer> {
    List<Complementos> findByCardModalId(Integer cardModalId);
}