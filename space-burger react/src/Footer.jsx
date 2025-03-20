import React from 'react';
import style from './style/Footer.module.css';
import { useMediaQuery } from "react-responsive";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const footerClass = isMobile ? style.mobileFooter : style.footer;
    const footerInfo = isMobile ? style.mobileFooterInfo : style.footerInfo;
    const footerSocial = isMobile ? style.mobileFooterSocial : style.footerSocial;
    const socialLinkClass = isMobile ? style.mobileSocialLink : style.socialLink;
    const socialImgClass = isMobile ? style.mobileSocialImg : style.socialImg;

    return (
        <footer className={footerClass}>
            <div className={footerInfo}>
                <p>Space Burger &copy; {currentYear}. Todos os direitos reservados.</p>
                <p>CNPJ: 49.376.582/0001-02</p>
                <p>Lago Norte CA 5 Loja 93, Condomínio Edifício Solarium Center Conjunto D, Lago Norte, Brasília/DF</p>
                <p>Entre em contato: (61) 99291-8427</p>
            </div>
            <div className={footerSocial}>
                <a className={socialLinkClass} href="https://wa.link/tk3rcq" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src="./src/assets/social icons/fb-icon.svg" alt="Facebook"></img>
                </a>
                <a className={style.socialLink} href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src="./src/assets/social icons/instagram-icon.svg" alt="Instagram"></img>
                </a>
                <a className={style.socialLink} href="https://twitter.com/" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src="./src/assets/social icons/xtwitter-icon.svg" alt="Twitter"></img>
                </a>
            </div>
        </footer>
    );
};

export default Footer;