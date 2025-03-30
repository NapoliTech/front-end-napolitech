import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// Styled component para as Box internas
const StyledBox = styled(Box)(() => ({
  width: "290px",
  height: "280px",
  margin: "8px",
  borderRadius: "8px", // Bordas arredondadas
  display: "flex",
  flexDirection: 'column',
  gap: '8px',
    "& img": {
      width: "80px",
      height: "auto",
      objectFit: "cover", // Ajusta a imagem para cobrir o espaço sem distorção
      marginBottom: "8px", // Espaçamento abaixo da imagem
    },
}));

export function BannerPizza() {
  return (
    <Box
      sx={{
        display: "flex",

        boxSizing: "border-box",
        border: "solid blue 1px",
      }}
    >
      <Box
        sx={{
          border: "solid pink 1px",
          width: "60%",
          display: "fle",
        }}
      >
        <img
          src="/img/pizzaBanner.png"
          alt="Pizza Banner"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          border: "solid blue 1px",
          maxWidth: "50%",
          flex: 1,
          marginLeft: "-100px",
        }}
      >
        <h2>
          VOCÊ MERECE UMA <br /> PIZZA HOJE!
        </h2>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap", // Permite que as StyledBox façam wrap
            marginTop: "16px",
            border: "solid red 1px",
            gap: "4px", // Espaçamento entre as StyledBox
          }}
        >
          <StyledBox>
            <img src="/img/Vector (1).png" alt="" srcset="" />
            <h2>Produtos de qualidade</h2>
            <p>cuidadosamente escolidos <br />
            para um alto nivel de qualidade
            </p>
          </StyledBox>
          <StyledBox>2</StyledBox>
          <StyledBox>3</StyledBox>
          <StyledBox>4</StyledBox>
        </Box>
      </Box>
    </Box>
  );
}