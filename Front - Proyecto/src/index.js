
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



function mostrarInicioS(event) {
  event.preventDefault();
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('login');
  var loginContainer = document.getElementById('contenedor-login');
  var loginContent = document.getElementById('login-contenido');
  // Cargar dinámicamente el contenido
  fetch('/Front - Proyecto/src/Auth/login.html')
    .then(response => response.text())
    .then(data => {
      loginContent.innerHTML = data;
      overlay.style.display = 'block';
      
      loginContainer.style.display = 'flex';
    })
    .catch(error => console.error(error));
}

function mostrarRegistro(event) {
  event.preventDefault();
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('registro');
  var registroContainer = document.getElementById('contenedor-registro');
  var registroContent = document.getElementById('registro-contenido');

  cerrarLogin();
  fetch('/Front - Proyecto/src/Auth/Registro.html')
    .then(response => response.text())
    .then(data => {
      registroContent.innerHTML = data;
      overlay.style.display = 'block';
      
      registroContainer.style.display = 'flex';
    })
    .catch(error => console.error(error));
}

function mostrarR1() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('reestablecer1');
  var rpContainer = document.getElementById('contenedor-reestablecer1');
  var rpContent = document.getElementById('reestablecer1-contenido');

  cerrarLogin();
  // Cargar dinámicamente el contenido
  fetch('/Front - Proyecto/src/Auth/Reestablecer_contraseña.html')
    .then(response => response.text())
    .then(data => {
      rpContent.innerHTML = data;
      overlay.style.display = 'block';
      
      rpContainer.style.display = 'flex'; 
    })
    .catch(error => console.error(error));
}


function mostrarR2() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('reestablecer2');
  var rp2Container = document.getElementById('contenedor-reestablecer2');
  var rp2Content = document.getElementById('reestablecer2-contenido');

  cerrarR1();
  // Cargar dinámicamente el contenido
  fetch('/Front - Proyecto/src/Auth/Revisa_tu_bandeja.html')
    .then(response => response.text())
    .then(data => {
      rp2Content.innerHTML = data;
      overlay.style.display = 'block';
      
      rp2Container.style.display = 'flex'; 
    })
    .catch(error => console.error(error));
}

function mostrarR3() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('reestablecer3');
  var rp3Container = document.getElementById('contenedor-reestablecer3');
  var rp3Content = document.getElementById('reestablecer3-contenido');

  cerrarLogin();
  // Cargar dinámicamente el contenido
  fetch('/Front - Proyecto/src/Auth/Reestablezca_contraseña.html')
    .then(response => response.text())
    .then(data => {
      rp3Content.innerHTML = data;
      overlay.style.display = 'block';
      
      rp3Container.style.display = 'flex'; 
    })
    .catch(error => console.error(error));
}


function cerrarRegistro() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('registro');
  var registroContainer = document.getElementById('contenedor-registro');

  overlay.style.display = 'none';
  registroContainer.style.display = 'none';
}

function cerrarLogin() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('login');
  var loginContainer = document.getElementById('contenedor-login');

  overlay.style.display = 'none';
  loginContainer.style.display = 'none';
}

function cerrarR1() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('reestablecer1');
  var rpContainer = document.getElementById('contenedor-reestablecer1');

  overlay.style.display = 'none';
  rpContainer.style.display = 'none';
}

function cerrarR2() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('reestablecer2');
  var rp2Container = document.getElementById('contenedor-reestablecer2');

  overlay.style.display = 'none';
  rp2Container.style.display = 'none';
}

function cerrarR3() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('reestablecer3');
  var rp3Container = document.getElementById('contenedor-reestablecer3');

  overlay.style.display = 'none';
  rp3Container.style.display = 'none';
}

