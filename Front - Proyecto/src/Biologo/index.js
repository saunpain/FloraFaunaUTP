let baseUrl = "http://localhost:8080";


//Función para obtener los datos del biólogo que inició sesión
function ObtenerBiologo() {
  //Obtener el nombre de usuario del biólogo actual 
  const user = usuario_name;
  
  //Variable para guardar el estado del biólogo
  let estado = "";


  fetch(baseUrl + "/biologo/" + user)//Fetch para llamar el método del Java que trae al biologo segun su usuario
    .then(res => res.json())
    .then(data => {
      //Trae la URL de la foto de perfil y el estado del biólogo 
      const fotoPerfil = data.perfil_biologo;
      estado = data.estado;

      //Actualiza la imagen de perfil con la URL obtenida
      var img = document.getElementById("imgPerfil");
      img.src = fotoPerfil;

      //Almacenar información relevante en el almacenamiento local del navegador *PENDIENTE*
      localStorage.setItem('id_usuario', data.id_biologo)
      localStorage.setItem('estado_biologo', data.estado)

      console.log(estado)
    })
    .catch(error => {
      console.error(error);
      window.location.href = "/Front - Proyecto/src/Flora y Fauna UTP - inicio.html";
    })
    .finally(() => {
      //Llamar a la función para mapear el estado del biólogo
      mapearEstado(estado)
    });
}

//Función para cambiar y mapear el estado del biólogo
function mapearEstado(estado) {

  var estadoB = document.getElementById("estado");

  //Limpiar el contenido actual del elemento
  estadoB.innerHTML = "";

  //Verificación del estado y mostrarlo según el valor que tenga
  if (estado !== "Aprobado" && estado !== "En espera") {
    //Mostrar botón para enviar solicitud de verificación si el estado no es "Aprobado" ni "En espera", es decir, cuando el estado es "Rechazado" o "Sin Estado"
    estadoB.insertAdjacentHTML('beforeend', `<button onclick="mostrarVerificacion()" id="mostrarVerificacion" class="text-[#FFFFFF] ml-4 mr-4 text-xs md:text-lg lg:text-lg xl:text-lg hover:text-[#99E0FF] font-semibold">
                Enviar Solicitud de Verificación
            </button>`);
  }
  else if(estado === "En espera"){
    //Mostrar mensaje e imagen de reloj si el estado es "En espera"
    estadoB.insertAdjacentHTML('beforeend', `<div class="flex mr-5 items-center">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/reloj.png?raw=true" alt="" class="w-7 h-7 mr-2">
              <p class="text-[#FFFFFF] text-sm md:text-lg lg:text-lg xl:text-lg mt-2">Solicitud en espera</p>
          </div>`);
  }
  else if(estado === "Aprobado") {
    //Mostrar mensaje e imagen de plantita si el estado es "Aprobado"
    estadoB.insertAdjacentHTML('beforeend', `<div class="flex mr-5">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/plantaAprobado.png?raw=true" alt="" class="w-8 h-8 mr-2">
            <p class="text-[#FFFFFF] text-sm md:text-lg lg:text-lg xl:text-lg mt-2">Biólogo verificado</p>
        </div>`);
  }
}


