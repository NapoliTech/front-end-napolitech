import { Box } from "@mui/material";
import React from "react";
import { MelhoresPizzas } from "../molecules/melhoresPizzas";


export function SectionMelhoresPizzas(){
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        backgroundColor: "#DFDDD8",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <MelhoresPizzas />
    </Box>
  );
}