document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slider li");
    const menu = document.querySelectorAll(".menu li a");
  
    let slideActual = 0;
  
    //Muestra los Slides uno por uno
    function mostrarSlide(index) {
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.style.opacity = 1;
        } else {
          slide.style.opacity = 0;
        }
      });
  
      // Permite reconocer qué Slide está presentandose
      menu.forEach((menuItem, i) => {
        if (i === index) {
          menuItem.classList.add("active");
        } else {
          menuItem.classList.remove("active");
        }
      });
    }
  
    // Cambia de Slide al tocar los botones
    function cambiarSlide(index) {
      slideActual = index;
      mostrarSlide(slideActual);
    }
    menu.forEach((menuItem, index) => {
      menuItem.addEventListener("click", function (event) {
        event.preventDefault();
        cambiarSlide(index);
      });
    });
  
    // Cambia los Slides cada 4 segundos
    function autocambiarSlide() {
      slideActual = (slideActual + 1) % slides.length;
      mostrarSlide(slideActual);
    }
  
    setInterval(autocambiarSlide, 4000);
  
    // Mostrar el primer slide al cargar la página
    mostrarSlide(slideActual);
  });
  