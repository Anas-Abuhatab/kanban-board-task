import Header from "../components/Header";
import Content from "../components/Content";
import Settings from "../components/Settings";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Default() {
  const root = document.querySelector(":root");
  const setVariables = (vars) =>
    Object.entries(vars).forEach((v) => root.style.setProperty(v[0], v[1]));

    if (localStorage.getItem("theme")) {
      setVariables(JSON.parse(localStorage.getItem("theme")))
    }

    const [showSettings,setShowSettings] = useState(false);

  return (
    <>
      <Header passShowSettings={setShowSettings} />
      <Content />
      { showSettings && <Settings passShowSettings={setShowSettings} />}
      <Footer />
    </>
  );
}
