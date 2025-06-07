import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCarrinho from "./ModalCarrinho";
import ModalSair from "./ModalSair";

export default function Nav({ backgroundColor, padding, position, left }) {
  const navigate = useNavigate();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [modalSairAberto, setModalSairAberto] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState(
    JSON.parse(localStorage.getItem("itensCarrinho") || "[]")
  );

  // Atualiza o carrinho ao fechar o modal (caso tenha sido alterado)
  const atualizarCarrinho = () => {
    setItensCarrinho(JSON.parse(localStorage.getItem("itensCarrinho") || "[]"));
  };

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.removeItem("token"); // Limpa o token da localStorage
    setModalSairAberto(false);
    navigate("/");
    window.location.reload();
  };

  console.log(localStorage.getItem("token"));

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: position,
          left: left,
          width: "99vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: padding,
          zIndex: 10,
          backgroundColor: backgroundColor,
          color: "#FFF",
        }}
      >
        {/* Esquerda: Navegação */}
        <Box
          sx={{
            display: "flex",
            gap: "43px",
            alignItems: "center",
          }}
        >
          <a
            onClick={() => navigate("/")}
            style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
          >
            Cardapio
          </a>
          <a
            onClick={() => navigate("/")}
            style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
          >
            Fale conosco
          </a>
        </Box>
        {/* Centro: Logo */}
        <Box
          sx={{
            display: "flex",
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
        {/* Direita: Sair/Cadastrar e Carrinho */}
        <Box
          sx={{
            display: "flex",
            gap: "43px",
            alignItems: "center",
          }}
        >
          {localStorage.getItem("token") ? (
            <a
              onClick={() => setModalSairAberto(true)}
              style={{
                color: "#FFF",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sair
            </a>
          ) : (
            <a
              onClick={() => navigate("/Cadastro")}
              style={{
                color: "#FFF",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Cadastrar
            </a>
          )}
          <a
            onClick={() => setCarrinhoAberto(true)}
            style={{ color: "#FFF", textDecoration: "none", cursor: "pointer" }}
          >
            Carrinho
          </a>
        </Box>
      </Box>

      <ModalCarrinho
        aberto={carrinhoAberto}
        fecharModal={() => {
          setCarrinhoAberto(false);
          atualizarCarrinho();
        }}
        token={token} // Passe o token como prop
        atualizarCarrinho={atualizarCarrinho}
      />

      <ModalSair
        aberto={modalSairAberto}
        fecharModal={() => setModalSairAberto(false)}
        onConfirmar={handleLogout}
      />
    </>
  );
}