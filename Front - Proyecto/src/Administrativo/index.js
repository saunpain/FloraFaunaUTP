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

function CerrarSesion(){
  console.log("cerrando sesion")
  localStorage.removeItem('id_usuario');
  localStorage.removeItem("nombreusuario");
}