const continuarCadastro = document.getElementById('continuarCadastro');
const parte1 = document.getElementById('parte1');
const parte2 = document.getElementById('parte2');

continuarCadastro.addEventListener('click', function() {
    parte1.classList.add('hidden');
    parte2.classList.remove('hidden');
});

function animacaoTelas(){
    const formularioLogin = document.getElementById('formularioLogin');
    const carroselLogin = document.getElementById('carroselLogin');
    const formularioCadastro = document.getElementById('formularioCadastro');

    document.getElementById('criarContaLink').addEventListener('click', function(event) {
        event.preventDefault();
        if(formularioLogin.classList.contains('slide-in-right')){
            formularioLogin.classList.remove('slide-in-right');
        }
        formularioLogin.classList.add('slide-out-left');
        carroselLogin.classList.add('slide-out-left');
        setTimeout(function() {
            carroselLogin.classList.remove('slide-out-left');
            formularioLogin.classList.add('hidden');
            formularioLogin.classList.remove('block');
            formularioCadastro.classList.add('block');
            formularioCadastro.classList.add('slide-in-right');
            carroselLogin.classList.add('slide-in-right');
            carroselLogin.classList.remove('slide-in-right');
        }, 600); // Tempo da animação
    });

    document.getElementById('loginLink').addEventListener('click', function(event) {
        event.preventDefault();
        formularioCadastro.classList.add('slide-out-right');
        carroselLogin.classList.add('slide-out-right');
        
        setTimeout(function() {
            carroselLogin.classList.remove('slide-out-right');
            formularioCadastro.classList.remove('block');
            formularioCadastro.classList.add('hidden');
            formularioLogin.classList.add('block');
            formularioLogin.classList.remove('hidden');
            formularioLogin.classList.add('slide-in-right');
            formularioLogin.classList.remove('slide-out-left');
            carroselLogin.classList.add('slide-in-right');
            carroselLogin.classList.remove('slide-in-right');
            carroselLogin.classList.remove('slide-out-right');
            formularioCadastro.classList.remove('slide-out-right');
        }, 600); // Tempo da animação
    });
}

animacaoTelas();