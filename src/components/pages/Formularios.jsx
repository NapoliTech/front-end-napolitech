    import React from "react";
    import { Routes, Route, Link } from "react-router-dom";
    import { Cadastro } from "../organisms/Cadastro";
    import { Login } from "../organisms/Login";
    import "./Formulario.css"; // Importa o CSS Module

    export default function Formularios() {
    return (
        <div className="body">
        <main className="main">
            <Routes>
            <Route path="login" element={   <Login  />} />
            <Route path="cadastro" element={<Cadastro />} />
            </Routes>
        </main>
        </div>
    );
    }
