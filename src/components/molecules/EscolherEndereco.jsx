import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Stack } from "@mui/material";
import CadastroEndereco from "./CadastroEndereco"; // Certifique-se de importar o componente de cadastro

export default function EscolherEndereco({ enderecos, onSelecionarEndereco, onClose, userId }) {
  const [mostrarCadastro, setMostrarCadastro] = useState(false); // Alterna entre lista e cadastro

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {mostrarCadastro ? "Cadastrar Novo Endereço" : "Escolher Endereço"}
      </DialogTitle>
      <DialogContent>
        {mostrarCadastro ? (
          <CadastroEndereco
            userId={userId} // Passa o userId para o componente de cadastro
            onClose={() => setMostrarCadastro(false)} // Volta para a lista de endereços
          />
        ) : (
          <>
            {enderecos.length > 0 ? (
              <Stack spacing={2}>
                {enderecos.map((endereco) => (
                  <Box
                    key={endereco.id}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "16px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <Typography>
                      {endereco.rua}, {endereco.numero} - {endereco.bairro}, {endereco.cidade} - {endereco.estado}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      CEP: {endereco.cep}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onSelecionarEndereco(endereco)}
                      sx={{ marginTop: "8px" }}
                    >
                      Selecionar
                    </Button>
                  </Box>
                ))}
              </Stack>
            ) : (
              <Typography>Nenhum endereço encontrado.</Typography>
            )}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setMostrarCadastro(true)} // Alterna para o formulário de cadastro
              sx={{ marginTop: "16px" }}
            >
              Adicionar Novo Endereço
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}