//Función para manejar la apertura y cierre de opciones al hacer clic en un botón
document.addEventListener('DOMContentLoaded', function () {
  //Obtener el contenedor principal que contiene los botones para editar
  var contenedor = document.getElementById("pub");
  //Variable para almacenar el botón abierto
  var botonAbierto = null;

  //Agregar un evento de clic al contenedor principal
  contenedor.addEventListener('click', function (event) {
    //Obtener el botón más cercano al elemento clicado
    var boton = event.target.closest('#boton-principal');
    
    if (boton) {
      event.stopPropagation();

      //Cierra el botón abierto si es diferente
      if (botonAbierto && botonAbierto !== boton) {
        var opcionesAntiguas = botonAbierto.nextElementSibling.querySelectorAll('.opciones');
        
        opcionesAntiguas.forEach(function (opcion) {
          opcion.classList.remove('visible');
          opcion.classList.add('invisible');
        });
      }

      //Cambia el estado del botón abierto
      botonAbierto = (botonAbierto === boton) ? null : boton;

      //Obtener las opciones asociadas al botón clicado
      var opciones = boton.nextElementSibling.querySelectorAll('.opciones');

      //Alternar la visibilidad de las opciones (mostrar/ocultar)
      opciones.forEach(function (opcion) {
        opcion.classList.toggle('invisible');
        opcion.classList.toggle('visible');
      });
    }
  });

  //Cierra las opciones al hacer clic fuera de los botones
  document.addEventListener('click', function () {
    if (botonAbierto) {
      // Obtener todas las opciones visibles en la página
      var opcionesAbiertas = document.querySelectorAll('.opciones.visible');
      
      // Ocultar todas las opciones visibles
      opcionesAbiertas.forEach(function (opcion) {
        opcion.classList.remove('visible');
        opcion.classList.add('invisible');
      });

      // Restablecer la variable del botón abierto a null
      botonAbierto = null;
    }
  });
});



/***************Funciones para editar NombreCientífico*******************/

function editarNombreC(id) {
  var contenedor = document.getElementById('contenedorEdicion-' + id); // Obtiene el contenedor con los botones de guardar y cancelar
  var nombreCElemento = document.getElementById('nombreC-' + id); // Obtiene el elemento con el nombre científico
  var nombreCinput = document.getElementById('input-' + id); // Obtiene el elemento con el input
  var btnEnviar = document.getElementById('guardar-' + id); // Obtiene el botón de guardar
  var btnCancel = document.getElementById('cancelar-' + id); // Obtiene el botón de cancelar

  // Guardar el valor original en el atributo data-original-value
  nombreCinput.setAttribute('data-original-value', nombreCElemento.innerText);

  // Hacer visible el contenedor con los botones
  contenedor.classList.remove('hidden');

  // Ocultar el elemento con el nombre científico y mostrar el input
  nombreCElemento.style.display = "none";
  nombreCinput.style.display = "block";

  // Asignar el valor actual del nombre científico al input
  nombreCinput.value = nombreCElemento.innerText;

  // Habilitar el input para la edición
  nombreCinput.removeAttribute("disabled");

  // Mostrar los botones de guardar y cancelar
  btnEnviar.style.display = "block";
  btnCancel.style.display = "block";

  // Enfocar el input para facilitar la edición
  nombreCinput.focus();
}



/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/

function mouseenterGuardar(id){//Función que muestra el texto "Guardar cambios" al hacer hover
    boton = document.getElementById("cambioG-"+ id);
    boton.classList.remove("hidden");
}

function mouseleaveGuardar(id) {//Función que esconde el texto "Guardar cambios" al quitarle el mouse de encima
  boton = document.getElementById('cambioG-' + id);
  boton.classList.add('hidden');
}


/*Funcion que permite seleccionar el boton cancelar al que se le esta haciendo hover*/ 
/*CANCELAR*/

function mouseenterCancelar(id){//Función que muestra el texto "Cancelar" al hacer hover
  boton = document.getElementById("cambioC-"+ id);
  boton.classList.remove("hidden");
}

function mouseleaveCancelar(id) {//Función que esconde el texto "Cancelar" al quitarle el mouse de encima
boton = document.getElementById('cambioC-' + id);
boton.classList.add('hidden');
}


//Función para guardar los cambios realizados en el nombre científico
function guardarCambios(id) {
  //Obtener elementos del DOM
  var nombreCElemento = document.getElementById("nombreC-" + id);
  var nombreCinput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);
  var botonVisto = document.getElementById("cambioG-" + id);

  //Obtener el nuevo nombre científico del input
  var nuevoNombreCientifico = nombreCinput.value;

  //Actualizar el nombre científico en el elemento original
  nombreCElemento.innerText = nuevoNombreCientifico;
  //Mostrar el elemento original y ocultar el input
  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";
  //Deshabilitar el input
  nombreCinput.setAttribute("disabled", true);
  //Ocultar botones de guardar y cancelar
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  //Ocultar el texto "Guardar Cambios"
  botonVisto.classList.add("hidden");

  //Eliminar el atributo data-original-value
  nombreCinput.removeAttribute('data-original-value');

  // Llamar a la función para diferenciar la publicacion entre Flora y Fauna
  DiferenciarFF(id);
}

