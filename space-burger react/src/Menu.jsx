import React from 'react';
import styles from './style/Menu.module.css';

export default function Menu() {

    return (
        <div className={styles.menu}>
            <div className={styles.imgMenu}>
                <img src='./src/assets/stock media/bg-tb.jpeg'></img>
            </div>

            <div className={styles.overlayMenu}></div>

            <div className={styles.overlayContentMenu}>
                <h1>Faça já seu pedido!</h1>
                <ul className={styles.categories}>
                    <li className={styles.catItem}><img src='./src/assets/stock media/category-list/comboBurger.webp'></img>COMBOS</li>
                    <li className={styles.catItem}><img src='./src/assets/stock media/category-list/acompanhamentos.webp'></img>ACOMPANHAMENTOS</li>
                    <li className={styles.catItem}><img src='./src/assets/stock media/category-list/mini-churros.png'></img>SOBREMESA</li>
                    <li className={styles.catItem}><img src='./src/assets/stock media/category-list/bebidas.jpg'></img>BEBIDAS</li>
                </ul>
            </div>
        </div>
    );
}