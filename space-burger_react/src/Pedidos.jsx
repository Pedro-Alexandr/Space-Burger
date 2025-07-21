import React from 'react';
import styles from './style/Pedidos.module.css';
import magnifier from './assets/favicons/magnifier.svg';

const Pedidos = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
            <h1>Seus pedidos</h1>
            </div>
            <img 
                src={magnifier}
                alt="Pedido não encontrado" 
                className={styles.magnifier}
            />
            <div className={styles.textContainer}>
            <p>Nenhum pedido encontrado. Seus pedidos ficarão aqui.</p>
            </div>
        </div>
    );
};

export default Pedidos;