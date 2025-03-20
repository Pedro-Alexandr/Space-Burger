package com.spaceburger.space_burger.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spaceburger.space_burger.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @SuppressWarnings("null")
    @Override
    ArrayList<Pedido> findAll();

    ArrayList<Pedido> findByPedidoLike(String pedido);

    @Query("SELECT p FROM Pedido p WHERE p.data BETWEEN :start AND :end")
    ArrayList<Pedido> findByIntervaloDeDatas(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    ArrayList<Pedido> findByTipoPagamentoLike(String tipoPagamento);

    ArrayList<Pedido> findByUsuario_NomeContaining(String usuarioNome);

    ArrayList<Pedido> findByUsuario_IdBetween(int Usuario_IdStart, int Usuario_IdEnd);

    ArrayList<Pedido> findByStatusLike(String status);

}