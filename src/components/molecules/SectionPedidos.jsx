import { Box, Button, Stack } from "@mui/material";
import React from "react";
import SelectValores from "../atoms/SelectValores";
import { TituloH2 } from "../atoms/TituloH2";
import ButtonMaterialUi from "../atoms/ButtonMaterialUi";
import Acordeon from "../atoms/Acordeon";

export default function SectionPedidos() {
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
            // height: "90%",
            // width: "100%",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "300px",
              borderRadius: "50%", // Faz o elemento ser redondo
              position: "relative", // Necessário para posicionar as metades
              overflow: "hidden", // Garante que as divisões fiquem dentro do círculo
            }}
          >
            {/* Linha divisória */}
            <Box
              sx={{
                position: "absolute",
                width: "2px", // Largura da linha divisória
                height: "100%", // Garante que a linha ocupe toda a altura do círculo
                backgroundColor: "black", // Cor da linha divisória
                top: 0, // Alinha ao topo do círculo
                left: "50%", // Centraliza horizontalmente
                transform: "translateX(-50%)", // Ajusta para o centro exato
                zIndex: 2,
                overflow: "hidden", // Garante que a linha não vaze
              }}
            />
            {/* Metade esquerda */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/img/tabua_pizza.png")', // Imagem para a metade esquerda
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", // Define a metade esquerda
                transition: "transform 0.3s ease", // Animação no hover
                "&:hover": {
                  transform: "scale(1.05)", // Aumenta ligeiramente no hover
                  zIndex: 1,
                },
              }}
            />
            {/* Metade direita */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/img/tabua_pizza.png")', // Imagem para a metade direita
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)", // Define a metade direita
                transition: "transform 0.3s ease", // Animação no hover
                "&:hover": {
                  transform: "scale(1.05)", // Aumenta ligeiramente no hover
                  zIndex: 1,
                },
              }}
            />
          </Box>

          <ButtonMaterialUi texto={"Adicionar Ao Carrinho"} bg={"#B72A23"} />
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
            {/* Cabeçalho */}
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                // marginBottom: "16px",
              }}
            >
              <TituloH2 text={"Suas Pizzas"} color={"#333"} />
            </Box>

            <Stack
              sx={{
              
                maxHeight: "200px", // Altura máxima para o acordeão
                overflowY: "auto",
                
              }}
            >
              <Acordeon
                sabor={"Musarela"}
                texto={
                  "Molho de tomate Queijo mussarela Orégano Azeite de oliva "
                }
              />
              <Acordeon
                sabor={"Musarela"}
                texto={
                  "Molho de tomate Queijo mussarela Orégano Azeite de oliva "
                }
              />
              
            </Stack>


            <ButtonMaterialUi texto={"Finalizar Pedido"} bg={"#B72A23"} />
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: "auto",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          backgroundColor: "#DFDDD8",
          textAlign: 'center'
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
