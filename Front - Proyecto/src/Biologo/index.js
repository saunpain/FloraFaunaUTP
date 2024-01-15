

//Función para activar y desactivar botones de edición
document.addEventListener('DOMContentLoaded', function () {
  // Obtén todos los elementos con la clase 'boton'
  var botones = document.getElementsByClassName('boton');

  // Itera sobre cada botón
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function () {
      // Encuentra el elemento 'opcion' correspondiente a este botón
      var opcion = this.nextElementSibling;

      // Alternar la clase 'hidden' en el elemento 'opcion'
      opcion.classList.toggle('hidden');
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  var botonPrincipal = document.querySelector('.boton-principal');
  var opciones = document.querySelectorAll('.opciones');

  botonPrincipal.addEventListener('click', function () {
    opciones.forEach(function(opcion) {
      opcion.classList.toggle('hidden');
    });
  });
});


