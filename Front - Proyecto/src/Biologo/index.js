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
  var contenedor = document.getElementById("pub");
  var botonAbierto = null;

  contenedor.addEventListener('click', function (event) {
      var boton = event.target.closest('#boton-principal');
      if (boton) {
          event.stopPropagation();

          // Cierra el botón anteriormente abierto si es diferente
          if (botonAbierto && botonAbierto !== boton) {
              var opcionesAntiguas = botonAbierto.nextElementSibling.querySelectorAll('.opciones');
              opcionesAntiguas.forEach(function (opcion) {
                  opcion.classList.remove('visible');
                  opcion.classList.add('invisible');
              });
          }

          botonAbierto = (botonAbierto === boton) ? null : boton;

          var opciones = boton.nextElementSibling.querySelectorAll('.opciones');

          opciones.forEach(function (opcion) {
              opcion.classList.toggle('invisible');
              opcion.classList.toggle('visible');
          });
      }
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





/***************Funciones para editar NombreCientífico*******************/

function editarNombreC(id) {
  var contenedor = document.getElementById('contenedorEdicion-' + id)
  var nombreCElemento = document.getElementById('nombreC-'+ id);
  var nombreCinput = document.getElementById('input-'+ id);
  var btnEnviar = document.getElementById('guardar-'+ id);
  var btnCancel = document.getElementById('cancelar-'+ id);

  // Guardar el valor original en el atributo data-original-value
  nombreCinput.setAttribute('data-original-value', nombreCElemento.innerText);

  contenedor.classList.remove('hidden');
  nombreCElemento.style.display = "none";
  nombreCinput.style.display = "block";
  nombreCinput.value = nombreCElemento.innerText;
  nombreCinput.removeAttribute("disabled"); // Habilitar el input
  btnEnviar.style.display = "block";
  btnCancel.style.display = "block";

  nombreCinput.focus();
}


/*CHEEEEEEEEEEEEEEEECKPPPPOOOOOOOOOOOOOOOOOOOOOOOOOOOOIIIIIIIIIINTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT*/
/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/

function mouseenterGuardar(id){
    boton = document.getElementById("cambioG-"+ id);
    boton.classList.remove("hidden");
}

function mouseleaveGuardar(id) {
  boton = document.getElementById('cambioG-' + id);
  boton.classList.add('hidden');
}


/*Funcion que permite seleccionar el boton cancelar al que se le esta haciendo hover*/ 
/*CANCELAR*/

function mouseenterCancelar(id){
  boton = document.getElementById("cambioC-"+ id);
  boton.classList.remove("hidden");
}

function mouseleaveCancelar(id) {
boton = document.getElementById('cambioC-' + id);
boton.classList.add('hidden');
}

/*Funciones para guardar y cancelar los cambios de nombre cientifico*/

function guardarCambios(id) {
  var nombreCElemento = document.getElementById("nombreC-" + id);
  var nombreCinput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);
  var botonVisto = document.getElementById("cambioG-" + id);

  nombreCElemento.innerText = nombreCinput.value;
  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  nombreCinput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  botonVisto.classList.add("hidden");

  // Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');
}

function cancelarEdicion(id) {
  var nombreCElemento = document.getElementById("nombreC-" + id);
  var nombreCinput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);
  var botonEquis = document.getElementById("cambioC-" + id);

  // Obtener el valor original del atributo data-original-value
  var originalValue = nombreCinput.getAttribute('data-original-value');

  // Restaurar el valor original
  nombreCinput.value = originalValue;

  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  nombreCinput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  botonEquis.classList.add("hidden");

  // Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');
}

/************************************************ */

function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('http://localhost:5501/Front - Proyecto/src/Biologo/PerfilBiologo.html')
    .then(response => response.text())
    .then(data => {
      perfilContent.innerHTML = data;
      overlay.style.display = 'block'; // Mostrar la capa oscura
      
      perfilContainer.style.display = 'flex'; // Mostrar el cuadro de perfil
    })
    .catch(error => console.error('Error al cargar el perfil:', error));
}

//************INICIO DE LAS FUNCIONES PARA EDITAR DESCRIPCION*******************

function detectarEditarDescripcion(boton){
    // Obtener el elemento padre con la clase 'pub'
    var divPub = boton.closest('.pub');

    // Verificar si se encontró un elemento con la clase 'pub'
    if (divPub) {
        // Ejecutar la función editarNombreC con el div pub como argumento
        editarDescripcion(divPub);
    } else {
        console.log("No se encontró el elemento 'pub' asociado al botón.");
    }
}

