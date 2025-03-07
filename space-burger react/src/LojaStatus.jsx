import { useState, useEffect } from "react";
import styles from "./style/LojaStatus.module.css";
import { motion, AnimatePresence } from "framer-motion";

const horariosFuncionamento = {
  segunda: null, // Fechado
  terça: { abre: "17:59", fecha: "22:59" },
  quarta: { abre: "17:59", fecha: "22:59" },
  quinta: { abre: "17:59", fecha: "22:59" },
  sexta: { abre: "17:59", fecha: "22:59" },
  sabado: { abre: "17:59", fecha: "22:59" },
  domingo: { abre: "17:59", fecha: "22:59" },
};

function verificarHorario() {
  const diasSemana = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ];

  const agora = new Date();
  const diaAtual = diasSemana[agora.getDay()];
  const horaAtual = agora.getHours() * 60 + agora.getMinutes();

  const horario = horariosFuncionamento[diaAtual];

  if (!horario) {
    // Se estiver fechado, busca o próximo dia que a loja abrirá
    for (let i = 1; i < 7; i++) {
      const proximoDia = diasSemana[(agora.getDay() + i) % 7];
      if (horariosFuncionamento[proximoDia]) {
        return `Fechado. Abrimos ${proximoDia} às ${horariosFuncionamento[proximoDia].abre}`;
      }
    }
    return "Fechado";
  }

  const horaAbertura = parseInt(horario.abre.split(":")[0]) * 60 + parseInt(horario.abre.split(":")[1]);
  const horaFechamento = parseInt(horario.fecha.split(":")[0]) * 60 + parseInt(horario.fecha.split(":")[1]);

  if (horaAtual < horaAbertura) {
    return `Fechado. Abrimos às ${horario.abre}`;
  } else if (horaAtual >= horaAbertura && horaAtual < horaFechamento) {
    return `Aberto até às ${horario.fecha}`;
  } else {
    // Se já fechou, busca o próximo dia que abrirá
    for (let i = 1; i < 7; i++) {
      const proximoDia = diasSemana[(agora.getDay() + i) % 7];
      if (horariosFuncionamento[proximoDia]) {
        return `Fechado. Abrimos ${proximoDia} às ${horariosFuncionamento[proximoDia].abre}`;
      }
    }
    return "Fechado";
  }
}

