import * as React from "react";
import Card from "@mui/material/Card";


export default function CardPizza({src, sabor, desc, preco }) {
  return (
    <Card
      sx={{
        maxWidth: 300, // Diminuir a largura máxima do card
        backgroundColor: "transparent",
        textAlign: "center",
        boxShadow: 'none',
        padding: "10px", // Adicionar padding para ajustar o layout
      }}
    >
      <img
        src={src}
        alt="Pizza"
        style={{
          width: "100%",
          height: "auto",
        }}
      />

      <h2
        style={{
          color: "red",
          fontSize: "1.2rem", 
        }}
      >
        {sabor}
      </h2>
      <p style={{ fontSize: "0.9rem" }}> 
        {desc}
      </p>
      <h2 style={{ color: "#168928", fontSize: "1rem" }}>{preco}</h2> 
    </Card>
  );
}
