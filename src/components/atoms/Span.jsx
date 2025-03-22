import React from "react";


export function Span({ className, children, id }) {
    return (
        <span className={className} id={id} >{children} </span>
    );
}