import React, { useEffect } from 'react';
import './Carrossel.css';
import { ImageCard } from '../molecules/ImageCard';

export function Carrossel() {
  useEffect(() => {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carroselImgs .cardImgs');
    const totalImages = images.length;
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');

    function showNextImage() {
      currentIndex = (currentIndex + 1) % totalImages;
      const offset = -currentIndex * 100 / totalImages;
      document.querySelector('.carroselImgs').style.transform = `translateX(${offset}%)`;
      updateIndicators(currentIndex);
    }

    function updateIndicators(currentIndex) {
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }

    const interval = setInterval(showNextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="carroselLogin" id="carroselLogin">
      <div className="carroselImgs">
        <ImageCard src="/img/Bg-formularios.jpg" alt="" />
        <ImageCard src="/img/bg-pizzaCaixa.jpg" alt="" />
        <ImageCard src="/img/bg-pizzaMesa.jpg" alt="" />
      </div>
    </section>
  );
}