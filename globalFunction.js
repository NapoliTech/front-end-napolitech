

export function errorCampo(campo, span, mensagem){
    span.style.display = 'block';
    campo.style.borderBottom = '1px solid red';
    span.innerHTML = mensagem;
}

export function limparCampos(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderBottom = '2px solid var(--primary-color)';
        const span = input.nextElementSibling;
        if (span && span.tagName === 'SPAN') {
            span.style.display = 'none';
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

    document.getElementById('nextButton').addEventListener('click', showNextImage);
    document.getElementById('prevButton').addEventListener('click', showPrevImage);

    setInterval(showNextImage, 3000);
}