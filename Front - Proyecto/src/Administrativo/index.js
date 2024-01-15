
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
/*
function toggleEstado(id) {
  var botoncito = document.getElementById(id);
  var img = botoncito.getElementsByTagName('img')[0];
  var fila = document.getElementById(id); // Utiliza el ID proporcionado directamente

  // Obtén la letra de acción del ID
  var accion = id.slice(-1);

  if (accion === 'A') {
      // Si la acción es 'A' (Aprobar)
      // Desactiva el botón de Rechazar en la misma fila
      var equisd = document.getElementById(id.replace("A", "R")).getElementsByTagName('img')[0];
      equisd.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true';

      // Cambia el estado del botón de Aprobar
      img.src = (img.src.includes('Shi_Color.png')) ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true';
  } else if (accion === 'R') {
      // Si la acción es 'R' (Rechazar)
      // Desactiva el botón de Aprobar en la misma fila
      var palomita = document.getElementById(id.replace("R", "A")).getElementsByTagName('img')[0];
      palomita.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';

      // Cambia el estado del botón de Rechazar
      img.src = (img.src.includes('%C3%91o_Color.png')) ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true';
  }
}
*/
function toggleEstado(id, accion) {
  var boton = document.getElementById(id);
  var img = boton.querySelector('img');
  var filaId = boton.dataset.filaId;

  // Desactivar el otro botón cuando uno está activo
  var otroBotonId = (accion === 'A') ? filaId + '-R' : filaId + '-A';
  var otroBoton = document.getElementById(otroBotonId);
  var imgOtroBoton = otroBoton.querySelector('img');

  // Verifica si el otro botón está activo y lo desactiva
  if (imgOtroBoton.src.includes('Color')) {
    imgOtroBoton.src = (accion === 'A') ?
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' :
      'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';
  }

  // Cambia el estado del botón de acuerdo con la acción
  img.src = (accion === 'A') ?
    (img.src.includes('Shi_Color.png') ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true') :
    (img.src.includes('%C3%91o_Color.png') ? 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' : 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true');

  // Si es en el div "celu", actualiza la imagen en la tabla
  if (boton.closest('#celu')) {
    var imgTabla = document.getElementById(filaId + '-' + accion).querySelector('img');
    imgTabla.src = img.src;

    // Verificar si es el botón de rechazar en el "celu" y actualizar la imagen del otro botón en la tabla
    if (accion === 'R') {
      var otroBotonTabla = document.getElementById(filaId + '-A').querySelector('img');
      otroBotonTabla.src = (img.src.includes('%C3%91o_Color.png')) ?
        'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true' :
        'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true';

      // Actualizar también la imagen en el div "celu" solo si es el botón de rechazar
      if (otroBotonId.includes('-R')) {
        var imgOtroBotonCelu = document.getElementById('celu-' + filaId + '-A').querySelector('img');
        imgOtroBotonCelu.src = otroBotonTabla.src;
      }
    }
  } else {
    // Si es en la tabla, actualiza la imagen en el div "celu"
    var imgCelu = document.getElementById('celu-' + filaId + '-' + accion);
    imgCelu.querySelector('img').src = img.src;

    // Desactivar el otro botón en el div "celu" cuando uno está activo
    var otroBotonCeluId = (accion === 'A') ? 'celu-' + filaId + '-R' : 'celu-' + filaId + '-A';
    var otroBotonCelu = document.getElementById(otroBotonCeluId);
    var imgOtroBotonCelu = otroBotonCelu.querySelector('img');

    // Verifica si el otro botón en el div "celu" está activo y lo desactiva
    if (imgOtroBotonCelu.src.includes('Color')) {
      imgOtroBotonCelu.src = (accion === 'A') ?
        'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true' :
        'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';
    }
  }
  // Agrega o quita la clase en la fila según la acción
  var fila = document.getElementById(filaId);
  fila.classList.remove('recibida', 'aprobada', 'desaprobada');
  fila.classList.add(accion.toLowerCase());
}

function mostrarSolicitudes(estado) {
  var todasLasFilas = document.querySelectorAll(".solicitud-row");
  todasLasFilas.forEach(function (fila) {
    var esRecibida = !fila.classList.contains("aprobada") && !fila.classList.contains("desaprobada");
    
    if ((estado === "recibida" && esRecibida) || (estado === "aprobada" && fila.classList.contains("aprobada")) || (estado === "desaprobada" && fila.classList.contains("desaprobada"))) {
      fila.style.display = "table-row";
    } else {
      fila.style.display = "none";
    }
  });
}

// Llama a esta función cuando se haga clic en los botones de filtrado
function filtrarSolicitudes(estado) {
  // Restablecer la visualización de todas las filas antes de aplicar el filtro
  var todasLasFilas = document.querySelectorAll(".solicitud-row");
  todasLasFilas.forEach(function (fila) {
    fila.style.display = "table-row";
  });

  mostrarSolicitudes(estado);
}

// Ejemplo de llamada al hacer clic en un botón de filtrado
document.getElementById("botonAprobadas").addEventListener("click", function () {
  filtrarSolicitudes("aprobada");
});

document.getElementById("botonDesaprobadas").addEventListener("click", function () {
  filtrarSolicitudes("desaprobada");
});

document.getElementById("botonRecibidas").addEventListener("click", function () {
  filtrarSolicitudes("recibida");
});
/*
function toggleEstado(boton, estado) {
  var fila = boton.closest('tr'); // Obtener la fila actual

  // Obtener los botones opuestos en la misma fila
  var botonAprobar = fila.querySelector('.aprobar img');
  var botonRechazar = fila.querySelector('.rechazar img');

  // Cambiar el estado del botón actual
  var palomita = boton.querySelector('img');
  palomita.src = (palomita.src.includes((estado === 1) ? 'Shi_Color.png' : '%C3%91o_Color.png')) ?
      `https://github.com/saunpain/FloraFaunaUTP/blob/main/img/${(estado === 1) ? 'Shi' : '%C3%91o'}.png?raw=true` :
      `https://github.com/saunpain/FloraFaunaUTP/blob/main/img/${(estado === 1) ? 'Shi_Color' : '%C3%91o_Color'}.png?raw=true`;

  // Restaurar el botón opuesto al estado inicial
  if (estado === 1) {
      botonRechazar.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true';
  } else {
      botonAprobar.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true';
  }
}
*/
function showDetails(id) {
  // Oculta la tabla
  document.querySelector("#pub table").style.display = "none";

  // Muestra el div con id "celu"
  const celuDiv = document.querySelector("#celu div");
  celuDiv.style.display = "block";
}

function Deshacer() {
  // Muestra la tabla
  document.querySelector("#pub table").style.display = "table"; // Restaura la propiedad "display" original de la tabla

  // Oculta el div con id "celu"
  const celuDiv = document.querySelector("#celu div");
  celuDiv.style.display = "none";
}

function mostrarPerfil() {
  document.body.style.overflow = 'hidden';

  var overlay = document.getElementById('perfilAdmin');
  var perfilContainer = document.getElementById('contenedor-PerfilAdmin');
  var perfilContent = document.getElementById('AdminProfile-contenido');

  // Cargar dinámicamente el contenido del perfil desde pantallaPerfil.html
  fetch('Perfil_Admin.html')
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

  var overlay = document.getElementById('perfilAdmin');
  var perfilContainer = document.getElementById('contenedor-PerfilAdmin');

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