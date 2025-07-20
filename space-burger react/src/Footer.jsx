import React from 'react';
import style from './style/Footer.module.css';
import { useMediaQuery } from "react-responsive";
import whatsappIcon from './src/assets/favicons/whatsapp-active.svg';
import instagramIcon from './src/assets/favicons/instagram-icon.svg';
import phoneIcon from './src/assets/favicons/phone-active.svg';

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
                <a className={style.socialLink} href="tel:(61) 992918427" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src={whatsappIcon} alt="Telefone"></img>
                </a>

                <a className={style.socialLink} href="https://www.instagram.com/spaceburgerdf/" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src={instagramIcon} alt="Instagram"></img>
                </a>

                <a className={socialLinkClass} href="https://web.whatsapp.com/send?phone=5561992918427" target="_blank" rel="noreferrer">
                    <img className={socialImgClass} src={phoneIcon} alt="Whatsapp"></img>
                </a>
            </div>
        </footer>
    );
};

export default Footer;