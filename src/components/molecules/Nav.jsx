import { Box } from '@mui/material';
import React from 'react';

export default function Nav({ backgroundColor, padding, height, position, left }) {
  return (
    <Box
      component="nav"
      sx={{
        position: position,
        left: left,
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: padding,
        zIndex: 10, 

        backgroundColor: backgroundColor,
        color: "#FFF",
        height: height,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "43px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="#contact" style={{ color: "#FFF", textDecoration: "none" }}>
          Cardapio
        </a>
        <a href="#contact" style={{ color: "#FFF", textDecoration: "none" }}>
          Fale conosco
        </a>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "43px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/img/logo_bonari.png"
          alt=""
          style={{
            width: "auto",
            height: "100px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "43px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="#about" style={{ color: "#FFF", textDecoration: "none" }}>
          Entrar
        </a>
        <a href="#contact" style={{ color: "#FFF", textDecoration: "none" }}>
          Carinho
        </a>
      </Box>
    </Box>
  );
}