import { Box } from "@mui/material";
import React from "react";
import Nav from "../molecules/Nav";
import SectionPedidos from "../molecules/sectionPedidos";

export default function Pedidos() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav backgroundColor={"#B72A23"} padding={"0px"} height={"60px"} />
      <SectionPedidos />
    </Box>
  );
}
