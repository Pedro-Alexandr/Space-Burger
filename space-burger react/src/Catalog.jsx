import React, { useEffect, useState } from 'react';
import Api from './Api.jsx';
import styles from './style/Catalog.module.css';

const Catalog = () => {
    const [categorias, setCategorias] = useState([]);

    const carregarProdutos = async () => {
        try {
            const responseCat = await Api.get(`/categoria`);

            if (Array.isArray(responseCat.data)) {
                // Filtra categorias que possuem pelo menos 1 produto
                const categoriasComProdutos = responseCat.data.filter(
                    (categoria) => categoria.produtos && categoria.produtos.length > 0
                );
                setCategorias(categoriasComProdutos);
            } else {
                throw new Error("Formato de dados inválido");
            }
        } catch (err) {
            console.error("Erro ao carregar Produtos ou Categorias:", err);
            setCategorias([]);
        }
    };

    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
        <div className={styles.catalogContainer}>
            {categorias.map((categoria) => (
                <div key={categoria.id} className={styles.categoriaSection}>
                    <h2 className={styles.categoriaTitulo}>{categoria.nome}</h2>
                    <p className={styles.categoriaDesc}>{categoria.descricao}</p>
                    <div className={styles.prodCards}>
                        {categoria.produtos.map((prod) => (
                            <div key={prod.id} className={styles.prodCard}>
                                {prod.imagem && (
                                    <img
                                        src={prod.imagem}
                                        alt={prod.nome}
                                        className={styles.prodImage}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                )}
                                <h3>{prod.nome}</h3>
                                <p>{prod.descricao}</p>
                                {prod.preco > 0 && (
                                    <p>
                                        R$ {prod.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Catalog;
