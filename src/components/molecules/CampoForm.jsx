    import React from 'react';
    import { Input } from '../atoms/Input';
    import { Span } from '../atoms/Span';

    export function CampoForm({ type, placeholder, id, classNameInput, spanText, value,idSpan ,onChange }) {
    return (
        <div className="input-container">
        <Input type={type} placeholder={placeholder} id={id} className={classNameInput} value={value} onChange={onChange} />
        <Span className="spanInput" id={idSpan}> {spanText}</Span>
        </div>
    );
    }