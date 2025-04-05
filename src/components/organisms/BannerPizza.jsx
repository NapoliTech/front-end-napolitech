import React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { SectionQualidade } from "../atoms/sectionQualidade";
import { TituloH2 } from "../atoms/TituloH2";


const StyledBox = styled(Box)(() => ({
  width: "290px",
  height: "280px",
  margin: "8px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: 'column',
  gap: '8px',
    "& img": {
      width: "80px",
      height: "auto",
      objectFit: "cover", 
      marginBottom: "8px",
    },
}));

export function BannerPizza() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        marginTop: "10px",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
        }}
      >
        <img
          src="/img/pizzaBanner.png"
          alt="Pizza Banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "scale-down",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "50%",
          flex: 1,
          boxSizing: "border-box",
        }}
      >
        <TituloH2
          text={<>Você merece uma <br/> pizza hoje!</>}
          fontSize={"50px"}
          color={"red"}
        />
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
            flexWrap: "wrap",
            marginTop: "16px",
            gap: "4px",
          }}
        >
          <StyledBox>
            <SectionQualidade
              srcImg={"/img/camarao.png"}
              textH2={"Produtos de qualidade"}
              textP={
                <>
                  cuidadosamente escolidos <br /> para um alto nivel de
                  qualidade
                </>
              }
            />
          </StyledBox>

          <StyledBox>
            <SectionQualidade
              srcImg={"/img/tomate.png"}
              textH2={"Produtos de qualidade"}
              textP={
                <>
                  cuidadosamente escolidos <br /> para um alto nivel de
                  qualidade
                </>
              }
            />
          </StyledBox>

          <StyledBox>
            <SectionQualidade
              srcImg={"/img/azeite.png"}
              textH2={"Produtos de qualidade"}
              textP={
                <>
                  cuidadosamente escolidos <br /> para um alto nivel de
                  qualidade
                </>
              }
            />
          </StyledBox>

          <StyledBox>
            <SectionQualidade
              srcImg={"/img/joia.png"}
              textH2={"Produtos de qualidade"}
              textP={
                <>
                  cuidadosamente escolidos <br /> para um alto nivel de
                  qualidade
                </>
              }
            />
          </StyledBox>
        </Box>
      </Box>
    </Box>
  );
}