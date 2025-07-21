import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./style/Carousel.module.css";
import maisVendidos from "./assets/stock media/carousel/maisVendidos.jpeg";
import smash from "./assets/stock media/carousel/smash.jpeg";
import burger150 from "./assets/stock media/carousel/burger150.webp";
import acomp from "./assets/stock media/carousel/acomp.jpg";

// Mapeamento dos títulos dos slides para nomes de categoria do banco
const titleToCategoryMap = {
    "OS MAIS VENDIDOS DA SPACE": "os-mais-vendidos-da-space",
    "COMBOS SMASH": "smash-burger-120g",
    "COMBOS BURGER 150G": "burgers-150g",
    "ACOMPANHAMENTOS": "acompanhamentos"
};

const items = [
    {
        id: 1,
        title: "OS MAIS VENDIDOS DA SPACE",
        description: "Aqui você encontra os queridinhos da galera! Uma seleção dos mais vendidos da Space!",
        image: { src: maisVendidos, alt: "Os Mais Vendidos da Space" },
    },
    {
        id: 2,
        title: "COMBOS SMASH",
        description: "Escolha seu Smash Burger preferido com porção e bebida à sua escolha!",
        image: { src: smash, alt: "Combos Smash" },
    },
    {
        id: 3,
        title: "COMBOS BURGER 150G",
        description: "Escolha seu Burger preferido com porção e bebida à sua escolha!",
        image: { src: burger150, alt: "Combos Burger 150G" },
    },
    {
        id: 4,
        title: "ACOMPANHAMENTOS",
        description: "Aqui você escolhe o seu acompanhamento preferido! Temos porção de batatas, nuggets, onion rings (cebola empanada) ou mini coxinhas.",
        image: { src: acomp, alt: "Acompanhamentos" },
    },
];

const Carousel = () => {
    const [index, setIndex] = useState(1);
    const [transition, setTransition] = useState(true);
    const [dragStartX, setDragStartX] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef(null);

    const fullSlides = [items[items.length - 1], ...items, items[0]];

    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (index === 0) {
            setTimeout(() => {
                setTransition(false);
                setIndex(items.length);
            }, 300);
        } else if (index === items.length + 1) {
            setTimeout(() => {
                setTransition(false);
                setIndex(1);
            }, 300);
        } else {
            setTransition(true);
        }
    }, [index]);

    const startAutoPlay = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 5000);
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setIndex((prev) => prev + 1);
        setTimeout(() => setIsTransitioning(false), 600);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setIndex((prev) => prev - 1);
        setTimeout(() => setIsTransitioning(false), 600);
    };

    const handleTouchStart = (e) => {
        setDragStartX(e.touches[0].clientX);
        setIsDragging(true);
        clearInterval(intervalRef.current);
        setTransition(false);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const touchX = e.touches[0].clientX;
        const offset = touchX - dragStartX;
        setDragOffset(offset);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setTransition(true);

        if (dragOffset > 100) {
            handlePrev();
        } else if (dragOffset < -100) {
            handleNext();
        }

        setDragOffset(0);
        startAutoPlay();
    };

    const handleClickPeçaAqui = (title) => {
        const targetId = titleToCategoryMap[title];
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            className={styles.carousel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className={styles.slider}
                style={{
                    transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
                    transition: transition ? 'transform 0.5s ease' : 'none',
                }}
            >
                {fullSlides.map((item, i) => (
                    <div className={styles.slide} key={i}>
                        <img src={item.image} alt={item.title} className={styles.image} />
                        <div className={styles.overlay} />
                        <div className={styles.content}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <p className={styles.description}>{item.description}</p>
                            <button className={styles.peçaBtn} onClick={() => handleClickPeçaAqui(item.title)}>
                                Peça aqui!
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.buttons}>
                <button onClick={handlePrev} className={styles.navButton}>
                    <ChevronLeft size={24} color="white" />
                </button>
                <button onClick={handleNext} className={styles.navButton}>
                    <ChevronRight size={24} color="white" />
                </button>
            </div>

            {/* Indicadores */}
            <div className={styles.indicators}>
                {items.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${index === i + 1 ? styles.active : ""}`}
                        onClick={() => setIndex(i + 1)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
