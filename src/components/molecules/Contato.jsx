import { Box, Stack } from '@mui/material';
import React from 'react';
import Divider from "@mui/material/Divider";

export default function Contato() {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 4, sm: 6, md: 6 }}
      
      sx={{
        justifyContent: "space-between",
        alignItems: 'center',
        width: '80%',
        padding: '20px'
      }}

      
    >
      <Box sx={{ textAlign: "center" }}>
        <h2>Fale Conosco</h2>
        <p>(11) 91324-3487</p>
        <p>Rua Juquiá, 675</p>
        <p>Jardim Cristiane</p>
        <p>Santo André-SP</p>
        <p>09185-235</p>
      </Box>
      <Box display={"flex"}>
        <hr style={{ border: "solid black 1px" }} />
        <img src="/img/logo_bonari_preto.png" alt="" 
          style={{
            margin: '0px 50px'
          }}
        />
        <hr style={{ border: "solid black 1px" }} />
      </Box>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <h3>Horários de Funcionamento</h3>
          <p>Terça a Sábado: 18:00 - 01:00</p>
          <p>Feriados: 18:00 - 23:00</p>
          <p>Fechados às segundas-feiras, exceto feriados</p>
        </Box>
      </Box>
    </Stack>
  );
}