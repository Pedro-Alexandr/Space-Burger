package com.spaceburger.space_burger.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "dia_semana")
public class DiaSemana {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Dia da semana é obrigatório.")
    @Column
    private String dia;

    @OneToMany(mappedBy = "dia")
    private Set<Promocao> promocoes;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public Set<Promocao> getPromocoes() {
        return promocoes;
    }

    public void setPromocoes(Set<Promocao> promocoes) {
        this.promocoes = promocoes;
    }

}
