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
@Table(name = "produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @NotBlank(message = "Nome do produto é obrigatório.")
    @Column(name = "nome")
    private String nome;

    @NotBlank(message = "Descrição do produto é obrigatório.")
    @Column(name = "descricao")
    private String descricao;

    @NotBlank(message = "Preço do produto é obrigatório.")
    @Column(name = "preco")
    private double preco;

    @NotBlank(message = "Imagem do produto é obrigatório.")
    @Column(name = "imagem")
    private String imagem;

    @ManyToOne
    @JoinColumn(name="categoria_id", referencedColumnName = "id")
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name="promocao_id", referencedColumnName = "id")
    private Promocao promocao;

    public String exibirDados() {
        return getId() + getNome() + getDescricao() + getPreco() + getImagem() + getCategoria() + getPromocao();
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Promocao getPromocao() {
        return promocao;
    }

    public void setPromocao(Promocao promocao) {
        this.promocao = promocao;
    }
}
