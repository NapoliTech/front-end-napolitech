import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PedidoConcluidoModal({ open, onClose }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    onClose(); // Fecha o modal
    navigate("/pedidoConcluido"); // Redireciona para a página de pedido concluído
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Pedido Concluído com Sucesso!
        </Typography>
        <Typography id="modal-description" sx={{ mb: 2 }}>
          Seu pedido foi finalizado com sucesso. Clique no botão abaixo para visualizar os detalhes.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          fullWidth
        >
          Ver Pedido
        </Button>
      </Box>
    </Modal>
  );
}