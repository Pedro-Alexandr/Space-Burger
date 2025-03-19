import { useState, useEffect } from "react";
import "./style/Loader.css";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 900);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loader-container">
        <div className="loader"></div>  {/* Letreiro girando */}
        <div className="loader2"></div> {/* Logo fixa */}
      </div>
    </div>
  );
};

export default Loader;