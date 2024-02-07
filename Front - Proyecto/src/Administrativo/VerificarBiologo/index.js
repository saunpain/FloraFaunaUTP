let baseUrl = "http://localhost:8080"


function ObtenerAdmin(){
  const user = usuario_name;
  fetch(baseUrl + "/administrativo/" + user)
        .then(res => res.json())
        .then(data => {
            const fotoPerfil = data.perfil_admin;
            var img = document.getElementById("imgPerfil");
            img.src = fotoPerfil;

            localStorage.setItem("perfil_Admin",fotoPerfil);
        })
        .catch(error => {
            console.error(error);
            window.location.href = "/Front - Proyecto/src/Flora y Fauna UTP - inicio.html";
        });
}

//Funcion para controlar los botones de aprobar y rechazar, tanto en la tabla como en el div "solicitud"
function BioEstado(id, accion) {
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

function CerrarSesion(){
  console.log("cerrando sesion")
  localStorage.removeItem('id_usuario');
  localStorage.removeItem("nombreusuario");
}