function editarDescripcion(divPub){

    var contenedor = divPub.querySelector('.contenedorEdicion');
    var descripcion = divPub.querySelector('.descripcion');
    var descripcionInput = divPub.querySelector('.descripcionInput');
    var btnEnviar = divPub.querySelector('.guardar');
    var btnCancel = divPub.querySelector('.cancelar');
  
    // Guardar el valor original en el atributo data-original-value
    descripcionInput.setAttribute('data-original-value', descripcion.innerText);
  
    contenedor.classList.remove('hidden');
    divPub.classList.remove('hidden');
    descripcion.style.display = "none";
    descripcionInput.style.display = "block";
    descripcionInput.value = descripcion.innerText;
    descripcionInput.removeAttribute("disabled"); // Habilitar el input
    btnEnviar.style.display = "inline-block";
    btnCancel.style.display = "inline-block";
  
    descripcionInput.focus();
  
}

function detectarGuardarDescripcion(boton) {
  // Obtener el elemento padre con la clase 'pub'
  var divPub = boton.closest('.pub');

  // Verificar si se encontró un elemento con la clase 'pub'
  if (divPub) {
      // Ejecutar la función editarNombreC con el div pub como argumento
      guardarDescripcion(divPub);
  } else {
      console.log("No se encontró el elemento 'pub' asociado al botón.");
  }
}

function guardarDescripcion(divPub) {
  var descripcion = divPub.querySelector(".descripcion");
  var descripcionInput = divPub.querySelector(".descripcionInput");
  var btnEnviar = divPub.querySelector(".guardar");
  var btnCancel = divPub.querySelector(".cancelar");

  descripcion.innerText = descripcionInput.value;
  descripcion.style.display = "inline-block";
  descripcionInput.style.display = "none";
  descripcionInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  descripcionInput.removeAttribute('data-original-value');
}

function detectarCancelarDescripcion(boton) {
  // Obtener el elemento padre con la clase 'pub'
  var divPub = boton.closest('.pub');

  // Verificar si se encontró un elemento con la clase 'pub'
  if (divPub) {
      // Ejecutar la función editarNombreC con el div pub como argumento
      cancelarDescripcion(divPub);
  } else {
      console.log("No se encontró el elemento 'pub' asociado al botón.");
  }
}

function cancelarDescripcion(divPub) {
  var descripcion = divPub.querySelector(".descripcion");
  var descripcionInput = divPub.querySelector(".descripcionInput");
  var btnEnviar = divPub.querySelector(".guardar");
  var btnCancel = divPub.querySelector(".cancelar");

  // Obtener el valor original del atributo data-original-value
  var originalValue = descripcionInput.getAttribute('data-original-value');

  // Restaurar el valor original
  descripcionInput.value = originalValue;

  descripcion.style.display = "inline-block";
  descripcionInput.style.display = "none";
  descripcionInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  descripcionInput.removeAttribute('data-original-value');
}

/****************FUNCIONES PARA MOSTRAR EL PERFIL DEL BIOLOGO*************************/

function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('http://localhost:5501/Front - Proyecto/src/Biologo/PerfilBiologo.html')
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

/***************FUNCIONES PARA LA SOLICITUD DE VERIFICACION*******************************/ 

function mostrarVerificacion() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('verificacion');
  var verificacionContainer = document.getElementById('contenedor-verificacion');
  var verificacionContent = document.getElementById('verificacion-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('http://localhost:5501/Front - Proyecto/src/Biologo/Solicitud.html')
    .then(response => response.text())
    .then(data => {
      verificacionContent.innerHTML = data;
      overlay.style.display = 'block'; // Mostrar la capa oscura
      
      verificacionContainer.style.display = 'flex'; // Mostrar el cuadro de perfil
    })
    .catch(error => console.error('Error al cargar el perfil:', error));
}

// Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarVerificacion() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('verificacion');
  var verificacionContainer = document.getElementById('contenedor-verificacion');

  overlay.style.display = 'none'; // Ocultar la capa oscura
  verificacionContainer.style.display = 'none'; // Ocultar el cuadro de perfil
}

// Asignar evento al clic en la imagen de perfil
document.getElementById('mostrarVerificacion').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue

  mostrarVerificacion();
});

/************FUNCIONES PARA LA SUBIDA DE SOLICITUD *******************/

async function subirArchivo() {
  const tituloInput = document.getElementById('tituloInput');
  const archivoInput = document.getElementById('archivoInput');
  const botonSubir = document.getElementById('botonSubir');

  botonSubir.disabled = true;

  const formData = new FormData();
  formData.append('file', archivoInput.files[0]);
  formData.append('titulo', tituloInput.value);

  const backendURL = 'http://localhost:8080/upload';

  try {
    const response = await fetch(backendURL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const message = await response.text();
    console.log(message);
    alert("La solicitud fue enviada.");
  } catch (error) {
    console.error('Error:', error);
    alert("Error, no se pudo enviar la solicitud.");
  } finally {
    botonSubir.disabled = false;
  }
}
