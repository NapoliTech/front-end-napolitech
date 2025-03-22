import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CampoForm } from "../molecules/CampoForm";
import { Link } from 'react-router-dom';

export function Login() {
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");
const [errors, setErrors] = useState({});
const navigate = useNavigate();

const handleEmailChange = (e) => setEmail(e.target.value);
const handleSenhaChange = (e) => setSenha(e.target.value);

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateSenha = (senha) => {
    const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return senhaRegex.test(senha);
};

const validate = () => {
    const newErrors = {};
    if (!email) {
    newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
    newErrors.email = "Email inválido";
    }
    if (!senha) {
    newErrors.senha = "Senha é obrigatória";
    } else if (!validateSenha(senha)) {
    newErrors.senha = "Senha deve ter pelo menos 8 caracteres, um caractere especial e uma letra maiúscula";
    }
    return newErrors;
};

const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    } else {
    console.log("Email:", email);
    console.log("Senha:", senha);
    setErrors({});
    navigate('/home');
    }
};

const renderErrors = () => {
    return Object.values(errors).join(" ");
};

return (
    <section className="formularios formularioLogin" id="formularioLogin">
    <header>
        <h2>Bem vindo novamente</h2>
        <h1>Entrar</h1>
    </header>

    <form action="" className="formulario" id="formulario" onSubmit={handleSubmit}>
        <CampoForm
        type="email"
        placeholder=" "
        id="email"
        classNameInput="text"
        spanText="Email"
        value={email}
        onChange={handleEmailChange}
        />
        <CampoForm
        type="password"
        placeholder=" "
        id="senha"
        classNameInput="text"
        spanText="Senha"
        value={senha}
        onChange={handleSenhaChange}
        />
    
        <button type="submit" className="btt" id="bttEntrar">Entrar</button>
        <span id="errosForm">{renderErrors()}</span>
    </form>
    <div className="separar">
        <span>ou</span>
    </div>
    <button type="button" className="bttGoogle">Entrar com conta Google</button>
    <p className="linkCriarConta">Ainda não é cadastrado? <Link to="/cadastro" id="criarContaLink"><span>Cadastrar-se</span></Link></p>
    </section>
);
}