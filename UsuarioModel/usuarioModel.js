const API_URL = 'http://localhost:3000/users';



export async function CadastrarUsuario(user) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response.json();
}

export async function loginUsuario(email, senha) {
    const response = await fetch(`${API_URL}?email=${email}&senha=${senha}`);
    const users = await response.json();
    if (users.length > 0) {
        return users[0];
    } else {
        throw new Error('Usuário ou senha inválidos');
    }
}