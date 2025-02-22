import { errorCampo, limparCampos } from './globalFunction.js';
let  dadosLogin = {
    email: '',
    senha: ''   
};

// const bttcontinuarCadastro = document.getElementById('bttcontinuarCadastro');
// const parte1 = document.getElementById('parte1');
// const parte2 = document.getElementById('parte2');
// const bttEntrar = document.getElementById('bttEntrar');

// bttcontinuarCadastro.addEventListener('click', (e)=> {  
//     e.preventDefault();
//     validacaoCadastro();
//     })


function carrossel(){


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







bttEntrar.addEventListener('click', (e)=> {
    e.preventDefault();
    validacaoFormulario(); 
    console.log(dadosLogin);
})






function validacaoFormulario(){
    let emailFormulario = document.getElementById('email').value;
    let senhaFormulario = document.getElementById('senha').value;
    

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let senhaRegex = /(?=.*[A-Z])(?=.*[!@#$%^&*])/;

    if(emailFormulario == ''){
        errorCampo(email, spanEmail, 'Preencha o campo email');
    } else if(!emailRegex.test(emailFormulario)){
        errorCampo(email, spanEmail, 'Preencha um email válido');
    } 
    else if(senhaFormulario == ''){
        errorCampo(senha, spanSenha, 'Preencha o campo senha');
    } else if(senhaFormulario.length < 6){
        errorCampo(senha, spanSenha, 'A senha deve ter no mínimo 6 caracteres');
    }else if(!senhaRegex.test(senhaFormulario)){
        errorCampo(senha, spanSenha, 'A senha deve ter pelo menos uma letra maiúscula e um caractere especial');
    } 
    else{
        limparCampos()
        
        return dadosLogin = {
            email: emailFormulario,
            senha: senhaFormulario
        };
    }

        
}





carrossel();

