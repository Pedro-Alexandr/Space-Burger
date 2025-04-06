import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style/PromoModal.module.css";
import Api from './Api.jsx';

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

const PromoModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [promocoes, setPromocoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diaAtual, setDiaAtual] = useState("");
  const [error, setError] = useState(null);

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
    setError(null);
    const dia = getDiaAtual();
    setDiaAtual(dia.charAt(0).toUpperCase() + dia.slice(1));
    
    try {
      // Chamada com Axios
      const response = await Api.get(`/promocoes/dia_semana?dia=${dia}`);
      
      // Verifica se a resposta tem dados válidos
      if (response.data && Array.isArray(response.data)) {
        setPromocoes(response.data);
      } else {
        throw new Error("Formato de dados inválido");
      }
    } catch (err) {
      console.error("Erro ao carregar promoções:", err);
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
                ) : error ? (
                  <p className={styles.errorMessage}>{error}</p>
                ) : promocoes.length > 0 ? (
                  <div className={styles.promoCards}>
                    {promocoes.map(promo => (
                      <div key={promo.id} className={styles.promoCard}>
                        {promo.imagem && (
                          <img 
                            src={promo.imagem} 
                            alt={promo.nome}
                            className={styles.promoImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        )}
                        <h3>{promo.nome}</h3>
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