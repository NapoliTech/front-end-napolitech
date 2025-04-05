import { Box } from "@mui/material";
import React from "react";
import { BannerPizza } from "./BannerPizza";

export function SectionMeio() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#DFDDD8",
        display: 'flex',
        boxSizing: 'border-box',
        height: '100vh',
      }}
    >
      <BannerPizza />
    </Box>
  );
}
