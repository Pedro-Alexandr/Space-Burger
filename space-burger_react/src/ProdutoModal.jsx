import styles from './style/ProdutoModal.module.css';

const ProdutoModal = ({ produto, onClose }) => {
    if (!produto) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeBtn}>✖</button>
                
                <h2>{produto.nome}</h2>
                <p>{produto.descricao}</p>

                {produto.imagem && (
                    <img src={produto.imagem} alt={produto.nome} className={styles.produtoImagem} />
                )}

                <p><strong>Observações:</strong> {produto.observacoes || 'Nenhuma observação.'}</p>

                {produto.complementos && produto.complementos.length > 0 && (
                    <div>
                        <h3>Complementos</h3>
                        {produto.complementos.map((comp) => (
                            <div key={comp.id} className={styles.complemento}>
                                <strong>{comp.nomeItem}</strong> - R$ {comp.precoItem.toFixed(2)} <br />
                                <small>{comp.descItem}</small>
                            </div>
                        ))}
                    </div>
                )}

                <button className={styles.addToCartBtn}>Adicionar ao Carrinho</button>
            </div>
        </div>
    );
};

export default ProdutoModal;
