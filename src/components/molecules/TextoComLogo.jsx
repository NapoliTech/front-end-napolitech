import React from "react";
import { Logo } from "../atoms/Logo";
import { Heading } from "../atoms/Heading";


export function TextoComLogo({ logoSrc, logoAlt, classNameLogo,classNameHeading,headingText }) {
    return (
        <div className="divLogo">
            <Logo src={logoSrc} alt={logoAlt} className={classNameLogo} />
            <Heading level={1} className={classNameHeading}>{headingText}</Heading>
        </div>
    )
}