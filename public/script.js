import { errorCampo, limparCampos, carrossel } from '../globalFunction.js';
import { logar} from '../UsuarioController/usuarioController.js';



let dadosLogin = {
    email: '',
    senha: ''
};


bttEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    validacaoFormulario();
    console.log(dadosLogin);
});

function validacaoFormulario() {
    let emailFormulario = document.getElementById('email').value;
    let senhaFormulario = document.getElementById('senha').value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let senhaRegex = /(?=.*[A-Z])(?=.*[!@#$%^&*])/;

    if (emailFormulario == '') {
        errorCampo('Preencha o campo email');
    } else if (!emailRegex.test(emailFormulario)) {
        errorCampo('Preencha um email válido');
    } else if (senhaFormulario == '') {
        errorCampo('Preencha o campo senha');
    } else if (senhaFormulario.length < 6) {
        errorCampo('senha incorreta');
    } else if (!senhaRegex.test(senhaFormulario)) {
        errorCampo('senha incorreta');
    } else {
        limparCampos();
        dadosLogin = {
            email: emailFormulario,
            senha: senhaFormulario
        };
        logar(dadosLogin)
    }
}

const bttCriarConta = document.getElementById('criarContaLink');

bttCriarConta.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.add('slide-out-left');
    setTimeout(() => {
        window.location.href = 'cadastro.html';
    }, 1000); 
});


carrossel();

