import React, { useState } from 'react';
import styles from './style/Header.module.css';

function Header() {
    const [activeLink, setActiveLink] = useState('home');

    const handleNavClick = (link) => {
        setActiveLink(link);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.containerFluid}>
                    <a className={styles.navbarBrand} href="#"><img src="./src/assets/spaceburger.jpg" width="84px" height="84px" alt="Space Burger"></img></a>
                    <ul className={styles.navbarNav}>
                        <div className={styles.navbarPadding}>
                            <li className={styles.navItem}>
                                <a
                                    className={`${styles.navLink} ${activeLink === 'home' ? styles.navActive : ''}`}
                                    aria-current="page"
                                    href="#"
                                    onClick={() => handleNavClick('home')}
                                >
                                    <img src={activeLink === 'home' ? "./src/assets/favicons/home icon active.svg" : "./src/assets/favicons/home icon.svg"} width="24px" height="24px" alt="Home"></img>Início
                                </a>
                            </li>
                            <li className={styles.navItem}>
                                <a
                                    className={`${styles.navLink} ${activeLink === 'promocoes' ? styles.navActive : ''}`}
                                    href="#"
                                    onClick={() => handleNavClick('promocoes')}
                                >
                                    <img src={activeLink === 'promocoes' ? "./src/assets/favicons/sale icon active.svg" : "./src/assets/favicons/sale icon.svg"} width="24px" height="24px" alt="Promoções"></img>Promoções
                                </a>
                            </li>
                            <li className={styles.navItem}>
                                <a
                                    className={`${styles.navLink} ${activeLink === 'pedidos' ? styles.navActive : ''}`}
                                    href="#"
                                    onClick={() => handleNavClick('pedidos')}
                                >
                                    <img src={activeLink === 'pedidos' ? "./src/assets/favicons/bag-check icon active.svg" : "./src/assets/favicons/bag-check icon.svg"} width="24px" height="24px" alt="Pedidos"></img>Pedidos
                                </a>
                            </li>
                            <li className={styles.navItem}>
                                <a
                                    className={`${styles.navLink} ${activeLink === 'entcad' ? styles.navActive : ''}`}
                                    href="#"
                                    onClick={() => handleNavClick('entcad')}
                                >
                                    <img src={activeLink === 'entcad' ? "./src/assets/favicons/user icon active.svg" : "./src/assets/favicons/user icon.svg"} width="24px" height="24px" alt="Entrar/Cadastrar"></img>Entrar/Cadastrar
                                </a>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;