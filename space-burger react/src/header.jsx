import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './style/Header.module.css';
import logo from './src/assets/spaceburger.jpg';
import homeActive from './src/assets/favicons/home icon active.svg';
import homeIcon from './src/assets/favicons/home icon.svg';
import saleActive from './src/assets/favicons/sale icon active.svg';
import saleIcon from './src/assets/favicons/sale icon.svg';
import bagCheckActive from './src/assets/favicons/bag-check icon active.svg';
import bagCheckIcon from './src/assets/favicons/bag-check icon.svg';
import userActive from './src/assets/favicons/user icon active.svg';
import userIcon from './src/assets/favicons/user icon.svg';

function Header() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/#promocoes') {
            return location.hash === '#promocoes';
        }
        if (path === '/') {
            return location.pathname === '/' && location.hash !== '#promocoes' && location.hash !== '#entcad';
        }
        if (path === '/#entcad') {
            return location.hash === '#entcad';
        }
        if (path === '/pedidos') {
            return location.pathname === '/pedidos' || location.pathname === '';
        }
        return location.pathname === path;
    };
    
    

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.containerFluid}>
                    <a className={styles.navbarBrand} href="#"><img src={logo} width="84px" height="84px" alt="Space Burger"></img></a>
                    <ul className={styles.navbarNav}>
                        <div className={styles.navbarPadding}>
                            <li className={styles.navItem}>
                                <Link
                                    to="/"
                                    className={`${styles.navLink} ${isActive('/') ? styles.navActive : ''}`}
                                    aria-current="page"
                                >
                                    <img src={isActive('/') ? homeActive : homeIcon} width="24px" height="24px" alt="Home"></img>Início
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link
                                    to="/#promocoes"
                                    className={`${styles.navLink} ${isActive('/#promocoes') ? styles.navActive : ''}`}
                                >
                                    <img src={isActive('/#promocoes') ? saleActive : saleIcon} width="24px" height="24px" alt="Promoções"></img>Promoções
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link
                                    to="/pedidos"
                                    className={`${styles.navLink} ${isActive('/pedidos') ? styles.navActive : ''}`}
                                >
                                    <img src={isActive('/pedidos') ? bagCheckActive : bagCheckIcon} width="24px" height="24px" alt="Pedidos"></img>Pedidos
                                </Link>
                            </li>
                            <li className={styles.navItem}>
                                <Link
                                    to="/#entcad"
                                    className={`${styles.navLink} ${isActive('/#entcad') ? styles.navActive : ''}`}
                                >
                                    <img src={isActive('/#entcad') ? userActive : userIcon} width="24px" height="24px" alt="Entrar/Cadastrar"></img>Entrar/Cadastrar
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
