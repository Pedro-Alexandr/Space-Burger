import React, { useEffect, useState } from 'react';
import Api from './Api.jsx';
import styles from './style/Catalog.module.css';
import Bag from './Bag.jsx';
import ProdutoModal from './ProdutoModal.jsx';

// Função para gerar IDs válidos a partir do nome da categoria
function formatarId(nome) {
    return nome
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

const Catalog = () => {
    const [categorias, setCategorias] = useState([]);
    const [modalProduto, setModalProduto] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);

    const carregarProdutos = async () => {
        try {
            const responseCat = await Api.get(`/categoria`);

            if (Array.isArray(responseCat.data)) {
                const categoriasValidas = responseCat.data.filter(
                    (categoria) =>
                        (categoria.produtos && categoria.produtos.length > 0) ||
                        (categoria.promocoes && categoria.promocoes.length > 0)
                );
                setCategorias(categoriasValidas);
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

    const abrirModalProduto = async (produto) => {
        try {
            const res = await Api.get(`/cardmodal/${produto.id}`); // ajuste o endpoint conforme seu backend
            const dadosModal = res.data;
            setModalProduto({ ...produto, ...dadosModal });
            setModalAberto(true);
        } catch (err) {
            console.error("Erro ao carregar dados do produto:", err);
        }
    };

    return (
        <div className={styles.catalogContainer}>
            <div className={styles.cardsContainer}>
                {categorias.map((categoria) => (
                    <div
                        key={categoria.id}
                        id={formatarId(categoria.nome)}
                        className={styles.categoriaSection}
                    >
                        <h2 className={styles.categoriaTitulo}>{categoria.nome}</h2>
                        <p className={styles.categoriaDesc}>{categoria.descricao}</p>

                        <div className={styles.prodCards}>
                            {(categoria.produtos || categoria.promocoes)?.map((item) => {
                                const isPromocao = categoria.promocoes?.some((promo) => promo.id === item.id);

                                return (
                                    <div
                                        key={item.id}
                                        className={styles.prodCard}
                                        onClick={() => abrirModalProduto(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={styles.prodInfo}>
                                            <h3>{item.nome}</h3>
                                            <p className={styles.truncateDescription}>{item.descricao}</p>

                                            {isPromocao ? (
                                                <div className={styles.preco}>
                                                    <p className={styles.precoDesconto}>
                                                        R$ {item.valorDesconto?.toLocaleString('pt-BR', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                    <p className={styles.precoPadrao}>
                                                        R$ {item.valorPadrao?.toLocaleString('pt-BR', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                </div>
                                            ) : (
                                                item.preco > 0 && (
                                                    <p className={styles.preco}>
                                                        R$ {item.preco?.toLocaleString('pt-BR', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                )
                                            )}
                                        </div>

                                        <div className={styles.prodImageWrapper}>
                                            {item.imagem && (
                                                <img
                                                    src={item.imagem}
                                                    alt={item.nome}
                                                    className={styles.prodImage}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.bagContainer}>
                <Bag />
            </div>

            {modalAberto && (
                <ProdutoModal
                    produto={modalProduto}
                    onClose={() => setModalAberto(false)}
                />
            )}
        </div>
    );
};

export default Catalog;
