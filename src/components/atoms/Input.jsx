    import React from 'react';

    export function Input({ type, placeholder, id, className, value, onChange }) {
    return (
        <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={className}
        value={value}
        onChange={onChange}
        />
    );
    }