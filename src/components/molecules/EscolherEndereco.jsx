import React, { useState } from "react"; // Adicione o useState aqui
import { Dialog, DialogTitle, DialogContent, Button, Box, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CadastroEndereco from "./CadastroEndereco";

export default function EscolherEndereco({ enderecos, onSelecionarEndereco, onClose, userId, pizzasSelecionadas, idsPizzasSelecionadas }) {
  const [mostrarCadastro, setMostrarCadastro] = useState(false); // Alterna entre lista e cadastro
  const navigate = useNavigate(); // Hook para redirecionamento

  const handleSelecionarEndereco = (endereco) => {
    console.log("Endereço selecionado:", endereco);
    console.log("Pizzas selecionadas antes de redirecionar:", pizzasSelecionadas);
    console.log("IDs das pizzas selecionadas:", idsPizzasSelecionadas);

    // Redireciona para a página de finalizar pedido com os dados necessários
    navigate("/finalizarPedido", {
      state: {
        userId,
        enderecoSelecionado: endereco,
        pizzasSelecionadas, // Passa as pizzas selecionadas
        idsPizzasSelecionadas, // Passa os IDs das pizzas selecionadas
      },
    });
  };

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
                      onClick={() => handleSelecionarEndereco(endereco)} // Redireciona ao selecionar
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