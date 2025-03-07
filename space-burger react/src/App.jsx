import "./index.css"; // OU "import './global.css';"
import React from "react";
import Header from "./Header.jsx";
import Video from "./Video.jsx";
import LojaStatus from "./LojaStatus.jsx";
import Menu from "./Menu.jsx";
import Catalog from "./Catalog.jsx";
import Footer from "./Footer.jsx";
import { useMediaQuery } from "react-responsive";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <div className="wrapper">
      {isDesktop && <Header />}
      <main className="content">
        <Video />
        <LojaStatus />
        <Menu />
        <Catalog />
      </main>
      <Footer />
    </div>
  );
}

export default App;