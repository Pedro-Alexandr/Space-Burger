package com.spaceburger.space_burger.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spaceburger.space_burger.entity.Pedido;
import com.spaceburger.space_burger.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @SuppressWarnings("null")
    @Override
    ArrayList<Usuario> findAll();

    ArrayList<Usuario> findByNomeLike(String nome);

    ArrayList<Usuario> findByEmailLike(String email);

    ArrayList<Pedido> findByTelefone(Integer telefone); // Busca exata

    ArrayList<Pedido> findByTelefoneGreaterThan(Integer telefone); // Maior que

    ArrayList<Pedido> findByTelefoneLessThan(Integer telefone); // Menor que

}
