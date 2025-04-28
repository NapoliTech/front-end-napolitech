import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, CardHeader, FormControlLabel, Checkbox, Divider, TextField, Button } from "@mui/material";
import { api } from "../../provider/apiInstance";

export default function FinalizarPedido() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera os dados passados via state ou define valores padrão
  const { userId, enderecoSelecionado, pizzasSelecionadas = [], idsPizzasSelecionadas = [] } = location.state || {};

  // Estado para os checkboxes
  const [isEntrega, setIsEntrega] = useState(false);
  const [isRetirada, setIsRetirada] = useState(false);

  // Estado para a observação
  const [observacao, setObservacao] = useState("");

  // Adiciona logs para verificar os dados recebidos
  useEffect(() => {
    console.log("Dados recebidos na página FinalizarPedido:");
    console.log("userId:", userId);
    console.log("Endereço selecionado:", enderecoSelecionado);
    console.log("Pizzas selecionadas:", pizzasSelecionadas);
    console.log("IDs das pizzas selecionadas:", idsPizzasSelecionadas); // Log dos IDs
  }, [userId, enderecoSelecionado, pizzasSelecionadas, idsPizzasSelecionadas]);

  // Redireciona para a página inicial se os dados necessários não estiverem disponíveis
  if (!userId || !enderecoSelecionado) {
    console.error("Dados insuficientes para finalizar o pedido.");
    navigate("/pedidos"); // Redireciona para a página de pedidos
    return null;
  }

  // Calcula o total do pedido
  const calcularTotal = () => {
    return pizzasSelecionadas
      .reduce((total, pizza) => total + parseFloat(pizza.preco || 0), 0)
      .toFixed(2);
  };

  // Lógica para alternar entre os checkboxes
  const handleCheckboxChange = (type) => {
    if (type === "entrega") {
      setIsEntrega(!isEntrega);
      if (!isEntrega) setIsRetirada(false); // Desmarca "Retirada" se "Entrega" for selecionado
    } else if (type === "retirada") {
      setIsRetirada(!isRetirada);
      if (!isRetirada) setIsEntrega(false); // Desmarca "Entrega" se "Retirada" for selecionado
    }
  };

  const finalizarPedido = async () => {
    const payload = {
      clienteId: userId,
      itens: idsPizzasSelecionadas.map((id) => ({
        produto: id,
        quantidade: 1, 
        categoriaProduto: 'PIZZA'
      })),
      observacao: observacao || "", 
    };

    console.log("Payload enviado para a API:", payload);

    try {
      const response = await api.post("/api/pedidos", payload);
      console.log("Pedido enviado com sucesso:", response.data);
      alert("Pedido finalizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
      alert("Erro ao finalizar o pedido. Tente novamente.");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "70vh",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Card para informações do pedido */}
        <Box
          sx={{
            width: "50%", // Ocupa metade da tela
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Centraliza o conteúdo horizontalmente
            marginTop: "24px", // Adiciona 24px de espaço abaixo da Nav
          }}
        >
          <Card
            sx={{
              width: "90%", // Ocupa 90% da largura disponível
              maxWidth: "600px", // Limita a largura máxima
              height: "auto", // Altura dinâmica baseada no conteúdo
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              border: "1px solid #ddd", // Adiciona borda ao card
            }}
          >
            {/* Cabeçalho do cartão */}
            <CardHeader
              title="Seu Pedido"
              sx={{
                backgroundColor: "#B72A23", // Fundo vermelho
                color: "#fff", // Texto branco
                textAlign: "center", // Centraliza o texto
                padding: "16px",
                fontSize: "1.5rem",
              }}
            />
            <CardContent
              sx={{
                padding: "16px", // Ajusta o espaçamento interno
                display: "flex",
                flexDirection: "column",
                gap: "12px", // Espaçamento entre os elementos
              }}
            >
              <Typography variant="subtitle1">
                <strong>Endereço Selecionado:</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {enderecoSelecionado.rua}, {enderecoSelecionado.numero} - {enderecoSelecionado.bairro}, {enderecoSelecionado.cidade} - {enderecoSelecionado.estado}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Pizzas Selecionadas:</strong>
              </Typography>
              {pizzasSelecionadas.length > 0 ? (
                <Box component="ul" sx={{ paddingLeft: "16px", margin: 0 }}>
                  {pizzasSelecionadas.map((pizza, index) => (
                    <Box component="li" key={index} sx={{ marginBottom: "8px" }}>
                      <Typography variant="body2">
                        <strong>Meia Pizza de {pizza.metades[0].sabor} / Meia Pizza de {pizza.metades[1].sabor}</strong> - R$ {pizza.preco}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">Nenhuma pizza selecionada.</Typography>
              )}
              <Typography variant="h6" sx={{ marginTop: "16px", textAlign: "right" }}>
                <strong>Total:</strong> R$ {calcularTotal()}
              </Typography>
            </CardContent>
            <Box
              sx={{
                padding: "16px",
              }}
            >
              <TextField
                label="Adicionar Observação"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </Box>
          </Card>
        </Box>

        {/* Divisória e checkboxes */}
        <Box
          sx={{
            width: "50%", // Ocupa a outra metade da tela
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start", // Alinha ao topo
            alignItems: "flex-start", // Alinha os checkboxes à esquerda
            marginTop: "24px", // Alinha com o topo do card
            paddingLeft: "32px", // Adiciona espaçamento à esquerda
          }}
        >
          {/* Linha divisória */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              position: "absolute",
              left: "50%",
              height: "500px", // Ajusta a altura para corresponder ao card
              backgroundColor: "#000", // Cor preta
              width: "2px",
            }}
          />
          <Typography variant="h5" sx={{ marginBottom: "16px" }}>
            Escolha a forma de recebimento:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isEntrega}
                onChange={() => handleCheckboxChange("entrega")}
                color="primary"
              />
            }
            label="Entrega"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRetirada}
                onChange={() => handleCheckboxChange("retirada")}
                color="primary"
              />
            }
            label="Retirada"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: '16px',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#197824",
            color: "#fff",
            padding: "10px 20px",
            height: 'auto',
            width: 'auto'
          }}
          onClick={finalizarPedido} // Chama a função para finalizar o pedido
        >
          Finalizar Pedido
        </Button>
      </Box>
    </Box>
  );
}