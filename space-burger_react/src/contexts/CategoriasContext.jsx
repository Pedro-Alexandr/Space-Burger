// src/contexts/CategoriasContext.jsx
import { createContext, useContext, useRef } from 'react';

// Crie o contexto
const CategoriasContext = createContext(null); // Inicialize com null

// Componente Provider
export function CategoriasProvider({ children }) {
  const categoriasRefs = useRef({});
  
  const registerCategoria = (id, element) => {
    if (id && element) {
      categoriasRefs.current[id] = element;
    }
  };

  const scrollToCategoria = (id) => {
    if (!id) {
      console.error("ID de categoria não fornecido");
      return;
    }
    
    const element = categoriasRefs.current[id];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // Adiciona highlight
      element.classList.add('highlight');
      setTimeout(() => {
        element.classList.remove('highlight');
      }, 2000);
    } else {
      console.warn(`Elemento da categoria ${id} não encontrado`);
    }
  };

  return (
    <CategoriasContext.Provider value={{ registerCategoria, scrollToCategoria }}>
      {children}
    </CategoriasContext.Provider>
  );
}

// Hook personalizado
export function useCategorias() {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error('useCategorias deve ser usado dentro de um CategoriasProvider');
  }
  return context;
}