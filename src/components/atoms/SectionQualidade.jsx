import React from "react";



export function SectionQualidade({srcImg, textH2, textP}) {

  return (
    <>
      <img src={srcImg} alt="textH2" />
      <h2>{textH2}</h2>
      <p>{textP}</p>
    </>
  ); 

}