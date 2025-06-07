import React from "react";
import { Carrossel } from "../organisms/Carrossel";
import { TextBonari } from "../organisms/TextBonari";
import { Box } from "@mui/material";

export function CarosselComTexto({ children }) {
  const images = [
    { src: "/img/Bg-formularios.jpg", alt: "Background Formulários" },
    { src: "/img/bg-pizzaCaixa.jpg", alt: "Pizza na Caixa" },
    { src: "/img/bg-pizzaMesa.jpg", alt: "Pizza na Mesa" },
  ];

  return (
    <Box sx={{overflow: 'hidden'}}>
      <Carrossel images={images} />

      <TextBonari />
      {children}
    </Box>
  );
}
