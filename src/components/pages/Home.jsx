import React from "react";
import HeaderMUI from "../organisms/headerMUI.jsx";
import { SectionMeio } from "../organisms/SectionMeio.jsx";
// import SectionMeio from "../molecules/SectionMeio.jsx";

export function Home() {
  return (
    <body
      style={{
        backgroundColor: "#EEEDE8",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderMUI />
      <SectionMeio />
    </body>
  );
}
