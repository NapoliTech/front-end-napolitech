

export function errorCampo(campo, span, mensagem){
    span.style.display = 'block';
    campo.style.borderBottom = '1px solid red';
    span.innerHTML = mensagem;
}

export function limparCampos(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderBottom = '2px solid var(--primary-color)';
        const span = input.nextElementSibling;
        if (span && span.tagName === 'SPAN') {
            span.style.display = 'none';
        }
    });
}