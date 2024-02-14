function mostrarSolicitud() {
    const user = usuario_name;
    fetch(baseUrl + "/biologo/" + user).then((res) => {
        res.json().then((json) => {
        usuario = json;

        let fotoPerfil = usuario.perfil_biologo;
        perfil = fotoPerfil;
        ImprimirSolicitud(usuario);
        });
    });
}

function ImprimirSolicitud(usuario) {
    document.body.style.overflow = "hidden";

    var overlay = document.getElementById("verificacion");
    var perfilContainer = document.getElementById("contenedor-verificacion");
    let perfilContent = document.getElementById("verificacion-contenido");
    overlay.style.display = "block";
    perfilContainer.style.display = "flex";
    perfilContent.innerHTML = MapearSolicitud(usuario);
}

function MapearSolicitud(usuario) {
    return `<div class="w-80 h-[28rem] text-lg relative">
    <div class="ml-6 mr-6">
        <button onclick="cerrarVerificacion()" class="px-4 py-2 absolute -top-8 -right-10">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Close_profile.png?raw=true" alt="">
        </button>
        <h2 class="text-2xl text-center">Solicitud de Verificación</h2>
    <form enctype="multipart/form-data">
        <div class="flex mt-5 items-center justify-around">
            <img src="${usuario.perfil_biologo}" alt="foto de perfil" class="rounded-full w-16 h-16">
            <p id="nombre">${usuario.nombre_biologo}</p>
        </div>
        
        <p class="mt-6">Correo</p>
        <p id="correo" class="mt-2 underline">${usuario.correo_biologo}</p>
       
    
        <p class="mt-2">Ingrese el título</p>
        <div class="flex mt-2 items-center">
            <input id="tituloInput" name="titulo" required class="w-full mr-2 h-6 password-display inline-block border rounded border-gray-400 p-4">
            
        </div>

        <p class="mt-2">Adjunte su archivo pdf</p>
        <input id="archivoInput" name="archivo" class="w-80 mt-4 block" type="file">
        <button onclick="subirSolicitud()" class="mt-6 py-1 px-2 bg-white border rounded border-gray-400 hover:bg-gray-200">Subir Archivo</button>
    </div>
    </form>
    <div id="id_biologo" class="hidden">${usuario.id_biologo}</div>
    
</div> `;
}//El último div colocado en el mapeo es un div auxiliar que ayuda a enviar la solicitud, SIEMPRE debe ser hidden


/***************FUNCIONES PARA LA SOLICITUD DE VERIFICACION*******************************/ 

function mostrarVerificacion() {
    const user = usuario_name;
    fetch(baseUrl + "/biologo/" + user).then((res) => {
        res.json().then((json) => {
        usuario = json;

        let fotoPerfil = usuario.perfil_biologo;
        perfil = fotoPerfil;
        ImprimirSolicitud(usuario);
        });
    });
  }
  
  // Función para cerrar el cuadro de perfil y quitar la capa oscura
  function cerrarVerificacion() {
    document.body.style.overflow = 'auto';
  
    var overlay = document.getElementById('verificacion');
    var verificacionContainer = document.getElementById('contenedor-verificacion');
  
    overlay.style.display = 'none'; // Ocultar la capa oscura
    verificacionContainer.style.display = 'none'; // Ocultar el cuadro de perfil
  }
  
  // Asignar evento al clic en la imagen de perfil
  document.getElementById('mostrarVerificacion').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que la página se recargue
  
    mostrarVerificacion();
  });
  
  /************FUNCIONES PARA LA SUBIDA DE SOLICITUD *******************/

function subirSolicitud() {
    // Obtener datos del formulario
    const archivoInput = document.getElementById('archivoInput').files[0];
    const usuario = document.getElementById('nombre').textContent;
    const correo = document.getElementById('correo').textContent;
    const titulo = document.getElementById('tituloInput').value;
    const idBiologo = document.getElementById('id_biologo').textContent;

    // Crear un objeto FormData y agregar los datos del formulario
    const formData = new FormData();
    formData.append('archivo', archivoInput);
    formData.append('usuario', usuario);
    formData.append('correo', correo);
    formData.append('titulo', titulo);
    formData.append('id_biologo', idBiologo);

    if(titulo == null || titulo == "" || archivoInput == null){
        alert("Debes llenar todos los datos antes de enviar el formulario")
    }
    else{
        // Subir el archivo a tu servidor Spring
        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => {

            if (!response.ok) {
                throw new Error('Error al subir el archivo a GitHub: ' + response.status);
            }
            return response.text();  // Cambiado a text ya que el servidor devuelve una cadena
        })
        .then(data => {
            location.reload();
            // Aquí data contendrá el mensaje del servidor
            console.log(data);
            alert("Se subió el archivo y se registró la solicitud exitosamente");
        })
        .catch(error => {
            console.log(data);
            alert("Error al enviar solicitud");
        });

    }
}