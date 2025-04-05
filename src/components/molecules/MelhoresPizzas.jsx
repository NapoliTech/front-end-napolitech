import { Box, Stack } from "@mui/material";
import React from "react";
import { TituloH2 } from "../atoms/TituloH2";

export function MelhoresPizzas() {
  return (

    <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Box>
          <TituloH2
            text={
              <>
                As Mais <br /> Pedidas da <br /> Casa
              </>
            }
            fontSize={"50px"}
            color={"red"}
          />

          <p>
            Experimente as nossas <br /> especialidades! As pizzas mais <br />{" "}
            populares do nosso cardápio.
          </p>
        </Box>



        
      </Stack>
  );
}
