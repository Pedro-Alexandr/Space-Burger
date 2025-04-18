import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./style/Carousel.module.css";

const items = [
    {
        id: 1,
        title: "OS MAIS VENDIDOS DA SPACE",
        description: "Aqui você encontra os queridinhos da galera! Uma seleção dos mais vendidos da Space!",
        image: "./src/assets/stock media/carousel/maisVendidos.jpeg",
    },
    {
        id: 2,
        title: "COMBOS SMASH",
        description: "Escolha seu Smash Burger preferido com porção e bebida à sua escolha!",
        image: "./src/assets/stock media/carousel/smash.jpeg",
    },
    {
        id: 3,
        title: "COMBOS BURGER 150G",
        description: "Escolha seu Burger preferido com porção e bebida à sua escolha!",
        image: "./src/assets/stock media/carousel/burger150.webp",
    },
    {
        id: 4,
        title: "ACOMPANHAMENTOS",
        description: "Aqui você escolhe o seu acompanhamento preferido! Temos porção de batatas, nuggets, onion rings (cebola empanada) ou mini coxinhas.",
        image: "./src/assets/stock media/carousel/acomp.jpg",
    },
];

const TOTAL_SLIDES = items.length;

export default function Carousel() {
    const [index, setIndex] = useState(1); // começa no primeiro item real (índice 1 por causa dos clones)
    const [transition, setTransition] = useState(true);
    const [startX, setStartX] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const carouselRef = useRef();

    const fullSlides = [
        items[items.length - 1], // clone do último no início
        ...items,
        items[0], // clone do primeiro no fim
    ];

    // Autoplay
    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Loop visual (sem flicker)
    useEffect(() => {
        if (index === 0) {
            setTimeout(() => {
                setTransition(false);
                setIndex(TOTAL_SLIDES);
            }, 300);
        } else if (index === TOTAL_SLIDES + 1) {
            setTimeout(() => {
                setTransition(false);
                setIndex(1);
            }, 300);
        } else {
            setTransition(true);
        }
    }, [index]);

    // Keyboard support
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const next = () => setIndex((prev) => prev + 1);
    const prev = () => setIndex((prev) => prev - 1);

    // Drag handlers
    const handleStart = (e) => {
        setStartX(e.clientX || e.touches[0].clientX);
        setIsDragging(true);
        setTransition(false);
    };

    const handleMove = (e) => {
        if (!isDragging) return;
        const clientX = e.clientX || e.touches[0].clientX;
        const distance = clientX - startX;
        setDragX(distance);
    };

    const handleEnd = () => {
        setIsDragging(false);
        setTransition(true);

        if (dragX > 100) prev();
        else if (dragX < -100) next();

        setDragX(0);
    };

    // Style for transform
    const slideStyle = {
        transform: `translateX(calc(-${index * 100}% + ${dragX}px))`,
        transition: transition ? "transform 0.5s ease" : "none",
    };

    return (
        <div
            className={styles.carousel}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={() => isDragging && handleEnd()}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            ref={carouselRef}
        >
            {/* Slides */}
            <div className={styles.slider} style={slideStyle}>
                {fullSlides.map((item, i) => (
                    <div className={styles.slide} key={i}>
                        <img src={item.image} alt={item.title} className={styles.image} />
                        <div className={styles.overlay} />
                        <div className={styles.content}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navegação */}
            <div className={styles.buttons}>
                <button onClick={prev} className={styles.navButton}>
                    <ChevronLeft size={24} color="white" />
                </button>
                <button onClick={next} className={styles.navButton}>
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
}
