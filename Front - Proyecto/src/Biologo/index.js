let baseUrl = "http://localhost:8080";


function ObtenerBiologo() {
  const user = usuario_name;
  let estado = "";

  fetch(baseUrl + "/biologo/" + user)
    .then(res => res.json())
    .then(data => {
      const fotoPerfil = data.perfil_biologo;
      estado = data.estado;
      var img = document.getElementById("imgPerfil");
      img.src = fotoPerfil;
      localStorage.setItem('id_usuario', data.id_biologo)
      localStorage.setItem('estado_biologo', data.estado)
      console.log(estado)
    })
    .catch(error => {
      console.error(error);
      window.location.href = "/Front - Proyecto/src/Flora y Fauna UTP - inicio.html";
    })
    .finally(() => {
      mapearEstado(estado)
    });
}

function mapearEstado(estado) {
  var estadoB = document.getElementById("estado");
  estadoB.innerHTML = "";

  if (estado !== "Aprobado" && estado !== "En espera") {
    estadoB.insertAdjacentHTML('beforeend', `<button onclick="mostrarVerificacion()" id="mostrarVerificacion" class="text-[#FFFFFF] mr-6 text-sm md:text-lg lg:text-lg xl:text-lg hover:text-[#99E0FF] font-semibold">
                Enviar Solicitud de Verificación
            </button>`);
  }
  else if(estado === "En espera"){
    estadoB.insertAdjacentHTML('beforeend', `<div class="flex mr-5 items-center">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/reloj.png?raw=true" alt="" class="w-7 h-7 mr-2">
              <p class="text-[#FFFFFF] text-sm md:text-lg lg:text-lg xl:text-lg mt-2">Solicitud en espera</p>
          </div>`);
  }
  else if(estado === "Aprobado") {
    estadoB.insertAdjacentHTML('beforeend', `<div class="flex mr-5">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/plantaAprobado.png?raw=true" alt="" class="w-8 h-8 mr-2">
            <p class="text-[#FFFFFF] text-sm md:text-lg lg:text-lg xl:text-lg mt-2">Biólogo verificado</p>
        </div>`);

  }

}

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

  var nuevoNombreCientifico = nombreCinput.value;

  nombreCElemento.innerText = nuevoNombreCientifico;
  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  nombreCinput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  botonVisto.classList.add("hidden");

  // Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');
  DiferenciarFF(id);
}

function DiferenciarFF(id){
  fetch(baseUrl + '/vista/all').then(res => {
    res.json().then(json => {
      publicaciones = json;
      publicaciones.forEach((publicacion) => {
      if(publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" && publicacion.id_publicacion == id){
          ActualizarNombreCFlora(id);
      }
      if(publicacion.nombre_animal !== null && publicacion.nombre_animal !== "" && publicacion.id_publicacion == id){
          ActualizarNombreCFauna(id);
      }
      })
    }
    );
  });
}

function ActualizarNombreCFauna(id) {
  let data = {
    nombre_animal: document.getElementById("animal-" + id).textContent,
    nombre_cientifico_fauna: document.getElementById("input-" + id).value
  };

  console.log('Datos a enviar:', data);

  fetch(baseUrl + "/faunaNombreC", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
  });
}

function ActualizarNombreCFlora(id) {
  let data = {
    nombre_planta: document.getElementById("planta-" + id).textContent,
    nombre_cientifico_flora: document.getElementById("input-" + id).value
  };

  console.log('Datos a enviar:', data);

  fetch(baseUrl + "/floraNombreC", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
  });
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

//************INICIO DE LAS FUNCIONES PARA EDITAR DESCRIPCION*******************

