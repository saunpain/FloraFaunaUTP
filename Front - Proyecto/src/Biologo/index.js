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

  // Cambia los Slides cada determinado tiempo
  function autocambiarSlide() {
    slideActual = (slideActual + 1) % slides.length;
    mostrarSlide(slideActual);
  }

  var body = document.body;
  if (body.classList.contains('inicio')) {
    setInterval(autocambiarSlide, 4000);
  } else {
    setInterval(autocambiarSlide, 15000);
  }

  mostrarSlide(slideActual);
});

//Función para activar y desactivar aside en celulares
document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');
  var miAside = document.getElementById('aside');

  toggleButton.addEventListener('click', function () {
      miAside.classList.toggle('hidden');

      // Cambia las clases del botón
      toggleButton.classList.toggle('opened');
      toggleButton.classList.toggle('closed');
  });
});

//Función para activar y desactivar botones de edición
document.addEventListener('DOMContentLoaded', function () {
  // Obtén todos los elementos con la clase 'boton'
  var botones = document.getElementsByClassName('boton');

  // Itera sobre cada botón
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function () {
      // Encuentra el elemento 'opcion' correspondiente a este botón
      var opcion = this.nextElementSibling;

      // Alternar la clase 'hidden' en el elemento 'opcion'
      opcion.classList.toggle('hidden');
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  var botonPrincipal = document.querySelector('.boton-principal');
  var opciones = document.querySelectorAll('.opciones');

  botonPrincipal.addEventListener('click', function () {
    opciones.forEach(function(opcion) {
      opcion.classList.toggle('hidden');
    });
  });
});


