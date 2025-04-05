import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Criando um botão estilizado
const CustomButton = styled(Button)(({ theme }) => ({
    backgroundColor: "black", // Cor de fundo
    color: "white",          // Cor do texto
    padding: "10px 20px",    // Espaçamento interno
    theme
}));

export default function ButtonMaterialUi() {
    return <CustomButton variant="contained">Hello world</CustomButton>;
}
