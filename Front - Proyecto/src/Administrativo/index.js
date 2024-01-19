
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


  fetch('PerfilAdmin.html')
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