// Función para diferenciar entre flora y fauna y actualizar el nombre científico
function DiferenciarFF(id) {
  fetch(baseUrl + '/vista/all').then(res => {
    res.json().then(json => {
      publicaciones = json;
      publicaciones.forEach((publicacion) => {
        if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" && publicacion.id_publicacion == id) {
          // Si la publicación es de flora, llamar a la función para actualizar el nombre científico de flora
          ActualizarNombreCFlora(id);
        }
        if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "" && publicacion.id_publicacion == id) {
          // Si la publicación es de fauna, llamar a la función para actualizar el nombre científico de fauna
          ActualizarNombreCFauna(id);
        }
      })
    });
  });
}

// Función para actualizar el nombre científico de fauna en la BD
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

// Función para actualizar el nombre científico de flora en la BD
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



// Esta función cancelarEdicion(id) se llama cuando se desea cancelar la edición de un elemento con el ID específico.
// Esta función cancela la edición de un elemento identificado por su id
function cancelarEdicion(id) {
  // Obtener el elemento del nombre del cliente que se está editando
  var nombreCElemento = document.getElementById("nombreC-" + id);
  // es el campo de entrada de texto donde se realiza la edición
  var nombreCinput = document.getElementById("input-" + id);
  // es el botón de enviar el formulario
  var btnEnviar = document.getElementById("guardar-" + id);
  // es el botón de cancelar la edición
  var btnCancel = document.getElementById("cancelar-" + id);
  // es el botón de cerrar la edición
  var botonEquis = document.getElementById("cambioC-" + id);
  // es el valor original del atributo antes de la edición
  var originalValue = nombreCinput.getAttribute('data-original-value');

  // Restaurar el valor original en el campo de entrada de texto
  nombreCinput.value = originalValue;

  // Mostrar el nombre del cliente en modo de visualización y ocultar el campo de entrada de texto
  nombreCElemento.style.display = "inline-block";
  nombreCinput.style.display = "none";

  // Deshabilitar el campo de entrada de texto
  nombreCinput.setAttribute("disabled", true);

  // Ocultar los botones de enviar y cancelar la edición
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Agregar la clase 'hidden' al botón de cerrar la edición para ocultarlo
  botonEquis.classList.add("hidden");

  // Eliminar el atributo data-original-value para limpiar los datos temporales de la edición
  nombreCinput.removeAttribute('data-original-value');
}


