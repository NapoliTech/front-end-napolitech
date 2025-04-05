import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
          fontSize: "1.2rem", // Diminuir o tamanho da fonte
        }}
      >
        {sabor}
      </h2>
      <p style={{ fontSize: "0.9rem" }}> {/* Diminuir o tamanho da fonte */}
        {desc}
      </p>
      <h2 style={{ color: "#168928", fontSize: "1rem" }}>{preco}</h2> {/* Diminuir o tamanho da fonte */}
    </Card>
  );
}
