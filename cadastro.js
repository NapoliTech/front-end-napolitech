import { errorCampo, limparCampos } from './globalFunction.js';

let dadosCadastro = {
    nome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
    telefone: ''
};

// Elementos do DOM
const nomeFormCadastroForm = document.getElementById('nomeFormCadastro');
const bttcontinuarCadastro = document.getElementById('bttcontinuarCadastro');
const parte1 = document.getElementById('parte1');
const parte2 = document.getElementById('parte2');
const bttEntrar = document.getElementById('bttEntrar');
const bttCriarConta = document.getElementById('bttCriarConta');

// Event Listeners
bttcontinuarCadastro.addEventListener('click', (e) => {
    e.preventDefault();
    validacaoCadastro();
});

bttCriarConta.addEventListener('click', (e) => {
    e.preventDefault();
    validacaoCadastro2();
});

// Função para o carrossel de imagens
function carrossel() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carroselImgs .cardImgs');
    const totalImages = images.length;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        const offset = -currentIndex * 100 / totalImages;
        document.querySelector('.carroselImgs').style.transform = `translateX(${offset}%)`;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        const offset = -currentIndex * 100 / totalImages;
        document.querySelector('.carroselImgs').style.transform = `translateX(${offset}%)`;
    }

    document.getElementById('nextButton').addEventListener('click', showNextImage);
    document.getElementById('prevButton').addEventListener('click', showPrevImage);

    setInterval(showNextImage, 3000);
}

// Função de validação do formulário de cadastro - Parte 1
function validacaoCadastro() {
    const nomeCadastro = document.getElementById('nomeFormCadastro');
    const emailCadastro = document.getElementById('emailCadastro');
    const dataNascimentoCadastro = document.getElementById('dataNascimentoCadastro');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nomeCadastro.value === '') {
        errorCampo(nomeCadastro, document.getElementById('spanNomeCadastro'), 'Preencha o campo nome');
    } else if (nomeCadastro.value.length < 3) {
        errorCampo(nomeCadastro, document.getElementById('spanNomeCadastro'), 'O nome deve ter no mínimo 3 caracteres');
    } else if (emailCadastro.value === '') {
        errorCampo(emailCadastro, document.getElementById('spanEmailCadastro'), 'Preencha o campo email');
    } else if (!emailRegex.test(emailCadastro.value)) {
        errorCampo(emailCadastro, document.getElementById('spanEmailCadastro'), 'Email inválido');
    } else if (dataNascimentoCadastro.value === '') {
        errorCampo(dataNascimentoCadastro, document.getElementById('spanDataNascimentoCadastro'), 'Preencha o campo data de nascimento');
    } else if (!isValidDate(dataNascimentoCadastro.value)) {
        errorCampo(dataNascimentoCadastro, document.getElementById('spanDataNascimentoCadastro'), 'Data de nascimento inválida');
    } else if (!isAdult(dataNascimentoCadastro.value)) {
        errorCampo(dataNascimentoCadastro, document.getElementById('spanDataNascimentoCadastro'), 'Você deve ter pelo menos 18 anos');
    } else {
        limparCampos();
        parte1.style.display = 'none';
        parte2.style.display = 'block';
        bttcontinuarCadastro.style.display = 'none';
        dadosCadastro.nome = nomeCadastro.value;
        dadosCadastro.email = emailCadastro.value;
        dadosCadastro.dataNascimento = dataNascimentoCadastro.value;
        console.log(dadosCadastro);
    }
}

// Função de validação do formulário de cadastro - Parte 2
function validacaoCadastro2() {
    const cpfCadastro = document.getElementById('cpfCadastro');
    const senhaCadastro = document.getElementById('senhaCadastro');
    const confirmarSenhaCadastro = document.getElementById('confirmarSenhaCadastro');
    const telefoneCadastro = document.getElementById('telefoneCadastro');

    // Remove todos os caracteres não numéricos do CPF
    const cpfLimpo = cpfCadastro.value.replace(/\D/g, '');

    if (cpfLimpo === '') {
        errorCampo(cpfCadastro, document.getElementById('spanCpfCadastro'), 'Preencha o campo CPF');
    } else if (cpfLimpo.length !== 11) {
        errorCampo(cpfCadastro, document.getElementById('spanCpfCadastro'), 'CPF deve ter 11 dígitos');
    } else if (!isValidCPF(cpfLimpo)) {
        errorCampo(cpfCadastro, document.getElementById('spanCpfCadastro'), 'CPF inválido');
    } else if (senhaCadastro.value === '') {
        errorCampo(senhaCadastro, document.getElementById('spanSenhaCadastro'), 'Preencha o campo senha');
    } else if (senhaCadastro.value.length < 8) {
        errorCampo(senhaCadastro, document.getElementById('spanSenhaCadastro'), 'A senha deve ter no mínimo 8 caracteres');
    } else if (confirmarSenhaCadastro.value === '') {
        errorCampo(confirmarSenhaCadastro, document.getElementById('spanConfirmarSenhaCadastro'), 'Preencha o campo confirmar senha');
    } else if (senhaCadastro.value !== confirmarSenhaCadastro.value) {
        errorCampo(confirmarSenhaCadastro, document.getElementById('spanConfirmarSenhaCadastro'), 'Senhas não conferem');
    } else if (telefoneCadastro.value === '') {
        errorCampo(telefoneCadastro, document.getElementById('spanTelefoneCadastro'), 'Preencha o campo telefone');
    } else if (telefoneCadastro.value.length < 10) {
        errorCampo(telefoneCadastro, document.getElementById('spanTelefoneCadastro'), 'O telefone deve ter no mínimo 10 dígitos');
    } else {
        limparCampos();
        dadosCadastro.cpf = cpfLimpo;
        dadosCadastro.senha = senhaCadastro.value;
        dadosCadastro.telefone = telefoneCadastro.value;
        console.log(dadosCadastro);
    }
}

// Função para validar a data de nascimento
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

// Função para verificar se o usuário é maior de 18 anos
function isAdult(dateString) {
    const date = new Date(dateString);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
}

// Função para validar o CPF
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

