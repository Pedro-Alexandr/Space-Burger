import { useState, useEffect, useRef } from "react";
import styles from "./style/Loader.module.css";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const loadingScreenRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!isLoading && loadingScreenRef.current) {
      loadingScreenRef.current.classList.add(styles.fadeOut);

      loadingScreenRef.current.addEventListener("transitionend", () => {
        setIsVisible(false);
      });
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div ref={loadingScreenRef} className={styles.loadingScreen}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <div className={styles.loader2}></div>
      </div>
    </div>
  );
};

export default Loader;