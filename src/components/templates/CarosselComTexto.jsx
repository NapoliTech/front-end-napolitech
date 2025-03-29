import React from "react";
import { Carrossel } from "../organisms/Carrossel";
import { TextBonari } from "../organisms/TextBonari";

export function CarosselComTexto({ children }) {
  const images = [
    { src: "/img/Bg-formularios.jpg", alt: "Background Formulários" },
    { src: "/img/bg-pizzaCaixa.jpg", alt: "Pizza na Caixa" },
    { src: "/img/bg-pizzaMesa.jpg", alt: "Pizza na Mesa" },
  ];

  return (
    <>
      <Carrossel images={images} />

      <TextBonari />
      {children}
    </>
  );
}
