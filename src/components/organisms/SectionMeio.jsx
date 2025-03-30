import { Box } from "@mui/material";
import React from "react";
import { BannerPizza } from "../molecules/BannerPizza";

export function SectionMeio() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#DFDDD8",
        display: 'flex',
        // justifyContent:  'start',
        // alignItems: 'flex-start',
        boxSizing: 'border-box',
        // overflow: 'hidden',
        height: '100vh',
        
      }}
    >
      <BannerPizza />
    </Box>
  );
}
