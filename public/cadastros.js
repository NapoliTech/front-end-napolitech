import { errorCampo, limparCampos, carrossel } from '../globalFunction.js';
import { registrar} from '../UsuarioController/usuarioController.js';

let dadosCadastro = {
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    telefone: ''
};

const nomeFormCadastroForm = document.getElementById('nomeFormCadastro');
const bttcontinuarCadastro = document.getElementById('bttcontinuarCadastro');
const parte1 = document.getElementById('parte1');
const parte2 = document.getElementById('parte2');
const bttEntrar = document.getElementById('bttEntrar');
const bttCriarConta = document.getElementById('bttCriarConta');

bttcontinuarCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    validacaoCadastro();
});  

bttCriarConta.addEventListener('click', (e) => {
    e.preventDefault();
    validacaoCadastro2();
});


function validacaoCadastro() {
    const nomeCadastro = document.getElementById('nomeFormCadastro');
    const emailCadastro = document.getElementById('emailCadastro');
    const dataNascimentoCadastro = document.getElementById('dataNascimentoCadastro');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nomeCadastro.value === '') {
        errorCampo('Preencha o campo nome');
    } else if (nomeCadastro.value.length < 3) {
        errorCampo('O nome deve ter no mínimo 3 caracteres');
    } else if (emailCadastro.value === '') {
        errorCampo('Preencha o campo email');
    } else if (!emailRegex.test(emailCadastro.value)) {
        errorCampo('Email inválido');
    } else if (dataNascimentoCadastro.value === '') {
        errorCampo('Preencha o campo data de nascimento');
    } else if (!isValidDate(dataNascimentoCadastro.value)) {
        errorCampo('Data de nascimento inválida');
    } else if (!isAdult(dataNascimentoCadastro.value)) {
        errorCampo('Você deve ter pelo menos 18 anos');
    } else {
        limparCampos();
        errosForm.innerHTML = '';
        parte1.style.display = 'none';
        parte2.style.display = 'flex';
        parte2.classList.add('formularioFormatado');
        bttcontinuarCadastro.style.display = 'none';
        dadosCadastro.nome = nomeCadastro.value;
        dadosCadastro.email = emailCadastro.value;
        dadosCadastro.dataNascimento = dataNascimentoCadastro.value;
        console.log(dadosCadastro);
    
    
    }
}

function validacaoCadastro2() {
    const cpfCadastro = document.getElementById('cpfCadastro');
    const senhaCadastro = document.getElementById('senhaCadastro');
    const confirmarSenhaCadastro = document.getElementById('confirmarSenhaCadastro');
    const telefoneCadastro = document.getElementById('telefoneCadastro');

    const cpfLimpo = cpfCadastro.value.replace(/\D/g, '');

    if (cpfLimpo === '') {
        errorCampo('Preencha o campo CPF');
    } else if (cpfLimpo.length !== 11) {
        errorCampo('CPF deve ter 11 dígitos');
    } else if (!isValidCPF(cpfLimpo)) {
        errorCampo('CPF inválido');
    } else if (senhaCadastro.value === '') {
        errorCampo('Preencha o campo senha');
    } else if (senhaCadastro.value.length < 8) {
        errorCampo('A senha deve ter no mínimo 8 caracteres');
    } else if (confirmarSenhaCadastro.value === '') {
        errorCampo('Preencha o campo confirmar senha');
    } else if (senhaCadastro.value !== confirmarSenhaCadastro.value) {
        errorCampo('Senhas não conferem');
    } else if (telefoneCadastro.value === '') {
        errorCampo('Preencha o campo telefone');
    } else if (telefoneCadastro.value.length < 10) {
        errorCampo('O telefone deve ter no mínimo 10 dígitos');
    } else {
        limparCampos();
        dadosCadastro.cpf = cpfLimpo;
        dadosCadastro.senha = senhaCadastro.value;
        dadosCadastro.telefone = telefoneCadastro.value;

        console.log(dadosCadastro);
        registrar(dadosCadastro);
    }
}

function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

function isAdult(dateString) {
    const date = new Date(dateString);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
}

function isValidCPF(cpf) {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[\s.-]*/igm, '');
    if (
        !cpf ||
        cpf.length !== 11 ||
        /^(\d)\1{10}$/.test(cpf)
    ) {
        return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) 
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

carrossel();

