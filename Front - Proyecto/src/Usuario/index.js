
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

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('PerfilUsuario.html')
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

function mostrarImagen() {
  var input = document.getElementById('imagen');
  var imagenSubida = document.getElementById('preview');

  //Primero se verifica si se subió una imagen
  if (input.files && input.files[0]) {
      var imagen = new FileReader();

      imagen.onload = function (e) {
          // Mostrar la nueva imagen seleccionada
          imagenSubida.src = e.target.result;
      };

      imagen.readAsDataURL(input.files[0]); // Convertir la imagen a base64
  }
}

//Funcion para la seeccion de cateegorías y subcategorías a la hora de hacer una publicación
function seleccionCategoria() {
  var categoria = document.getElementById("categoria").value;
  var subcategoria = document.getElementById("subcategoria");
  var floraOp = document.getElementById("floraOp");
  var faunaOp = document.getElementById("faunaOp");

  // Reinicia la subcategoría al cambiar la categoría
  subcategoria.selectedIndex = 0;

  // Oculta las opciones de las subcategorías
  subcategoria.style.display = "none";
  floraOp.style.display = "none";
  faunaOp.style.display = "none";

  // Muestra las subcategorías dependiendo de la categoría seleccionada
  if (categoria === "flora") {
      floraOp.style.display = "block";
  } else if (categoria === "fauna") {
      faunaOp.style.display = "block";
  }
  // Habilita el select de subcategoría una vez se ha seleccionado la categoría
  subcategoria.style.display = "block";
}

document.addEventListener('DOMContentLoaded', function () {

  var botonCrearPub = document.getElementById('crearPub');
  var botonCancelarPub = document.getElementById('cancelarPub');
  var crearPub = document.getElementById('publicar');

  // Agrega un evento de clic al botón Crear
  botonCrearPub.addEventListener('click', function () {
      // Toggle (alternar) la visibilidad del elemento 'publicar'
      if (crearPub.style.display === 'none' || crearPub.style.display === '') {
          crearPub.style.display = 'block';
      } else {
          crearPub.style.display = 'none';
      }
  });

  // Agrega un evento de clic al botón Cancelar
  botonCancelarPub.addEventListener('click', function () {
      // Oculta el elemento 'publicar'
      crearPub.style.display = 'none';
  });
});

function crearPublicacion(pagina) {
  // Redirige a la página de Publicaciones
  window.location.href = pagina;

  // Obtener referencia al elemento 'publicar'
  var crearPub = document.getElementById('publicar');
  
  // Mostrar el elemento 'publicar' si está oculto
  if (crearPub.style.display === 'none' || crearPub.style.display === '') {
      crearPub.style.display = 'block';
  }
}


document.addEventListener('DOMContentLoaded', function () {
  // Obtener referencia al elemento 'publicar'
  var crearPub = document.getElementById('publicar');

  // Obtener el parámetro de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var mostrarPublicar = urlParams.get('mostrarPublicar');

  // Mostrar el elemento 'publicar' si el parámetro está presente y tiene el valor esperado
  if (mostrarPublicar === 'true' && crearPub) {
      crearPub.style.display = 'block';

      // Eliminar el parámetro de la URL
      window.history.replaceState({}, document.title, window.location.pathname);
  }
});


function editarComentario() {
  var comentarioTextoElemento = document.getElementById("comentarioTexto");
  var comentarioInput = document.getElementById("comentarioInput");
  var btnEnviar = document.getElementById("guardar");
  var btnCancel = document.getElementById("cancelar");

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

