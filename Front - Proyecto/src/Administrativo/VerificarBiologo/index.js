

//Funcion para controlar los botones de aprobar y rechazar, tanto en la tabla como en el div "solicitud"
function toggleEstado(id, accion) {
  var boton = document.getElementById(id); //almacena el id proporcionado para cada boton
  var img = boton.querySelector('img'); //busca la imagen que esta en cada boton para posteriormente hacer cambios 
  var filaId = boton.dataset.filaId; //Obtiene el valor del atributo data-filaId del botón y lo almacena en la variable filaId. Se usa para identificar cada fila.

  // Desactivar el otro botón cuando uno está activo
  var otroBotonId = (accion === 'A') ? filaId + '-R' : filaId + '-A'; //se almacena el valor del id del boton opuesto al que esta activo, basciamente si el boton que esta actualmente activo es el de aprobar, se almacena el id del boton de rechazar y viceversa
  var otroBoton = document.getElementById(otroBotonId); //trae el valor generado de la variable otroBotonId
  var imgOtroBoton = otroBoton.querySelector('img'); //igual que la variable img, esta almacena la imagen que contiene el boton opuesto al que esta activo

  // Verifica si el otro botón está activo y lo desactiva
  if (imgOtroBoton.src.includes('Color')) { //como las imagenes de color tienen su nombre y "Color" en su src esto verifica si en su src tiene Color, si es asi significa que esta activo. 
    imgOtroBoton.src = (accion === 'A') ? // Si esta activo y Aprobado, la imagen del otro boton sera la de rechazado pero sin color y viceversa.
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' :
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';
  }

  // Cambia el estado del botón de acuerdo con la acción
  img.src = (accion === 'A') ? //Esto basicamente activa y desactiva un boton, ya sea aprobado o rechazado. Si la accion es A aprobada, entonces lo activa. Si la boton actual ya está en estado activo, la cambia a inactivo y viceversa.
    (img.src.includes('Shi_Color.png') ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true') :
    (img.src.includes('%C3%91o_Color.png') ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true');

  // Si es en el div "solicitud", actualiza la imagen en la tabla
  if (boton.closest('#solicitud')) { //verifica si esta en el div solicitud
    var imgTabla = document.getElementById(filaId + '-' + accion).querySelector('img'); //busca el boton con la misma filaId y con la misma accion actual y el estado, eso lo guarda en la variable
    imgTabla.src = img.src; 

  } else {
    // Si es en la tabla, actualiza la imagen en el div "solicitud"
    var imgSolicitud = document.getElementById('solicitud-' + filaId + '-' + accion);
    imgSolicitud.querySelector('img').src = img.src;

    // Desactivar el otro botón en el div "solicitud" cuando uno está activo (el mismo proceso que arriba basicamente solo que con el div de solicitud)
    var otroBotonSolicitudId = (accion === 'A') ? 'solicitud-' + filaId + '-R' : 'solicitud-' + filaId + '-A';
    var otroBotonSolicitud = document.getElementById(otroBotonSolicitudId);
    var imgOtroBotonSolicitud = otroBotonSolicitud.querySelector('img');
        
    // Verifica si el otro botón en el div "solicitud" está activo y lo desactiva (el mismo proceso que arriba basicamente solo que con el div de solicitud)
    if (imgOtroBotonSolicitud.src.includes('Color')) {
      imgOtroBotonSolicitud.src = (accion === 'A') ?
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' :
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';
    }
  }
}

//Funcion para mostrar el div que contiene la info de solicitud al dar click en el boton de ver de la tabla
function showDetails(id) {
  // Oculta la tabla
  document.querySelector("#pub table").style.display = "none";

  // Muestra el div con id "solicitudG"
  const celuDiv = document.querySelector("#solicitud div");
  celuDiv.style.display = "block";
}

function Deshacer() {
  // Muestra la tabla
  document.querySelector("#pub table").style.display = "table"; // Restaura la propiedad "display" original de la tabla

  // Oculta el div con id "celu"
  const celuDiv = document.querySelector("#solicitud div");
  celuDiv.style.display = "none";
}


function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');
  var perfilContent = document.getElementById('userProfile-contenido');


  fetch('/Front - Proyecto/src/Administrativo/PerfilAdmin.html')
    .then(response => response.text())
    .then(data => {
      perfilContent.innerHTML = data;
      overlay.style.display = 'block';
      
      perfilContainer.style.display = 'flex'; // Mostrar el cuadro de perfil
    })
    .catch(error => console.error('Error al cargar el perfil:', error));
}

// Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarPerfil() {
  document.body.style.overflow = 'auto';

  var overlay = document.getElementById('perfil');
  var perfilContainer = document.getElementById('contenedor-Perfil');

  overlay.style.display = 'none';
  perfilContainer.style.display = 'none'; // Ocultar el cuadro de perfil
}

