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


/***************Funciones para editar NombreCientífico*******************/

function detectarEdicion(boton) {
  // Obtener el elemento padre con la clase 'pub'
  var divPub = boton.closest('.pub');

  // Verificar si se encontró un elemento con la clase 'pub'
  if (divPub) {
      // Ejecutar la función editarNombreC con el div pub como argumento
      editarNombreC(divPub);
  } else {
      console.log("No se encontró el elemento 'pub' asociado al botón.");
  }
}



function editarNombreC(divPub) {
  var contenedor = divPub.querySelector('.contenedorEdicion');
  var nombreCElemento = divPub.querySelector('.nombreC');
  var nombreCinput = divPub.querySelector('.nombreCinput');
  var btnEnviar = divPub.querySelector('.guardar');
  var btnCancel = divPub.querySelector('.cancelar');

  // Guardar el valor original en el atributo data-original-value
  nombreCinput.setAttribute('data-original-value', nombreCElemento.innerText);

  contenedor.classList.remove('hidden');
  divPub.classList.remove('hidden');
  nombreCElemento.style.display = "none";
  nombreCinput.style.display = "block";
  nombreCinput.value = nombreCElemento.innerText;
  nombreCinput.removeAttribute("disabled"); // Habilitar el input
  btnEnviar.style.display = "block";
  btnCancel.style.display = "block";

  nombreCinput.focus();
}



/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/
document.addEventListener('DOMContentLoaded', function() {
  var botonesGuardar = document.querySelectorAll('.guardar');

  botonesGuardar.forEach(function(boton) {//Selecciona cual fue el boton de guardar al que se le hizo hover
      boton.addEventListener('mouseover', function() {//Hace que aparezca el texto cuando se hace hover
        var guardar = boton.querySelector('.cambioG');
          guardar.classList.remove('hidden');
        
      });

      boton.addEventListener('mouseleave', function() {//Hace que desaparezca el texto cuando se deja de hacer hover
        var guardar = boton.querySelector('.cambioG');
          guardar.classList.add('hidden');
        
      });

      boton.addEventListener('click', function () {//Hace que desaparezca el texto cuando se hace click en guardar
        var guardar = boton.querySelector('.cambioG');
        guardar.classList.add('hidden');
      });

  });
});


/*Funcion que permite seleccionar el boton cancelar al que se le esta haciendo hover*/ 
/*CANCELAR*/
document.addEventListener('DOMContentLoaded', function() {
  var botonesCancelar = document.querySelectorAll('.cancelar');

  botonesCancelar.forEach(function(boton) {//Selecciona cual fue el boton de guardar al que se le hizo hover
      boton.addEventListener('mouseover', function() {//Hace que aparezca el texto cuando se hace hover
        var cancelar = boton.querySelector('.cambioC');
          cancelar.classList.remove('hidden');
        
      });

      boton.addEventListener('mouseleave', function() {//Hace que desaparezca el texto cuando se deja de hacer hover
        var cancelar = boton.querySelector('.cambioC');
          cancelar.classList.add('hidden');
        
      });

      boton.addEventListener('click', function () {//Hace que desaparezca el texto cuando se hace click en cancelar
        var guardar = boton.querySelector('.cambioC');
        guardar.classList.add('hidden');
      });

  });
});


function detectarGuardar(boton) {
  // Obtener el elemento padre con la clase 'pub'
  var divPub = boton.closest('.pub');

  // Verificar si se encontró un elemento con la clase 'pub'
  if (divPub) {
      // Ejecutar la función editarNombreC con el div pub como argumento
      guardarCambios(divPub);
  } else {
      console.log("No se encontró el elemento 'pub' asociado al botón.");
  }
}

function guardarCambios(divPub) {
  var nombreCElemento = divPub.querySelector(".nombreC");
  var nombreCinput = divPub.querySelector(".nombreCinput");
  var btnEnviar = divPub.querySelector(".guardar");
  var btnCancel = divPub.querySelector(".cancelar");

  nombreCElemento.innerText = nombreCinput.value;
  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  nombreCinput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');
}

