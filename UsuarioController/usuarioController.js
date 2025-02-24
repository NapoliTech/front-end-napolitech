import { CadastrarUsuario, loginUsuario } from '../UsuarioModel/usuarioModel.js';
import { errorCampo, limparCampos } from '../globalFunction.js';


export async function registrar(dadosCadastro) {
    try {
        const newUser = await CadastrarUsuario(dadosCadastro);

        console.log('Usuário registrado com sucesso:', newUser);
        // setTimeout(() => {
        window.location.href = '../Views/login.html';
            
        // }, 1000);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
    }
}


export async function logar(dadosLogin) {
    

    try {
        const user = await loginUsuario(dadosLogin.email, dadosLogin.senha);
        console.log('Usuário logado com sucesso:', user);
        console.log('Usuário logado com sucesso:', user.id);
        localStorage.setItem('userId', user.id);
        alert(`Usuário ${user.nome} logado com sucesso!`);
        setTimeout(() => {
            window.location.href = '../Views/index.html';
        }, 1000);

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        errorCampo(email, spanEmail, 'Usuário ou senha inválidos');
    }
}