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

/*
// Obtener referencias a los elementos HTML
const aprobarBtn = document.getElementById('aprobarBT');
const rechazarBtn = document.getElementById('rechazarBT');
const aprobarImg = document.getElementById('palomita');
const rechazarImg = document.getElementById('equisd');

// Variable para controlar el estado
let estado = ''; // Puede ser 'aprobar', 'rechazar' o ''

// Agregar manejadores de eventos
aprobarBtn.addEventListener('click', () => {
    // Cambiar al estado Aprobar si no está activo actualmente
    if (estado != 'aprobar') {
        estado = 'aprobar';
        aprobarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true";
        rechazarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true";
    } else {
        // Deshacer el estado si ya está activo
        estado = '';
        aprobarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true";
    }
});

rechazarBtn.addEventListener('click', () => {
    // Cambiar al estado Rechazar si no está activo actualmente
    if (estado != 'rechazar') {
        estado = 'rechazar';
        rechazarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true";
        aprobarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true";
    } else {
        // Deshacer el estado si ya está activo
        estado = '';
        rechazarImg.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true";
    }
});
*/


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

function toggleAprobado(id) {
  var botoncito = document.getElementById(id);
  var palomita = botoncito.getElementsByTagName('img')[0];
  var fila = botoncito.closest('tr'); // Obtener la fila actual

  // Desactivar el botón de rechazar en la misma fila
  var equisd = fila.querySelector('.rechazar img');
  equisd.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true';

  // Cambiar el estado del botón de aprobar
  palomita.src = (palomita.src.includes('Shi_Color.png')) ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true';
}

function toggleRechazado(id) {
  var botoncito = document.getElementById(id);
  var equisd = botoncito.getElementsByTagName('img')[0];
  var fila = botoncito.closest('tr'); // Obtener la fila actual

  // Desactivar el botón de aprobar en la misma fila
  var palomita = fila.querySelector('.aprobar img');
  palomita.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';

  // Cambiar el estado del botón de rechazar
  equisd.src = (equisd.src.includes('%C3%91o_Color.png')) ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true';
}