function detectarCancelar(boton) {
  // Obtener el elemento padre con la clase 'pub'
  var divPub = boton.closest('.pub');

  // Verificar si se encontró un elemento con la clase 'pub'
  if (divPub) {
      // Ejecutar la función editarNombreC con el div pub como argumento
      cancelarEdicion(divPub);
  } else {
      console.log("No se encontró el elemento 'pub' asociado al botón.");
  }
}

function cancelarEdicion(divPub) {
  var nombreCElemento = divPub.querySelector(".nombreC");
  var nombreCinput = divPub.querySelector(".nombreCinput");
  var btnEnviar = divPub.querySelector(".guardar");
  var btnCancel = divPub.querySelector(".cancelar");

  // Obtener el valor original del atributo data-original-value
  var originalValue = nombreCinput.getAttribute('data-original-value');

  // Restaurar el valor original
  nombreCinput.value = originalValue;

  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  nombreCinput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');
}


function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('http://localhost:5500/Front - Proyecto/src/Biologo/PerfilBiologo.html')
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
  fetch('http://localhost:5500/Front - Proyecto/src/Biologo/PerfilBiologo.html')
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
  fetch('http://localhost:5500/Front - Proyecto/src/Biologo/Solicitud.html')
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

function subirArchivo() {
  var inputElement = document.getElementById("archivoInput");
  var file = inputElement.files[0];

  if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
          var contenidoBase64 = e.target.result.split(",")[1];
          subirArchivoGitHub(file.name, contenidoBase64);
      };
      reader.readAsDataURL(file);
  } else {
      alert("Selecciona un archivo PDF antes de subirlo.");
  }
}

function subirArchivoGitHub(nombreArchivo, contenidoBase64) {
  var owner = "saunpain";
  var repo = "FloraFaunaUTP";
  var filePath = "Solicitudes/" + nombreArchivo; // Ruta en el repositorio (por ejemplo, uploads/nombreArchivo)
  var token = "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"; // Reemplaza con tu token de acceso personal

  var apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  var content = JSON.stringify({
      message: "Solicitud subida",
      content: contenidoBase64
  });

  fetch(apiUrl, {
      method: "PUT",
      headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
      },
      body: content
  })
  .then(response => {
      if (response.ok) {
          alert("Archivo subido exitosamente.");
      } else {
          alert("Error al subir el archivo.");
          console.log("Código de respuesta: " + response.status);
      }
  })
  .catch(error => {
      console.error("Error:", error);
  });
}

let baseUrl = "http://localhost:8080";
let solicitudes = [];

function ObtenerSolicitudes() {
  fetch(baseUrl + '/solicitud/all').then(res => {
    res.json().then(json => {
      solicitudes = json;
      ImprimirSolicitudes();
    });
  });
}

function ImprimirSolicitudes() {
  let contenedor = document.getElementById("cuerpoTabla");
  contenedor.innerHTML = "";

  solicitudes.forEach(solicitud => {
    contenedor.innerHTML += MapearSolicitud(solicitud);
  });
}

/*
function MapearSolicitud(solicitud) {
  return `<tr>
  <td>
    <button class='btn btn-danger btn-sm' onclick="Eliminarsolicitud(${solicitud.id})">Eliminar</button>
    <button class='btn btn-warning btn-sm' onclick="PopularDatosCampos(${solicitud.id})">Actualizar</button>
    </td>
  <td>${solicitud.id}</td>
  <td>${solicitud.nombre}</td>
  <td>${solicitud.precio}</td>
  <td>${solicitud.categoriaId}</td>
  <td>${solicitud.foto}</td>
  <td>${solicitud.fechaProduccion}</td>
  <td>${solicitud.fechaCaducidad}</td>
</tr>`;
}

function GuardarSolicitud() {
  let data = {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    categoriaId: document.getElementById("categoriaId").value,
    foto: document.getElementById("foto").value,
    fechaProduccion: document.getElementById("fechaProduccion").value,
    fechaCaducidad: document.getElementById("fechaCaducidad").value
  };

  fetch(baseUrl + "/producto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'application/json; charset=UTF-8'
    }
  }).then(res => {
    ObtenerProductos();
  });
}
*/