function Modal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("sobre");
  const [isHoveredWpp, setIsHoveredWpp] = useState(false);
  const [isHoveredTel, setIsHoveredTel] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>SPACE BURGER</h3>
              <button className={styles.botaoFechar} onClick={onClose}>
                <img className={styles.closeIcon} src="./src/assets/favicons/close.svg" alt="Fechar" />
              </button>
            </div>

            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "sobre" ? styles.active : ""}`}
                onClick={() => setActiveTab("sobre")}
              >
                SOBRE
              </button>
              <button
                className={`${styles.tab} ${activeTab === "horario" ? styles.active : ""}`}
                onClick={() => setActiveTab("horario")}
              >
                HORÁRIO
              </button>
              <button
                className={`${styles.tab} ${activeTab === "pagamento" ? styles.active : ""}`}
                onClick={() => setActiveTab("pagamento")}
              >
                PAGAMENTO
              </button>
            </div>

            <hr className={styles.horiRule}></hr>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.tabContent}
              >
                {activeTab === "sobre" && (
                  <div className={styles.conteudoSobre}>
                    <div className={styles.sobreContent}>
                      <img className={styles.logo} src="./src/assets/spaceburger.jpg" alt="Logo" />

                      <div className={styles.texto}>
                        <p className={styles.texto}>Space Burger – Hambúrguer artesanal com sabor de outro mundo! 🚀🚀🚀</p>
                        <p className={styles.texto}>Delivery rápido e saboroso</p>
                        <p className={styles.texto}>trazendo o universo dos burgers diretamente até você!</p>
                        <p className={styles.texto}>Experimente nossas criações estelares sem sair de casa!</p>
                        <p className={styles.texto}>🚀🚀🚀🚀</p>
                        <a className={styles.instaLink} href="https://www.instagram.com/spaceburgerdf/" target="_blank" rel="noreferrer">
                          <img className={styles.instaIcon} src="./src/assets/favicons/insta-logo.svg" alt="Instagram" />
                          @spaceburgerdf
                        </a>
                      </div>

                      <div>
                        <hr className={styles.ruleInfo}></hr>

                        <h3 className={styles.infoText}>Contato</h3>

                        <div className={styles.contato}>
                        <a
                            className={styles.contatoItem}
                            href="https://web.whatsapp.com/send?phone=5561992918427"
                            onMouseEnter={() => setIsHoveredWpp(true)} // Atualiza o estado ao entrar no elemento
                            onMouseLeave={() => setIsHoveredWpp(false)} // Atualiza o estado ao sair do elemento
                          >
                            {isHoveredWpp ? (
                              <img
                                className={styles.contactIcon}
                                src="./src/assets/favicons/whatsapp-active.svg"
                                alt="Whatsapp"
                              />
                            ) : (
                              <img
                                className={styles.contactIcon}
                                src="./src/assets/favicons/whatsapp.svg"
                                alt="Whatsapp"
                              />
                            )}
                            Nosso Whatsapp
                          </a>
                          
                          <a
                            className={styles.contatoItem}
                            href="tel:(61) 992918427"
                            onMouseEnter={() => setIsHoveredTel(true)} // Atualiza o estado ao entrar no elemento
                            onMouseLeave={() => setIsHoveredTel(false)} // Atualiza o estado ao sair do elemento
                          >
                            {isHoveredTel? (
                              <img
                                className={styles.contactIcon}
                                src="./src/assets/favicons/phone-active.svg"
                                alt="Telefone"
                              />
                            ) : (
                              <img
                                className={styles.contactIcon}
                                src="./src/assets/favicons/phone.svg"
                                alt="Telefone"
                              />
                            )}
                            Nosso Telefone
                          </a>
                        </div>

                        <hr className={styles.ruleInfo}></hr>

                        <div className={styles.endereco}>
                          <h3 className={styles.infoText}>Endereço</h3>
                          <p className={styles.texto}>Lago Norte CA 5 Loja 93</p>
                          <p className={styles.texto}>Condomínio Edifício Solarium Center Conjunto D</p>
                          <p className={styles.texto}>Lago Norte</p>
                          <p className={styles.texto}>Brasília - DF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "horario" && (
                  <table className={styles.tabela}>
                    <tbody className={styles.tabelaBody}>
                      {Object.entries(horariosFuncionamento).map(([dia, horario]) => {
                        const agora = new Date();
                        const diasSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sabado"];
                        const diaAtual = diasSemana[agora.getDay()]; // Obtém o dia atual

                        return (
                          <tr key={dia} className={dia === diaAtual ? styles.hoje : ""}>
                            <td>{dia.charAt(0).toUpperCase() + dia.slice(1)}</td>
                            <td>
                              {horario ? `${horario.abre} - ${horario.fecha}` : "Fechado"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {activeTab === "pagamento" && (
                  <ul className={styles.listaPagamentos}>
                    <li>
                      <img className={styles.simpleIcon} src="./src/assets/favicons/pix.svg" alt="PIX" />
                      PIX
                    </li>
                    <li>
                      <img className={styles.simpleIcon} src="./src/assets/favicons/credit-card.svg" alt="Cartão de Crédito" />
                      Cartão de Crédito
                    </li>
                    <li>
                      <img className={styles.simpleIcon} src="./src/assets/favicons/credit-card.svg" alt="Cartão de Débito " />
                      Cartão de Débito
                    </li>
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LojaStatus() {
  const [status, setStatus] = useState(verificarHorario());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Cor = status.includes("Aberto") ? styles.aberto : styles.fechado;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(verificarHorario());
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const openModal = (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    setIsModalOpen(true);
    document.body.classList.add(styles.noScroll);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove(styles.noScroll);
  };

  return (
    <>
      <a className={styles.length} href="#" onClick={openModal}>
        <ul className={styles.container}>
          <a className={styles.item} href="#" onClick={(e) => e.preventDefault()}>
            <li className={Cor}>
              {status}
            </li>
          </a>
          <li>
            <a className={styles.item} href="#" onClick={(e) => e.preventDefault()}>
              <img className={styles.icon} src="./src/assets/favicons/map-pin.svg" alt="Local" /> Brasília - DF
            </a>
          </li>
          <li>
            <a className={styles.item2} href="#" onClick={(e) => e.preventDefault()}>
              Mais informações
            </a>
          </li>
        </ul>
      </a>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}