let baseUrl = "http://localhost:8080"

function ObtenerEstudiante(){
  const user = usuario_name;
  fetch(baseUrl + "/estudiante/" + user)
        .then(res => res.json())
        .then(data => {
            const fotoPerfil = data.perfil_estudiante;
            var img = document.getElementById("imgPerfil");
            img.src = fotoPerfil;
            localStorage.setItem('id_usuario', data.id_estudiante)
        })
        .catch(error => {
            console.error(error);
            window.location.href = "/Front - Proyecto/src/Flora y Fauna UTP - inicio.html";
        });
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
      location.reload();
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


function CerrarSesion(){
  console.log("cerrando sesion")
  localStorage.removeItem('id_usuario');
  localStorage.removeItem("nombreusuario");
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