//************************************INICIO DE LAS FUNCIONES PARA EDITAR DESCRIPCION*******************************************
// Esta función permite editar la descripción de un elemento identificado por su id
function editarDescripcion(id) {
  // Obtener el contenedor que envuelve los elementos de edición de la descripción
  var contenedor = document.getElementById('contenedorEdicionD-' + id);
  // Obtener el elemento de descripción en modo de visualización
  var descripcion = document.getElementById('descripcion-' + id);
  // Obtener el campo de entrada de texto donde se realizará la edición de la descripción
  var descripcionInput = document.getElementById('inputD-' + id);
  // Obtener el botón de enviar el formulario
  var btnEnviar = document.getElementById('guardarD-' + id);
  // Obtener el botón de cancelar la edición
  var btnCancel = document.getElementById('cancelarD-' + id);
  
  // Guardar el valor original de la descripción en el atributo data-original-value
  descripcionInput.setAttribute('data-original-value', descripcion.innerText);
  
  // Mostrar el contenedor de edición y ocultar la descripción en modo de visualización
  contenedor.classList.remove('hidden');
  descripcion.style.display = "none";
  
  // Mostrar el campo de entrada de texto para la edición
  descripcionInput.classList.remove('hidden');
  descripcionInput.style.display = "block";
  
  // Establecer el valor del campo de entrada de texto con el valor original de la descripción
  descripcionInput.value = descripcion.innerText;
  
  // Habilitar el campo de entrada de texto para la edición
  descripcionInput.removeAttribute("disabled");
  
  // Mostrar los botones de enviar y cancelar la edición
  btnEnviar.style.display = "inline-block";
  btnCancel.styl


/*Funcion que permite seleccionar el boton guardar al que se le esta haciendo hover*/ 
/*GUARDAR*/

// Esta función se llama cuando el cursor entra en el área del botón 
function mouseenterGuardarD(id){
  // Obtener el botón "Guardar" correspondiente al id proporcionado
  var boton = document.getElementById("cambioGD-"+ id);
  // Mostrar el botón "Guardar" al eliminar la clase "hidden" que lo oculta
  boton.classList.remove("hidden");
}

// Esta función se llama cuando el cursor sale del área del botón 
function mouseleaveGuardarD(id) {
  // Obtener el botón "Guardar" correspondiente al id proporcionado
  var boton = document.getElementById('cambioGD-' + id);
  // Ocultar el botón "Guardar" al agregar la clase "hidden"
  boton.classList.add('hidden');
}

/*Función para manejar el evento de entrada del cursor sobre el botón */
/*CANCELAR*/

function mouseenterCancelarD(id){
  //el botón Cancelar correspondiente al id proporcionado
  var boton = document.getElementById("cambioCD-"+ id);
  //el botón Cancelar al eliminar la clase "hidden" que lo oculta
  boton.classList.remove("hidden");
}

/*Función para manejar el evento de salida del cursor del botón "Cancelar"*/
function mouseleaveCancelarD(id) {
  // Obtener el botón "Cancelar" correspondiente al id proporcionado
  var boton = document.getElementById('cambioCD-' + id);
  // Ocultar el botón "Cancelar" al agregar la clase "hidden"
  boton.classList.add('hidden');
}

// Esta función se llama cuando se hace clic en el botón "Guardar" para guardar la descripción editada
function guardarDescripcion(id) {
  //el elemento de descripción
  var descripcionElemento = document.getElementById("descripcion-" + id);
  //el campo de entrada de texto donde se realizó la edición de la descripción
  var descripcionInput = document.getElementById("inputD-" + id);
  //el botón de enviar el formulario
  var btnEnviar = document.getElementById("guardarD-" + id);
  //el botón de cancelar la edición
  var btnCancel = document.getElementById("cancelarD-" + id);
  //el botón de "Visto" que se muestra temporalmente después de guardar la descripción
  var botonVisto = document.getElementById("cambioGD-" + id);
  //este obtiene la nueva descripción del campo de entrada de texto
  var nuevaDescripcion = descripcionInput.value;


  // Actualizar el texto de la descripción con la nueva descripción
  descripcionElemento.innerText = nuevaDescripcion;

  // Mostrar nuevamente la descripción en modo de visualización y ocultar el campo de entrada de texto
  descripcionElemento.style.display = "inline-block";
  descripcionInput.style.display = "none";
  // Deshabilitar el campo de entrada de texto
  descripcionInput.setAttribute("disabled", true);
  // Ocultar los botones de enviar y cancelar la edición
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Ocultar el botón de "Visto"
  botonVisto.classList.add("hidden");

  // Eliminar el atributo data-original-value del campo de entrada de texto
  descripcionInput.removeAttribute('data-original-value');
  
  // Llamar a la función DiferenciarFFD para distinguir entre Flora y Fauna y actualizar la descripción en consecuencia
  DiferenciarFFD(id);
}//fin de codigo


// Esta función distingue entre publicaciones de Flora y Fauna y llama a la función correspondiente para actualizar la descripción en la base de datos
function DiferenciarFFD(id){
  // Realizar una solicitud GET para obtener todas las publicaciones
  fetch(baseUrl + '/vista/all')
    .then(res => {
      // Convertir la respuesta a formato JSON
      res.json()
        .then(json => {
          // Almacenar las publicaciones obtenidas en la variable "publicaciones"
          publicaciones = json;
          // Iterar sobre cada publicación
          publicaciones.forEach((publicacion) => {
            // Verificar si la publicación es de Flora y si el id coincide con el proporcionado
            if(publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" && publicacion.id_publicacion == id){
              // Si es una publicación de Flora, llamar a la función para actualizar la descripción de Flora
              ActualizarDescripcionFlora(id);
            }
            // Verificar si la publicación es de Fauna y si el id coincide con el proporcionado
            if(publicacion.nombre_animal !== null && publicacion.nombre_animal !== "" && publicacion.id_publicacion == id){
              // Si es una publicación de Fauna, llamar a la función para actualizar la descripción de Fauna
              ActualizarDescripcionFauna(id);
            }
          })
        });
    })
    .catch(error => {
      console.log("No se ha podido completar su solicitud.", error);
    });
}

// Esta función actualiza la descripción de la publicación de Fauna en la base de datos
function ActualizarDescripcionFauna(id) {
  // Obtener los datos necesarios para actualizar la descripción de Fauna
  let data = {
    nombre_animal: document.getElementById("animal-" + id).textContent,
    descripcion_cientifica_fauna: document.getElementById("inputD-" + id).value
  };

  // Mostrar los datos a enviar en la consola para propósitos de depuración
  console.log('Datos a enviar:', data);


  // Enviar una solicitud PUT para actualizar la descripción de Fauna en la base de datos
  fetch(baseUrl + "/faunaDescripcion", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .catch(error => {
    // Manejar cualquier error que ocurra durante la solicitud
    console.log("No se ha podido completar su solicitud.", error);
  });
}

// Esta función actualiza la descripción de la publicación de Flora en la base de datos
function ActualizarDescripcionFlora(id) {
  // Obtener los datos necesarios para actualizar la descripción de Flora
  let data = {
    nombre_planta: document.getElementById("planta-" + id).textContent,
    descripcion_cientifica_flora: document.getElementById("inputD-" + id).value
  };

  // Mostrar los datos a enviar en la consola para propósitos de depuración
  console.log('Datos a enviar:', data);

  // Enviar una solicitud PUT para actualizar la descripción de Flora en la base de datos
  fetch(baseUrl + "/floraDescripcion", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
  });
}

// Esta función cancela la edición de la descripción y restaura el valor original
function cancelarDescripcion(id) {
  // Obtener elementos relevantes
  var descripcionElemento = document.getElementById("descripcion-" + id);
  var descripcionInput = document.getElementById("inputD-" + id);
  var btnEnviar = document.getElementById("guardarD-" + id);
  var btnCancel = document.getElementById("cancelarD-" + id);
  var botonEquis = document.getElementById("cambioCD-" + id);

  // Obtener el valor original del atributo data-original-value
  var originalValue = descripcionInput.getAttribute('data-original-value');

  // Restaurar el valor original
  descripcionInput.value = originalValue;

  // Mostrar el elemento de descripción y ocultar el campo de entrada de texto
  descripcionElemento.style.display = "inline-block";
  descripcionInput.style.display = "none";
  
  // Deshabilitar el campo de entrada de texto
  descripcionInput.setAttribute("disabled", true);
  
  // Ocultar los botones de enviar y cancelar la edición
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  
  // Ocultar el botón de "Cancelar" con la equis
  botonEquis.classList.add("hidden");

  // Eliminar el atributo data-original-value
  descripcionInput.removeAttribute('data-original-value');
}

// Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarPerfil() {
  // Habilitar el desplazamiento de la página nuevamente
  document.body.style.overflow = 'auto';

  // Obtener elementos relevantes
  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');

  // Ocultar la capa oscura y el cuadro de perfil
  overlay.style.display = 'none';
  perfilContainer.style.display = 'none';
}

// Asignar evento al hacer clic en la imagen de perfil
document.getElementById('mostrarPerfil').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue

  // Mostrar el perfil
  mostrarPerfil();
});

// Función para redirigir a la página de publicación con el ID especificado
function MostrarPub(id) {
  // Construir la URL con el parámetro de ID
  let url = "Publicacion.html?id=" + id;

  // Redirigir a la página de destino
  window.location.href = url;
}
}
