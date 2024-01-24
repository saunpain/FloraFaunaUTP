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


/*Funcion para que aparezcan y desaparezcan los botones*/
document.addEventListener('DOMContentLoaded', function () {
  var botones = document.querySelectorAll('.boton-principal');
  var botonAbierto = null;

  botones.forEach(function (boton) {
      boton.addEventListener('click', function (event) {
          event.stopPropagation();
          if (botonAbierto && botonAbierto !== this) {
              var opcionesAntiguas = botonAbierto.nextElementSibling.querySelectorAll('.opciones');
              opcionesAntiguas.forEach(function (opcion) {
                  opcion.classList.remove('visible');
                  opcion.classList.add('invisible');
              });
          }
          botonAbierto = (botonAbierto === this) ? null : this;

          var opciones = this.nextElementSibling.querySelectorAll('.opciones');

          opciones.forEach(function (opcion) {
              opcion.classList.toggle('invisible');
              opcion.classList.toggle('visible');
          });
      });
  });

  // Cierra las opciones al hacer clic fuera de los botones
  document.addEventListener('click', function () {
      if (botonAbierto) {
          var opcionesAbiertas = document.querySelectorAll('.opciones.visible');
          opcionesAbiertas.forEach(function (opcion) {
              opcion.classList.remove('visible');
              opcion.classList.add('invisible');
          });
          botonAbierto = null;
      }
  });
});


/*Funciones para editar NombreCientífico*/

function editarComentario() {
  var contenedor = document.getElementById("contenedorEdicion")
  var comentarioTextoElemento = document.getElementById("comentarioTexto");
  var comentarioInput = document.getElementById("comentarioInput");
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");

  // Guardar el valor original en el atributo data-original-value
  comentarioInput.setAttribute('data-original-value', comentarioTextoElemento.innerText);

  contenedor.classList.remove('hidden');
  comentarioTextoElemento.style.display = "none";
  comentarioInput.style.display = "block";
  comentarioInput.value = comentarioTextoElemento.innerText;
  comentarioInput.removeAttribute("disabled"); // Habilitar el input
  btnEnviar.style.display = "block";
  btnCancel.style.display = "block";

  comentarioInput.focus();
}

/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/
  document.addEventListener('DOMContentLoaded', function() {
    var botonesGuardar = document.querySelectorAll('.guardar');

    botonesGuardar.forEach(function(boton) {
        boton.addEventListener('mouseover', function() {
            hoverGuardar();/*Una vez identificado el boton se llama la funcion para mostrar u ocultar el texto*/ 
        });

    });
});

/*Función para mostrar u ocultar el texto del boton*/ 
function hoverGuardar() {
  var botonGuardar = document.querySelector(".cambioG");

  botonGuardar.classList.remove('hidden');

  botonGuardar.addEventListener('mouseleave', function () {
      botonGuardar.classList.add('hidden');
  });

  botonGuardar.addEventListener('click', function () {
    botonGuardar.classList.add('hidden');
});
}


/*Funcion que permite seleccionar el boton cancelar al que se le esta haciendo hover*/ 
/*CANCELAR*/
document.addEventListener('DOMContentLoaded', function() {
  var botonesCancelar = document.querySelectorAll('.cancelar');

  botonesCancelar.forEach(function(boton) {
      boton.addEventListener('mouseover', function() {
          hoverCancelar();/*Una vez identificado el boton se llama la funcion para mostrar u ocultar el texto*/ 
      });

  });
});

/*Función para mostrar u ocultar el texto del boton*/ 
function hoverCancelar() {
var botonCancelar = document.querySelector(".cambioC");

botonCancelar.classList.remove('hidden');

botonCancelar.addEventListener('mouseleave', function () {
    botonCancelar.classList.add('hidden');
});

botonCancelar.addEventListener('click', function () {
  botonCancelar.classList.add('hidden');
});

}


function guardarCambios() {
  var comentarioTextoElemento = document.getElementById("comentarioTexto");
  var comentarioInput = document.getElementById("comentarioInput");
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");

  comentarioTextoElemento.innerText = comentarioInput.value;
  comentarioTextoElemento.style.display = "inline-block";
  comentarioInput.style.display = "none";
  comentarioInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  comentarioInput.removeAttribute('data-original-value');
}

function cancelarEdicion() {
  var comentarioTextoElemento = document.getElementById("comentarioTexto");
  var comentarioInput = document.getElementById("comentarioInput");
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");

  // Obtener el valor original del atributo data-original-value
  var originalValue = comentarioInput.getAttribute('data-original-value');

  // Restaurar el valor original
  comentarioInput.value = originalValue;

  comentarioTextoElemento.style.display = "inline-block";
  comentarioInput.style.display = "none";
  comentarioInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  comentarioInput.removeAttribute('data-original-value');
}



function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('http://localhost:5500/src/Biologo/PerfilBiologo.html')
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




