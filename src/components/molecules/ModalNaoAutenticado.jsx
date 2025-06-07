import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function ModalNaoAutenticado({ aberto, onOk }) {
  return (
    <Modal open={aberto} onClose={onOk}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#fff",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Usuário não autenticado. Faça login para continuar.
        </Typography>
        <Button variant="contained" onClick={onOk}>
          OK
        </Button>
      </Box>
    </Modal>
  );
}