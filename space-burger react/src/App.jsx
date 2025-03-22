import "./index.css"; // OU "import './global.css';"
import React from "react";
import Header from "./Header.jsx";
import Video from "./Video.jsx";
import LojaStatus from "./LojaStatus.jsx";
import Menu from "./Menu.jsx";
import Footer from "./Footer.jsx";
import { useMediaQuery } from "react-responsive";
import Loader from "./Loader.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <div className="wrapper">
      <Loader />
      {isDesktop && <Header />}
      <Routes>
        <Route path="/" element={
          <main className="content">
          <Video />
          <LojaStatus />
          <Menu />
        </main>
      } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;