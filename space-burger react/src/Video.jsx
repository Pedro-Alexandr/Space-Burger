import React from 'react';
import burgerFootage from './assets/stock media/burger-footage.mp4';
import styles from './style/Video.module.css';

export default function Video() {
  
  return (
    <div>
      <div className={styles.videoContainer}>
        <video className={styles.video} loop autoPlay muted>
          <source src={burgerFootage} type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        {/* Camada escura */}
        <div className={styles.overlay}></div>

        {/* Conteúdo sobreposto */}
        <div className={styles.overlayContent}>
          <h1>Sabor de outro mundo! 🧑‍🚀🍔🚀</h1>
          <p>Trazendo o universo dos burgers diretamente até você!</p>
        </div>
      </div>
    </div>
  );
}
