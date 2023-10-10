import Header from "../components/Header";
import Content from "../components/Content";
import Settings from "../components/Settings";
import { useState } from "react";

export default function Default() {

    const [showSettings,setShowSettings] = useState(false);

  return (
    <>
      <Header passShowSettings={setShowSettings} />
      <Content />
      { showSettings && <Settings passShowSettings={setShowSettings} />}
    </>
  );
}
