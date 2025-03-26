import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style/PromoModal.module.css";

// Função para obter o dia da semana atual em português
const getDiaAtual = () => {
  const dias = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado"
  ];
  const hoje = new Date().getDay(); // 0-6
  return dias[hoje];
};

// Simulação de dados do banco de dados (substitua pela sua API real)
const carregarPromocoes = async () => {
  setLoading(true);
  const dia = getDiaAtual();
  setDiaAtual(dia.charAt(0).toUpperCase() + dia.slice(1));
  
  try {
    const response = await fetch(`/api/promocoes?dia=${dia}`);
    if (!response.ok) throw new Error("Erro na requisição");
    const promocoesDoDia = await response.json();
    setPromocoes(promocoesDoDia);
  } catch (error) {
    console.error("Erro ao carregar promoções:", error);
    setPromocoes([]);
  } finally {
    setLoading(false);
  }
};

const PromoModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diaAtual, setDiaAtual] = useState("");

  useEffect(() => {
    setIsMounted(true);
    
    if (location.hash === "#promocoes") {
      setIsOpen(true);
      carregarPromocoes();
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  }, [location]);

  const carregarPromocoes = async () => {
    setLoading(true);
    const dia = getDiaAtual();
    setDiaAtual(dia.charAt(0).toUpperCase() + dia.slice(1)); // Formatação do nome do dia
    
    try {
      // Simulando requisição à API
      const promocoesDoDia = promocoesPorDia[dia] || [];
      
      // Em um caso real, você faria:
      // const response = await fetch(`/api/promocoes?dia=${dia}`);
      // const promocoesDoDia = await response.json();
      
      setPromocoes(promocoesDoDia);
    } catch (error) {
      console.error("Erro ao carregar promoções:", error);
      setPromocoes([]);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/");
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Promoções de {diaAtual}</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  &times;
                </button>
              </div>
              
              <div className={styles.modalBody}>
                {loading ? (
                  <p>Carregando promoções...</p>
                ) : promocoes.length > 0 ? (
                  <div className={styles.promoCards}>
                    {promocoes.map(promo => (
                      <div key={promo.id} className={styles.promoCard}>
                        {promo.imagem && (
                          <img 
                            src={promo.imagem} 
                            alt={promo.titulo}
                            className={styles.promoImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <h3>{promo.titulo}</h3>
                        <p>{promo.descricao}</p>
                        {promo.regras && (
                          <div className={styles.promoRegras}>
                            <small>{promo.regras}</small>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.semPromocaoContainer}>
                    <p className={styles.semPromocao}>Hoje não temos promoções.</p>
                    <small>Volte em outros dias para conferir nossas ofertas!</small>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;