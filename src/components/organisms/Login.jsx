import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { CampoForm } from "../molecules/CampoForm";
import { Link } from 'react-router-dom';
import { api } from '../../provider/apiInstance';

export function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Napolitech | Login";
    }, []);

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
        console.log("Formulário enviado");
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            console.log("Erros de validação:", validationErrors);
            setErrors(validationErrors);
        } else {
            console.log("Tentando fazer login...");
            api.post("/api/login", { email, senha })
                .then((response) => {
                    console.log("Resposta da API:", response);
                    if (response.status === 200) {
                        localStorage.setItem("token", response.data);
                        navigate("/pedidos");
                    } else {
                        setErrors({ api: "Erro ao fazer login" });
                    }
                })
                .catch((error) => {
                    console.error("Erro na requisição:", error);
                    setErrors({ api: "Erro ao fazer login" });
                });
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
            <p className="linkCriarConta">Ainda não é cadastrado? <Link to="/Cadastro" id="criarContaLink"><span>Cadastrar-se</span></Link></p>
        </section>
    );
}