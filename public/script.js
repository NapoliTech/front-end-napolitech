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
        errorCampo(email, spanEmail, 'Preencha o campo email');
    } else if (!emailRegex.test(emailFormulario)) {
        errorCampo(email, spanEmail, 'Preencha um email válido');
    } else if (senhaFormulario == '') {
        errorCampo(senha, spanSenha, 'Preencha o campo senha');
    } else if (senhaFormulario.length < 6) {
        errorCampo(senha, spanSenha, 'A senha deve ter no mínimo 6 caracteres');
    } else if (!senhaRegex.test(senhaFormulario)) {
        errorCampo(senha, spanSenha, 'A senha deve ter pelo menos uma letra maiúscula e um caractere especial');
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

