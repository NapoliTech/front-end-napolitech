import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

export default function Nav({ backgroundColor, padding, position, left }) {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  return (
    <Box
      component="nav"
      sx={{
        position: position,
        left: left,
        width: "99vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: padding,
        zIndex: 10,
        backgroundColor: backgroundColor,
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
          "& > div": {
            height: "20%", 
          },
        }}
      >
        <a
          onClick={() => navigate('/')} // Redireciona para a home
          style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
        >
          Cardapio
        </a>
        <a
          onClick={() => navigate('/')} // Redireciona para a home
          style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
        >
          Fale conosco
        </a>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: 'border-box',
          margin: '0',
          padding: '0'
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
        <a
          onClick={() => navigate('/login')} // Redireciona para a página de login
          style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
        >
          Entrar
        </a>
        <a
          onClick={() => navigate('/pedidos')} // Redireciona para a página de pedidos
          style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
        >
          Carinho
        </a>
      </Box>
    </Box>
  );
}