function editarDescripcion(id){

  var contenedor = document.getElementById('contenedorEdicionD-' + id)
  var descripcion = document.getElementById('descripcion-'+ id);
  var descripcionInput = document.getElementById('inputD-'+ id);
  var btnEnviar = document.getElementById('guardarD-'+ id);
  var btnCancel = document.getElementById('cancelarD-'+ id);
  
    // Guardar el valor original en el atributo data-original-value
    descripcionInput.setAttribute('data-original-value', descripcion.innerText);
  
    contenedor.classList.remove('hidden');
    descripcion.style.display = "none";
    descripcionInput.classList.remove('hidden');
    descripcionInput.style.display = "block";
    descripcionInput.value = descripcion.innerText;
    descripcionInput.removeAttribute("disabled"); // Habilitar el input
    btnEnviar.style.display = "inline-block";
    btnCancel.style.display = "inline-block";
    descripcionInput.focus();
  
}

/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/

function mouseenterGuardarD(id){
  boton = document.getElementById("cambioGD-"+ id);
  boton.classList.remove("hidden");
}

function mouseleaveGuardarD(id) {
boton = document.getElementById('cambioGD-' + id);
boton.classList.add('hidden');
}


/*Funcion que permite seleccionar el boton cancelar al que se le esta haciendo hover*/ 
/*CANCELAR*/

function mouseenterCancelarD(id){
boton = document.getElementById("cambioCD-"+ id);
boton.classList.remove("hidden");
}

function mouseleaveCancelarD(id) {
boton = document.getElementById('cambioCD-' + id);
boton.classList.add('hidden');
}

function guardarDescripcion(id) {
  var descripcionElemento = document.getElementById("descripcion-" + id);
  var descripcionInput = document.getElementById("inputD-" + id);
  var btnEnviar = document.getElementById("guardarD-" + id);
  var btnCancel = document.getElementById("cancelarD-" + id);
  var botonVisto = document.getElementById("cambioGD-" + id);

  var nuevaDescripcion = descripcionInput.value;

  descripcionElemento.innerText = nuevaDescripcion;
  descripcionElemento.style.display = "inline-block";
  descripcionInput.style.display = "none";
  descripcionInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  botonVisto.classList.add("hidden");

  // Eliminar el atributo data-original-value
  descripcionInput.removeAttribute('data-original-value');
  DiferenciarFFD(id);
}

function DiferenciarFFD(id){
  fetch(baseUrl + '/vista/all').then(res => {
    res.json().then(json => {
      publicaciones = json;
      publicaciones.forEach((publicacion) => {
      if(publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" && publicacion.id_publicacion == id){
          ActualizarDescripcionFlora(id);
      }
      if(publicacion.nombre_animal !== null && publicacion.nombre_animal !== "" && publicacion.id_publicacion == id){
          ActualizarDescripcionFauna(id);
      }
      })
    }
    );
  });
}

function ActualizarDescripcionFauna(id) {
  let data = {
    nombre_animal: document.getElementById("animal-" + id).textContent,
    descripcion_cientifica_fauna: document.getElementById("inputD-" + id).value
  };

  console.log('Datos a enviar:', data);

  fetch(baseUrl + "/faunaDescripcion", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
  });
}

function ActualizarDescripcionFlora(id) {
  let data = {
    nombre_planta: document.getElementById("planta-" + id).textContent,
    descripcion_cientifica_flora: document.getElementById("inputD-" + id).value
  };

  console.log('Datos a enviar:', data);

  fetch(baseUrl + "/floraDescripcion", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
  });
}

function cancelarDescripcion(id) {
  var descripcionElemento = document.getElementById("descripcion-" + id);
  var descripcionInput = document.getElementById("inputD-" + id);
  var btnEnviar = document.getElementById("guardarD-" + id);
  var btnCancel = document.getElementById("cancelarD-" + id);
  var botonEquis = document.getElementById("cambioCD-" + id);

  // Obtener el valor original del atributo data-original-value
  var originalValue = descripcionInput.getAttribute('data-original-value');

  // Restaurar el valor original
  descripcionInput.value = originalValue;

  descripcionElemento.style.display = "inline-block";
  descripcionInput.style.display = "none";
  descripcionInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  botonEquis.classList.add("hidden");

  // Eliminar el atributo data-original-value
  descripcionInput.removeAttribute('data-original-value');
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

function MostrarPub(id) {
  // Construye la URL con el parámetro
  let url = "Publicacion.html?id=" + id;

  // Redirige a la página de destino
  window.location.href = url;
}

