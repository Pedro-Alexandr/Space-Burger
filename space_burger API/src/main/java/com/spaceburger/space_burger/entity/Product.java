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
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotBlank(message = "Nome do produto é obrigatório.")
    @Column
    private String name;

    @NotBlank(message = "Descrição do produto é obrigatório.")
    @Column
    private String description;

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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
