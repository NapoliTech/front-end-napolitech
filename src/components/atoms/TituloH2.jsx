import React from "react";




export function TituloH2({text, fontSize, color}){
  return (
    <h2
      style={{
        fontSize: fontSize,
        marginBottom: "16px",
        fontFamily: "Oleo Script",
        fontWeight: 100,
        fontStyle: "normal",
        color: color,
      }}
    >
      {text}
    </h2>
  );

}