// Asignar evento al clic en la imagen de perfil
document.getElementById('mostrarPerfil').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue

  mostrarPerfil();
});

function editarUsuario(id) {
  var usuario = document.getElementById(id);
  var nuevoNombre = document.getElementById('input');
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");
  
  nuevoNombre.setAttribute('data-original-value',usuario.innerText);
  usuario.style.display = "none";
  nuevoNombre.style.display = "inline-block";
  nuevoNombre.value = usuario.innerText;
  nuevoNombre.removeAttribute("disabled");
  btnEnviar.style.display = "inline-block";
  btnCancel.style.display = "inline-block";

  nuevoNombre.focus();
}

function guardarNuevoNombre(id) {
  var usuario = document.getElementById(id);
  var nuevoNombre = document.getElementById('input');
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");
  
  usuario.innerText = nuevoNombre.value;
  usuario.style.display = "inline-block";
  usuario.style = "text-center";
  nuevoNombre.style.display = "none";
  nuevoNombre.setAttribute("disabled", true);

  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";
  
  nuevoNombre.removeAttribute('data-original-value');
}

function cancelarNuevoNombre(id){
  var usuario = document.getElementById(id);
  var nuevoNombre = document.getElementById('input');
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");
  
  var valorInicial = nuevoNombre.getAttribute('data-original-value');
  nuevoNombre.value = valorInicial;

  usuario.style.display = "inline-block";
  usuario.style = "text-center";
  nuevoNombre.style.display = "none";
  nuevoNombre.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  nuevoNombre.removeAttribute('data-original-value');
}



function togglePasswordVisibility() {
  var passwordDisplay = document.getElementById("passwordDisplay");
  var passwordInput = document.getElementById("passwordInput");
  var toggleIcon = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleIcon.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/visible%20pass.png?raw=true";
      toggleIcon.alt = "Ocultar contraseña";
  } else {
      passwordInput.type = "password";
      toggleIcon.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/hidden%20pass.png?raw=true";
      toggleIcon.alt = "Mostrar contraseña";
  }
}

function toggleEditMode() {
  var passwordDisplay = document.getElementById("passwordDisplay");
  var passwordInput = document.getElementById("passwordInput");

  passwordDisplay.classList.toggle("hidden");
  passwordInput.classList.toggle("hidden");

  if (!passwordInput.classList.contains("hidden")) {
      passwordInput.value = passwordDisplay.textContent;
      passwordInput.focus();
  }
}

function editarComentario(id) {
  var comentarioTextoElemento = document.getElementById("comentario-" + id);
  var comentarioInput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);

  // Guardar el valor original en el atributo data-original-value
  comentarioInput.setAttribute('data-original-value', comentarioTextoElemento.innerText);

  comentarioTextoElemento.style.display = "none";
  comentarioInput.style.display = "inline-block";
  comentarioInput.value = comentarioTextoElemento.innerText;
  comentarioInput.removeAttribute("disabled"); // Habilitar el input
  btnEnviar.style.display = "inline-block";
  btnCancel.style.display = "inline-block";

  comentarioInput.focus();
}

function guardarCambios(id) {
  var comentarioTextoElemento = document.getElementById("comentario-" + id);
  var comentarioInput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);

  comentarioTextoElemento.innerText = comentarioInput.value;
  comentarioTextoElemento.style.display = "inline-block";
  comentarioInput.style.display = "none";
  comentarioInput.setAttribute("disabled", true); // Deshabilitar el input
  btnEnviar.style.display = "none";
  btnCancel.style.display = "none";

  // Eliminar el atributo data-original-value
  comentarioInput.removeAttribute('data-original-value');
}

function cancelarEdicion(id) {
  var comentarioTextoElemento = document.getElementById("comentario-" + id);
  var comentarioInput = document.getElementById("input-" + id);
  var btnEnviar = document.getElementById("guardar-" + id);
  var btnCancel = document.getElementById("cancelar-" + id);

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
