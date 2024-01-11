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

    //Funcion para desplegar barra de busqueda en celulares
    var lupaNeg = document.getElementById('lupota');
    var lupaBlanc = document.getElementById('lupita');
    var buscar = document.querySelector('#busqueda input[type="search"]');
    // Agregar el evento de clic a la imagen de la lupa
    lupaBlanc.addEventListener('click', function() {
      if(window.innerWidth <1024){
          // Mostrar el campo de búsqueda y ocultar la imagen de la lupa
          buscar.style.display = 'block';
          lupaBlanc.style.display = 'none';
          lupaNeg.style.display = 'block';
      }
    });

    // Agregar el evento de clic a la imagen de la otra
    lupaNeg.addEventListener('click', function() {
      if(window.innerWidth <1024){
          // Ocultar el campo de búsqueda y mostrar la imagen de la lupa
          buscar.style.display = 'none';
          lupaBlanc.style.display = 'block';
          lupaNeg.style.display = 'none';
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

document.getElementById('pub').addEventListener('mouseenter', function () {
  this.querySelector('.absolute').classList.remove('hidden');
});

document.getElementById('pub').addEventListener('mouseleave', function () {
  this.querySelector('.absolute').classList.add('hidden');
});

//Función para agregar like a las publicaciones
function DarLike(id) {
  var boton = document.getElementById(id);
  var imagen = boton.getElementsByTagName('img')[0];

  // Verifica la URL actual de la imagen
  var Unlike = imagen.src;
  
  // Define la imagen que se mostrará
  var Like = (Unlike.includes('favorite.png')) ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Like-Icon-03brf3.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true';

  // Cambia la URL de la imagen al dar click
  imagen.src = Like;
}

function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('PerfilUsuario.html')
    .then(response => response.text())
    .then(data => {
      perfilContent.innerHTML = data;
      overlay.style.display = 'block'; // Mostrar la capa oscura
      
      perfilContainer.style.display = 'flex'; // Mostrar el cuadro de perfil
    })
    .catch(error => console.error('Error al cargar el perfil:', error));
}

// Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarPerfil() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');

  overlay.style.display = 'none'; // Ocultar la capa oscura
  perfilContainer.style.display = 'none'; // Ocultar el cuadro de perfil
}

// Asignar evento al clic en la imagen de perfil
document.getElementById('mostrarPerfil').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue

  mostrarPerfil();
});