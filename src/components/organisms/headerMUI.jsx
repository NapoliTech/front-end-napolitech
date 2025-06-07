import React from "react";
import Box from "@mui/material/Box";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Carrossel } from "./Carrossel";
import Button from "@mui/material/Button";
import { TituloH2 } from "../atoms/TituloH2";
import Nav from "../molecules/Nav";
import { useNavigate } from "react-router-dom";
export default function HeaderMUI() {
  const navigate = useNavigate();
  const images = [
    { src: "/img/img_1_home.jpg", alt: "Background bem vindo" },
    { src: "/img/bg-pizzaMesa.jpg", alt: "Background bem vindo" },
  ];

  // Função para listar músicas

  return (
    <header
      style={{
        position: "relative", // Adicionado para criar o contexto de posicionamento
        width: "100%",
        height: "100vh",
        overflow: "hidden", // Garante que nada transborde do header
      }}
    >
      <Box
        sx={{
          backgroundColor: "#B72A23",
          height: "32px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "#FFF" }}>
          <FmdGoodIcon
            sx={{
              color: "#FFF",
              fontSize: "20px",
              marginRight: "8px",
            }}
          />
          <h3>Encontre a unidade mais próxima</h3>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", color: "#FFF" }}>
          <PhoneIcon sx={{ marginRight: "8px" }} />
          <h3>(11) 91324-3487</h3>
        </Box>

        <InstagramIcon sx={{ color: "#FFF", fontSize: "20px" }} />
      </Box>

      <Nav
        backgroundColor={"rgba(0, 0, 0, 0.0)"}
        padding={"16px 32px"}
        height={"80px"}
        position={"absolute"}
      />

      <Box
        sx={{
          position: "absolute",
          top: "38%",
          left: "6%",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          color: "white",
          zIndex: 10,
        }}
      >
        <TituloH2
          text={"Perfeição em cada fatia"}
          fontSize={"80px"}
          color={"#fff"}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#B72A23",
            boxShadow: "none",
            borderRadius: "10px",
            maxWidth: "150px",
          }}
          onClick={() => navigate("/pedidos")}
        >
          Peça Já
        </Button>
      </Box>

      <Box
        sx={{
          height: "100vh",
          width: "100%",
        }}
      >
        <Carrossel images={images} />
      </Box>
    </header>
  );
}
