import {
  Box,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectValores from "../atoms/SelectValores";
import { TituloH2 } from "../atoms/TituloH2";
import ButtonMaterialUi from "../atoms/ButtonMaterialUi";
import ItemListaDePedidos from "../atoms/ItemListaDePedidos";
import Acordeon from "../atoms/Acordeon";
import SearchIcon from "@mui/icons-material/Search";
import { MelhoresPizzas } from "./melhoresPizzas";
import.meta.env;





export default function SectionPedidos() {
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [pizzasSelecionadas, setPizzasSelecionadas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  // Estados para controlar as metades da pizza
  const [metadeSelecionada, setMetadeSelecionada] = useState(null);
  const [saborEsquerda, setSaborEsquerda] = useState(null);
  const [saborDireita, setSaborDireita] = useState(null);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/produtos`
      );

      console.log("Resposta da API:", response);
      if (Array.isArray(response.data)) {
        setProdutos(response.data);
        setProdutosFiltrados(response.data);
      } else {
        console.error("A resposta da API não é um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Efeito para filtrar produtos quando o termo de pesquisa muda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setProdutosFiltrados(produtos);
    } else {
      const filtered = produtos.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (produto.descricao &&
            produto.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setProdutosFiltrados(filtered);
    }
  }, [searchTerm, produtos]);

  // Função para lidar com o clique em uma metade da pizza
  const handleMetadeClick = (metade) => {
    setMetadeSelecionada(metade);
    setTooltipOpen(false);
    setDialogOpen(true);
    fetchProdutos();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSearchTerm("");
    setMetadeSelecionada(null);
  };

  // Função para lidar com a mudança no campo de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Função para adicionar sabor à metade selecionada
  const adicionarSaborMetade = (produto) => {
    if (metadeSelecionada === "esquerda") {
      setSaborEsquerda({
        id: Date.now(),
        sabor: produto.nome,
        texto: produto.descricao || "Ingredientes não especificados",
        preco: (produto.preco / 2).toFixed(2), // Metade do preço para meia pizza
        imagem: "meia_pizza_frango_com_catupiry.png", // Imagem da metade esquerda
      });
    } else if (metadeSelecionada === "direita") {
      setSaborDireita({
        id: Date.now(),
        sabor: produto.nome,
        texto: produto.descricao || "Ingredientes não especificados",
        preco: (produto.preco / 2).toFixed(2), // Metade do preço para meia pizza
        imagem: "meia_pizza_frango_com_catupiry.png", // Imagem da metade direita
      });
    }

    setDialogOpen(false);
    setSearchTerm("");
    setMetadeSelecionada(null);
  };

function adicionarPizzaAoPedido() {
  console.log("Função adicionarPizzaAoPedido chamada");
  console.log("Sabor Esquerda:", saborEsquerda);
  console.log("Sabor Direita:", saborDireita);

  if (saborEsquerda && saborDireita) {
    const precoTotal = (
      parseFloat(saborEsquerda.preco) + parseFloat(saborDireita.preco)
    ).toFixed(2);

    console.log("Preço total calculado:", precoTotal);

    const novaPizza = {
      id: Date.now(),
      metades: [
        {
          lado: "esquerda",
          sabor: saborEsquerda.sabor,
          texto: saborEsquerda.texto,
          preco: saborEsquerda.preco,
          imagem: saborEsquerda.imagem,
        },
        {
          lado: "direita",
          sabor: saborDireita.sabor,
          texto: saborDireita.texto,
          preco: saborDireita.preco,
          imagem: saborDireita.imagem,
        },
      ],
      sabor: `Meia ${saborEsquerda.sabor} / Meia ${saborDireita.sabor}`,
      texto: `Pizza meio a meio`,
      preco: precoTotal,
    };

    console.log("Nova pizza a ser adicionada:", novaPizza);

    setPizzasSelecionadas((pizzasAtuais) => {
      const novaLista = [...pizzasAtuais, novaPizza];
      console.log("Nova lista de pizzas:", novaLista);
      return novaLista;
    });

    // Limpa as seleções após adicionar ao pedido
    setSaborEsquerda(null);
    setSaborDireita(null);

    console.log("Seleções limpas");
  } else {
    // Se apenas uma metade foi selecionada
    alert(
      "Por favor, selecione ambas as metades da pizza antes de adicionar ao carrinho."
    );
  }
};

  // Função para calcular o valor total do pedido
  const calcularTotal = () => {
    return pizzasSelecionadas
      .reduce((total, pizza) => {
        return total + parseFloat(pizza.preco || 0);
      }, 0)
      .toFixed(2);
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100vw",
        height: "90vh",
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundImage: 'url("/img/bg_pedidos.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          "& > div": {
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "90%",
          }}
        >
          <SelectValores texto={"Selecione o tamanho"} />
          <SelectValores texto={"Selecione o Sabor"} />
          <SelectValores texto={"Escolher Borda recheada"} />
        </Box>

        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <TituloH2 text={"Pizza Grande"} color={"white"} />
          <Tooltip
            title={
              tooltipOpen ? "Clique em uma metade para escolher o sabor" : ""
            }
            open={tooltipOpen}
            arrow
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Linha divisória */}
              <Box
                sx={{
                  position: "absolute",
                  width: "2px",
                  height: "100%",
                  backgroundColor: "black",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 2,
                  overflow: "hidden",
                }}
              />
              {/* Metade esquerda */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: saborEsquerda
                    ? `url("/img/${saborEsquerda.imagem}")`
                    : 'url("/img/tabua_pizza.png")',
                  backgroundSize: saborEsquerda ? "50%" : "cover", // <-- aqui o ajuste!
                  backgroundRepeat: "no-repeat", // impede repetição
                  backgroundPosition: saborEsquerda ? "left" : "center",
                  position: "absolute",
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    zIndex: 1,
                  },
                }}
                onClick={() => handleMetadeClick("esquerda")}
              />
              {/* Metade direita */}
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: saborDireita
                    ? `url("/img/${saborDireita.imagem}")`
                    : 'url("/img/tabua_pizza.png")',
                  backgroundSize: saborDireita ? "50%" : "cover",
                  backgroundPosition: saborDireita ? "right" : "center",
                  transform: saborDireita ? "rotateY(180deg)" : "rotateY(0deg)",
                  // transform: saborEsquerda ? "rotate(180deg)" : "none",
                  position: "absolute",
                  clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    zIndex: 1,
                  },
                }}
                onClick={() => handleMetadeClick("direita")}
              />
            </Box>
          </Tooltip>

          {/* Informações das metades selecionadas */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "center",
            }}
          >
            {saborEsquerda && (
              <Typography variant="body2" color="white">
                Metade Esquerda: {saborEsquerda.sabor}
              </Typography>
            )}
            {saborDireita && (
              <Typography variant="body2" color="white">
                Metade Direita: {saborDireita.sabor}
              </Typography>
            )}
          </Box>

          <ButtonMaterialUi
            texto={"Adicionar Ao Carrinho"}
            bg={"#B72A23"}
            onClick={adicionarPizzaAoPedido}
            disabled={!saborEsquerda || !saborDireita}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
              width: "90%",
              height: "auto",
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
              }}
            >
              <TituloH2 text={"Suas Pizzas"} color={"#333"} />
            </Box>
            <Stack
              sx={{
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {pizzasSelecionadas.length > 0 ? (
                pizzasSelecionadas.map((pizza) => (
                  <Box
                    key={pizza.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {pizza.sabor}
                    </Typography>

                    {/* Se for uma pizza meio a meio, mostra acordeons para cada metade */}
                    {pizza.metades ? (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Pizza meio a meio - R$ {pizza.preco}
                        </Typography>

                        {/* Acordeon para a metade esquerda */}
                        <Box sx={{ mb: 1 }}>
                          <Acordeon
                            sabor={`Metade Esquerda: ${pizza.metades[0].sabor}`}
                            texto={pizza.metades[0].texto}
                            preco={pizza.metades[0].preco}
                          />
                        </Box>

                        {/* Acordeon para a metade direita */}
                        <Box>
                          <Acordeon
                            sabor={`Metade Direita: ${pizza.metades[1].sabor}`}
                            texto={pizza.metades[1].texto}
                            preco={pizza.metades[1].preco}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <>
                        <Typography variant="body2">{pizza.texto}</Typography>
                        <Typography variant="body2" color="primary">
                          R$ {pizza.preco}
                        </Typography>
                      </>
                    )}
                  </Box>
                ))
              ) : (
                <Typography sx={{ p: 2, textAlign: "center" }}>
                  Nenhuma pizza selecionada ainda
                </Typography>
              )}
            </Stack>

            {pizzasSelecionadas.length > 0 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  p: 2,
                  backgroundColor: "#eee",
                  borderRadius: "4px",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Total:
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  R$ {calcularTotal()}
                </Typography>
              </Box>
            )}
            <ButtonMaterialUi
              texto={"Finalizar Pedido"}
              bg={"#B72A23"}
              disabled={pizzasSelecionadas.length === 0}
            />
          </Box>
        </Box>
      </Stack>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            height: "90vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DialogTitle>
          {metadeSelecionada === "esquerda"
            ? "Selecione o Sabor para a Metade Esquerda"
            : "Selecione o Sabor para a Metade Direita"}
        </DialogTitle>

        {/* Campo de pesquisa */}
        <Box sx={{ px: 3, pt: 1, pb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar pizza..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <DialogContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            overflowY: "auto",
          }}
        >
          <Stack
            sx={{
              flex: 1,
              width: "100%",
              gap: 2,
            }}
          >
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <Box
                  key={produto.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ flex: 1, maxWidth: "70%" }}>
                    <ItemListaDePedidos
                      sabor={produto.nome}
                      texto={
                        produto.descricao || "Ingredientes não especificados"
                      }
                      preco={produto.preco.toFixed(2)}
                    />
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => adicionarSaborMetade(produto)}
                    >
                      Selecionar
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ p: 2, textAlign: "center" }}>
                Nenhuma pizza encontrada com "{searchTerm}"
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            flexShrink: 0,
            justifyContent: "flex-end",
            padding: "16px",
          }}
        >
          <Button onClick={handleDialogClose}>Fechar</Button>
        </DialogActions>
      </Dialog>


      <Box
              sx={{
                boxSizing: "border-box",
                width: "100%",
                height: "auto",
                overflow: "hidden",
                whiteSpace: "nowrap", 
                textOverflow: "ellipsis",
                backgroundColor: "#DFDDD8",
              }}
            >
              <TituloH2
                text={"* AMOR POR ENTREGAR* * AMOR POR PIZZA*  * AMOR POR ENTREGAR*"}
                fontSize={"70px"}
                color={"red"}
              />
            </Box>
    </Box>
  );
}
