import "./index.css"; // OU "import './global.css';"
import React from "react";
import Header from "./Header.jsx";
import Video from "./Video.jsx";
import LojaStatus from "./LojaStatus.jsx";
import Menu from "./Menu.jsx";
import Footer from "./Footer.jsx";
import { useMediaQuery } from "react-responsive";
import Loader from "./Loader.jsx";

function App() {
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return (
    <div className="wrapper">
      <Loader/>
      {isDesktop && <Header />}
      <main className="content">
        <Video />
        <LojaStatus /> 
        <Menu />
      </main>
      <Footer />
    </div>
  );
}

export default App;