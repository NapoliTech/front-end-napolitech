

export function errorCampo(mensagem){
    errosForm.style.display = 'block'; 
    errosForm.innerHTML += `${mensagem} <br>`;
    const camposForm = document.querySelectorAll(".input-container")
    camposForm.forEach(e =>{
        const inputs = e.querySelectorAll('input')
        inputs.forEach(e =>{
            e.style.border = '1px solid red';

        })
    })
}

export function limparCampos(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderBottom = '2px solid var(--primary-color)';
        const span = input.nextElementSibling;
        if (span && span.tagName === 'SPAN') {
            errosForm.style.display = 'none'; 
        }
    });
}


export function carrossel() {
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

    // document.getElementById('nextButton').addEventListener('click', showNextImage);
    // document.getElementById('prevButton').addEventListener('click', showPrevImage);

    setInterval(showNextImage, 3000);
}