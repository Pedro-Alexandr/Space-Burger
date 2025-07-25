import React from 'react';
import styles from './style/Bag.module.css';
import bagIcon from './assets/favicons/bag-noitem.svg';

function Bag() {

    return (
        <div className={styles.container}>
            <h1 className={styles.containerHeader}>Carrinho de Compras</h1>
                <img src={bagIcon} className={styles.containerBodyImg}></img>
                <p className={styles.containerBody}>Sacola vazia</p>
                <div className={styles.containerFooter}>
                <button className={styles.containerFtButton}>Sacola vazia</button>
                </div>
        </div>
    );
}

export default Bag;