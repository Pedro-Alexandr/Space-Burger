import "./style/index.css";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./Loader.jsx";
import Header from "./Header.jsx";
import Video from "./Video.jsx";
import LojaStatus from "./LojaStatus.jsx";
import Menu from "./Menu.jsx";
import Catalog from "./Catalog.jsx";
import Footer from "./Footer.jsx";
import PromoModal from "./PromoModal.jsx";
import Pedidos from "./Pedidos.jsx";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <Router>

      <div className="wrapper">
        <Loader />
        {isDesktop && <Header />}

        <Routes>

          <Route 
            path="/" 
            element={
              <>
                <PromoModal />
                <main className="content">
                  <Video />
                  <LojaStatus />
                  <Catalog />
                  <Footer />
                </main>
              </>
            } 
          />

          <Route 
            path="/pedidos" 
            element={
              <main className="content">
                <Pedidos />
              </main>
            } 
          />

        </Routes>
      </div>

    </Router>
  );
}

export default App;