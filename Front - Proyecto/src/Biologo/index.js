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

/************FUNCIONES PARA LA SUBIDA DE SOLICITUD *******************/

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

/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let baseUrl = "http://localhost:8080";
let fauna = [];
let flora = [];
let publicaciones = [];

function ObtenerPublicaciones() {
  fetch(baseUrl + '/vista/all').then(res => {
    res.json().then(json => {
      publicaciones = json;
      ImprimirPublicaciones(publicaciones);
    });
  });
}

function ImprimirPublicaciones(publicaciones) {
  let contenedor = document.querySelector(".mapeo");
  contenedor.innerHTML = "";

  publicaciones.forEach(publicacion => {
    contenedor.innerHTML += MapearPublicaciones(publicacion);
  });
}

function MapearPublicaciones(publicacion) {
  return `       <div class="pub bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
  <div class="mt-2">
      <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
      <span class="textito text-gray-400 ml-2 md:ml-4 lg:ml-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
      <span class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
      <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 mt-2 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[13px]">${publicacion.titulo}</p>
  </div>
  <div class="flex justify-center mt-5 mb-5">
      <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
  </div>
  <div class="flex justify-around">
      <div class="flex">
          <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="md:h-6 md:w-6 md:ml-8 xl:h-6 xl:w-6 xl:ml-8 h-5 lg:ml-0">
          <span class="textito font-bold text-[#241111]ml-2 xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">15</span>
      </div>
      <div class="flex">
          <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 md:ml-8 lg:ml-6 ml-6">
          <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
      </div>
      <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:<span class="nombreC">${publicacion.nombre_cientifico_fauna}</span></span>
      <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
      <input type="text" class="nombreCinput hidden h-6 w-80 mt-3 ml-2"/>
      <div class="contenedorEdicion flex hidden absolute mt-10">
          <button class="guardar relative" onclick="detectarGuardar(this)">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
              <span class="cambioG hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
          </button>
          <button class="cancelar relative ml-4" onclick="detectarCancelar(this)">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
              <span class="cambioC hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
          </button>
      </div>

      <div class="relative inline-block">
          <button class="boton-principal top-1 right-3 relative ">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
          </button>
          <div class="absolute -mt-3 -ml-44">
              <button onclick="detectarEdicion(this)" class="opciones invisible block w-[13rem]">
                  <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                      <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                      <p>Editar Nombre Científico</p>
                  </a>
              </button>
              <button class="opciones invisible block w-[13rem]">
                  <a class="flex bg-white px-2 py-1 text-sm border border-black border-t-0 text-left hover:bg-gray-200" href="Publicacion.html">
                      <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Chat_search_light.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                      <p>Editar Descripción</p>
                  </a>
              </button>
          </div>
      </div>
  </div>
</div>`;
}

/*
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

/*
function ObtenerPublicacionesFauna() {
  // Array para almacenar las promesas de fetch
  const promesasFetch = [];

  // Primer fetch para obtener datos de fauna
  const fetchFauna = fetch(baseUrl + '/fauna/all').then(res => {
    if (!res.ok) {
      throw new Error('Error al obtener datos de fauna');
    }
    return res.json();
  });

  // Segundo fetch para obtener datos de publicaciones
  const fetchPublicaciones = fetch(baseUrl + '/publicaciones/all').then(res => {
    if (!res.ok) {
      throw new Error('Error al obtener datos de publicaciones');
    }
    return res.json();
  });

    // Tercer fetch para obtener datos de estudiantes
    const fetchEstudiante = fetch(baseUrl + '/estudiante/all').then(res => {
      if (!res.ok) {
        throw new Error('Error al obtener datos de estudiante');
      }
      return res.json();
    });

  // Agregar las promesas al array
  promesasFetch.push(fetchFauna, fetchPublicaciones, fetchEstudiante);

  // Ejecutar Promise.all cuando ambas promesas estén resueltas
  Promise.all(promesasFetch)
    .then(resultados => {
      // resultados[0] contendrá los datos de fauna
      // resultados[1] contendrá los datos de publicaciones
      // resultados[2] contendrá los datos de estudiante
      const fauna = resultados[0];
      const publicaciones = resultados[1];
      const estudiante = resultados[2];

      // Aquí puedes combinar ambos conjuntos de datos o realizar otras acciones según tus necesidades
      const datosCombinados = { fauna, publicaciones, estudiante };

      // Llamar a tu método ImprimirPublicacionesFauna con los datos combinados
      ImprimirPublicacionesFauna(datosCombinados);
    })
    .catch(error => {
      console.error(error);
    });
} */