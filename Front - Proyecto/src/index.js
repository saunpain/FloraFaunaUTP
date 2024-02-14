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
  if (body.classList.contains('inicio')) { //Si reconoce que se está mostrando en inicio, tarda 4 segundos en cambiar de slide
    setInterval(autocambiarSlide, 4000);
  } else {
    setInterval(autocambiarSlide, 15000); //De lo contrario, tarda 15 segundos ya que tiene información
  }

  mostrarSlide(slideActual);
});

   //Funcion para desplegar barra de busqueda en celulares
   var lupaNeg = document.getElementById('lupota');
   var lupaBlanc = document.getElementById('lupita');
   var buscar = document.querySelector('#busqueda input[type="search"]');
   
   // Agregar el evento de clic a la imagen de la lupa
   lupaBlanc.addEventListener('click', function() {
     if(window.innerWidth <1024){
         // Mostrar el campo de búsqueda y ocultar la imagen de la lupa
         buscar.classList.remove("hidden");
         lupaBlanc.classList.add("hidden");
         lupaNeg.classList.remove("hidden");
     }
   });
 
   lupaBlanc.addEventListener('DOMContentLoaded', function() {
     if(window.innerWidth >1024){
         // Mostrar el campo de búsqueda y ocultar la imagen de la lupa
         buscar.classList.remove("hidden");
         lupaBlanc.classList.add("hidden");
         lupaNeg.classList.remove("hidden");
     }
   });
 
   // Agregar el evento de clic a la imagen de la otra
   lupaNeg.addEventListener('click', function() {
     if(window.innerWidth <1024){
         // Ocultar el campo de búsqueda y mostrar la imagen de la lupa
         buscar.classList.add("hidden");
         lupaBlanc.classList.remove("hidden");
         lupaNeg.classList.add("hidden");
     }
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



