package com.spaceburger.space_burger.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotBlank(message = "Inserir o nome é obrigatório.")
    @Column
    private String name;

    @NotBlank(message = "Inserir o endereço é obrigatório.")
    @Column
    private String address;

    @NotBlank(message = "Preço do produto é obrigatório.")
    @Column
    private double price;

    @NotBlank(message = "Imagem do produto é obrigatório.")
    @Column
    private String image;

    @ManyToOne
    @JoinColumn(name="categpry_id", referencedColumnName = "id")
    private Category category;

    public String exibirDados() {
        return getId() + getName() + getDescription() + getPrice() + getImage() + getCategory();
    }
}
