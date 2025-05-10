import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CampoForm } from '../molecules/CampoForm';
import { api } from '../../provider/apiInstance';

export function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNasc, setdataNasc] = useState("");
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [errors, setErrors] = useState({});
    const [showParte2, setShowParte2] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Napolitech | Cadastro";
    }, []);

    const handleNomeChange = (e) => setNome(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handledataNascChange = (e) => setdataNasc(e.target.value);    
    const handleCpfChange = (e) => {setCpf(formatCpf(e.target.value));};    
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleConfirmarSenhaChange = (e) => setConfirmarSenha(e.target.value);

    const validateParte1 = () => {
        const newErrors = {};
        if (!nome) newErrors.nome = "Nome é obrigatório";
        if (!email) newErrors.email = "Email é obrigatório";
        if (!dataNasc) newErrors.dataNasc = "Data de Nascimento é obrigatória";
        return newErrors;
    };

    const validateParte2 = () => {
        const newErrors = {};
        if (!cpf) {
            newErrors.cpf = "CPF é obrigatório";
        } else if (cpf.length < 11) {
            newErrors.cpf = "CPF deve ter 11 dígitos";
        }
        if (!senha) {
            newErrors.senha = "Senha é obrigatória";
        } else if (!validateSenha(senha)) {
            newErrors.senha = "Senha deve ter pelo menos 8 caracteres, um caractere especial e uma letra maiúscula";
        }
        if (senha !== confirmarSenha) {
            newErrors.confirmarSenha = "As senhas não coincidem";
        }
        return newErrors;
    };

    const formatCpf = (value) => {
        return value
            .replace(/\D/g, "") 
            .replace(/(\d{3})(\d)/, "$1.$2") 
            .replace(/(\d{3})(\d)/, "$1.$2") 
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
    };
    

    const validateSenha = (senha) => {
        const senhaRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return senhaRegex.test(senha);
    };

    const handleContinue = (e) => {
        e.preventDefault();
        const validationErrors = validateParte1();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setShowParte2(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateParte2();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const usuario = {
                nome,
                email,
                dataNasc: dataNasc.split("-").reverse().join("/"),
                cpf,
                senha,
                confirmarSenha,
                telefone: "(11) 99999-9999" 
            };

            console.log("JSON DE USUARIO PARA O CADASTRO:", usuario);
            setErrors({});

            api.post('/api/cadastro', usuario)
                .then((response) => {
                    console.log(response.data);
                    alert("Cadastro realizado com sucesso!"); // Exibe mensagem de sucesso
                    navigate('/login'); // Redireciona para a página de login
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar:", error);
                    alert(error.response?.data?.message || "Erro ao cadastrar. Tente novamente."); // Exibe mensagem de erro
                });
        }
    };

    const renderErrors = () => {
        return Object.values(errors).join(" ");
    };

    return (
        <section className="formularios formularioCadastro" id="formularioCadastro">
            <header>
                <h2>Crie sua conta</h2>
                <h2 className="linkCriarConta">Já possui uma conta? <Link to="/login" id="loginLink"><span>Entrar</span></Link></h2>
            </header>
            <form action="" className="formulario" id="formulario">
                {!showParte2 && (
                    <div id="parte1">
                        <CampoForm
                            type="text"
                            placeholder=" "
                            id="nomeFormCadastro"
                            classNameInput="text"
                            spanText="Nome"
                            value={nome}
                            onChange={handleNomeChange}
                        />

                        <CampoForm
                            type="email"
                            placeholder=" "
                            id="emailCadastro"
                            classNameInput="text"
                            spanText="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <CampoForm
                            type="date"
                            placeholder=" "
                            id="dataNascCadastro"
                            classNameInput="text"
                            spanText="Data de Nascimento"
                            value={dataNasc}
                            onChange={handledataNascChange}
                        />
                    </div>
                )}

                {showParte2 && (
                    <div id="parte2">
                        <CampoForm
                            type="text"
                            placeholder=" "
                            id="cpfCadastro"
                            classNameInput="text"
                            spanText="CPF"
                            value={cpf}
                            onChange={handleCpfChange}
                        />

                        <CampoForm
                            type="password"
                            placeholder=" "
                            id="senhaCadastro"
                            classNameInput="text"
                            spanText="Senha"
                            value={senha}
                            onChange={handleSenhaChange}
                        />

                        <CampoForm
                            type="password"
                            placeholder=" "
                            id="confirmarSenhaCadastro"
                            classNameInput="text"
                            spanText="Confirmar Senha"
                            value={confirmarSenha}
                            onChange={handleConfirmarSenhaChange}
                        />
                    </div>
                )}
                <button type="button" className="btt" id="bttcontinuarCadastro" onClick={showParte2 ? handleSubmit : handleContinue}>
                    {showParte2 ? "Cadastrar-se" : "Continuar"}
                </button>
            </form>
            <span id="errosForm">{renderErrors()}</span>
            <div className="separar">
                <span>Ou</span>
            </div>
            <button type="button" className="bttGoogle">Login com Google</button>
        </section>
    );
}