import React from "react";
import { Paragrafo } from "../atoms/Paragrafo";
import { Heading } from "../atoms/Heading";
import { TextoComLogo } from "../molecules/TextoComLogo";
import { Indicator } from "../atoms/Indicator";

export function TextBonari() {
return (
    <section className="textBonari">
    <TextoComLogo
        logoSrc="/img/logo.png"
        logoAlt="Logo Bonari"
        classNameLogo="logo"
        headingText="Bonari"
        classNameHeading="zen-kaku-gothic-antique-regular"
    />
    <div className="divParagrafo">
        <Heading level={2}>O segredo?</Heading>
        <Paragrafo>
        Ingredientes perfeitos e paixão <br /> pela pizza!
        </Paragrafo>
    </div>
    <div className="carousel-indicators">
        <Indicator isActive={true} />
        <Indicator isActive={false} />
        <Indicator isActive={false} />
    </div>
    </section>
);
}