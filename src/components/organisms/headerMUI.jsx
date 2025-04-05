import React from "react";
import Box from "@mui/material/Box";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Carrossel } from "./Carrossel";
import Button from "@mui/material/Button";
import { TituloH2 } from "../atoms/TituloH2";

export default function HeaderMUI() {
  const images = [
    { src: "/img/img_1_home.jpg", alt: "Background bem vindo" },
    { src: "/img/bg-pizzaMesa.jpg", alt: "Background bem vindo" },
  ];

  return (
    <header>
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

      <Box
        component="nav"
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 32px",
          zIndex: 10, // Garante que fique acima do Carrossel
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          color: "#FFF",
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

      <Box
        sx={{
          position: "absolute",
          top: "38%",
          left: "6%",
          width: "40%",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          // padding: "16px 32px",
          color: "white",
          zIndex: 10,
        }}
      >
        < TituloH2  
          text={'Perfeição em cada fatia'}
          fontSize={'80px'}
          color={'#fff'}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#B72A23",
            boxShadow: "none",
            borderRadius: "10px",
            maxWidth: "150px",
          }}
        >
          Peça Ja
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
