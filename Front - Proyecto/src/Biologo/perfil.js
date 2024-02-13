let usuario = []
let usuario_name = localStorage.getItem("nombreusuario");
let id_usuario = localStorage.getItem('id_usuario');
let perfil = "";


//Función para mostrar el perfil del biólogo según su nombre de usuario
function mostrarPerfil() {
    //Obtener el nombre de usuario del biólogo actual
    const user = usuario_name;

    fetch(baseUrl + "/biologo/" + user).then((res) => {
        res.json().then((json) => {
            //Almacenar la información del biólogo en la variable usuario
            usuario = json;

            //Obtener la URL de la foto de perfil del biólogo
            let fotoPerfil = usuario.perfil_biologo;
            perfil = fotoPerfil;

            //Llamar a la función ImprimirPerfil para mostrar la información del biólogo en la interfaz
            ImprimirPerfil(usuario);
        });
    });
}

function ActualizarNombreUsuario(usuario) {
    //Obtener el estado del biólogo desde el almacenamiento local
    const estado = localStorage.getItem('estado_biologo');

    let data = {
        id_biologo: usuario.id,
        nombre_biologo: document.getElementById("input").value,
        correo_biologo: document.getElementById("correo").textContent,
        estado: estado,
        perfil_biologo: perfil,
    };

    console.log('Datos a enviar:', data);

    fetch(baseUrl + "/biologo", {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(res => {
        console.log('Respuesta del servidor:', res);

        //Actualizar el nombre de usuario en la variable global y en el almacenamiento local
        usuario_name = data.nombre_biologo;
        localStorage.setItem("nombreusuario", usuario_name);

        //Llamar a la función mostrarPerfil para actualizar la interfaz con la información actualizada
        mostrarPerfil();
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
}


function ImprimirPerfil(usuario) {
    // Deshabilitar el desplazamiento vertical de la página
    document.body.style.overflow = "hidden";

    // Obtener el estado del biólogo desde el almacenamiento local
    const estado = localStorage.getItem('estado_biologo');
    console.log(estado)

    var overlay = document.getElementById("perfil");
    var perfilContainer = document.getElementById("contenedor-Perfil");
    let perfilContent = document.getElementById("userProfile-contenido");

    //Mostrar el overlay y el contenedor del perfil
    overlay.style.display = "block";
    perfilContainer.style.display = "flex";

    if (estado === "Aprobado") {
        // Si el biólogo está aprobado, mostrar el perfil aprobado
        perfilContent.innerHTML = MapearPerfilAprobado(usuario);
    } else {
        // Si el biólogo no está aprobado, mostrar el perfil de solicitud
        perfilContent.innerHTML = MapearPerfilSolicitud(usuario);
    }
}

function MapearPerfilAprobado(usuario) {
    return `<div class="w-80 h-[28rem] text-lg">
    <div class="ml-6 mr-6">
        <div class="flex justify-center">
            <h1 class="text-2xl">Perfil de usuario</h1>
            <button onclick="cerrarPerfil()" class="absolute ml-80 -mt-5">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Close_profile.png?raw=true" alt="cerrar" class="h-10 w-10">
            </button>
        </div>
        <div class="flex mt-5 items-center">
            <img src="${usuario.perfil_biologo}" alt="foto de perfil" class="w-16 h-16">
            <p class="ml-5">Avatar de perfil</p>
        </div>
        <p class="mt-6 text-center mb-2 usuario" id="${usuario.id_biologo}">${usuario.nombre_biologo}</p>
        <input type="text" id="input" class="hidden mt-6 w-full text-center" disabled/>
        <hr class="h-px border-0 dark:bg-gray-600">
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="guardar" class="hidden focus:outline-none" onclick="guardarNuevoNombre('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
            </button>
            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Guardar cambios</p>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="cancelar" class="hidden focus:outline-none" onclick="cancelarNuevoNombre('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="¡">
            </button>
            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Cancelar</p>
            </div>
        </div>
        <div class="flex justify-center">
            <p>Editar</p>
            <button onclick="editarUsuario('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/editar-perfil.png?raw=true" class="h-6 w-6 ml-5">
            </button>
        </div>
        
        <p class="mt-6">Correo</p>
        <p class="mt-2 underline" id="correo">${usuario.correo_biologo}</p>
        <div class="flex mt-6">
            <p class="mr-2">Solicitud: ${usuario.estado}</p>
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/plantaAprobado.png?raw=true" alt="" class="w-6 h-6 mr-2">
        </div>
        <button onclick="CerrarSesion()" id="cerrar_S" class="mt-10">
            <a href="/Front - Proyecto/src/Flora y Fauna UTP - inicio.html" class="flex">
                <p>Cerrar Sesión</p>
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cerrar%20sesi%C3%B3n%20perfil.png?raw=true" alt="" class="ml-4 h-6 w-6">
            </a>
        </button>
    </div>
</div>`;
}

function MapearPerfilSolicitud(usuario) {
    return `<div class="w-80 h-[28rem] text-lg">
    <div class="ml-6 mr-6">
        <div class="flex justify-center">
            <h1 class="text-2xl">Perfil de usuario</h1>
            <button onclick="cerrarPerfil()" class="absolute ml-80 -mt-5">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Close_profile.png?raw=true" alt="cerrar" class="h-10 w-10">
            </button>
        </div>
        <div class="flex mt-5 items-center">
            <img src="${usuario.perfil_biologo}" alt="foto de perfil" class="w-16 h-16">
            <p class="ml-5">Avatar de perfil</p>
        </div>
        <p class="mt-6 text-center mb-2 usuario" id="${usuario.id_biologo}">${usuario.nombre_biologo}</p>
        <input type="text" id="input" class="hidden mt-6 w-full text-center" disabled/>
        <hr class="h-px border-0 dark:bg-gray-600">
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="guardar" class="hidden focus:outline-none" onclick="guardarNuevoNombre('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
            </button>
            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Guardar cambios</p>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="cancelar" class="hidden focus:outline-none" onclick="cancelarNuevoNombre('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="¡">
            </button>
            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Cancelar</p>
            </div>
        </div>
        <div class="flex justify-center">
            <p>Editar</p>
            <button onclick="editarUsuario('${usuario.id_biologo}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/editar-perfil.png?raw=true" class="h-6 w-6 ml-5">
            </button>
        </div>
        
        <p class="mt-6">Correo</p>
        <p class="mt-2 underline" id="correo">${usuario.correo_biologo}</p>
        <div class="flex mt-6">
            <p class="mr-2">Solicitud: ${usuario.estado}</p>
        </div>
        <button onclick="CerrarSesion()" id="cerrar_S" class="mt-10">
            <a href="/Front - Proyecto/src/Flora y Fauna UTP - inicio.html" class="flex">
                <p>Cerrar Sesión</p>
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cerrar%20sesi%C3%B3n%20perfil.png?raw=true" alt="" class="ml-4 h-6 w-6">
            </a>
        </button>
    </div>
</div>`;
}

function CerrarSesion(){
    console.log("cerrando sesion")
    localStorage.removeItem('id_usuario');
    localStorage.removeItem("estado_biologo");
    localStorage.removeItem("nombreusuario");
}

//Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarPerfil() {
    document.body.style.overflow = "auto";

    var overlay = document.getElementById("perfil");
    var perfilContainer = document.getElementById("contenedor-Perfil");
    overlay.style.display = "none";
    perfilContainer.style.display = "none"; //Ocultar el cuadro de perfil
}

//Asignar evento al clic en la imagen de perfil
document
    .getElementById("mostrarPerfil")
    .removeEventListener("click", mostrarPerfil);

//Luego, agrega el nuevo evento
document
    .getElementById("mostrarPerfil")
    .addEventListener("click", function (event) {
        event.preventDefault(); 
        mostrarPerfil();
    });


function editarUsuario(id) {

    var usuario = document.getElementById(id);
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    //Guardar el valor original en el atributo data-original-value
    nuevoNombre.setAttribute("data-original-value", usuario.innerText);

    //Ocultar el elemento original y mostrar el input para la edición
    usuario.style.display = "none";
    nuevoNombre.style.display = "inline-block";

    //Asignar el valor actual del nombre de usuario al input
    nuevoNombre.value = usuario.innerText;

    //Habilitar el input para la edición
    nuevoNombre.removeAttribute("disabled");

    //Mostrar los botones de guardar y cancelar
    btnEnviar.style.display = "inline-block";
    btnCancel.style.display = "inline-block";

    //Enfocar el input para facilitar la edición
    nuevoNombre.focus();
}

function guardarNuevoNombre(id) {
    var usuario = document.getElementById(id);
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    // Asignar el nuevo nombre al elemento original
    usuario.innerText = nuevoNombre.value;

    // Mostrar el elemento original y ocultar el input
    usuario.style.display = "inline-block";
    usuario.style = "text-center";
    nuevoNombre.style.display = "none";

    // Deshabilitar el input
    nuevoNombre.setAttribute("disabled", true);

    // Ocultar los botones de guardar y cancelar
    btnEnviar.style.display = "none";
    btnCancel.style.display = "none";

    // Eliminar el atributo data-original-value
    nuevoNombre.removeAttribute("data-original-value");

    // Llamar a la función para actualizar el nombre de usuario en la BD
    ActualizarNombreUsuario(usuario);
}

function cancelarNuevoNombre(id) {

    var usuario = document.getElementById(id);
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    // Obtener el valor inicial del input del atributo data-original-value
    var valorInicial = nuevoNombre.getAttribute("data-original-value");
    nuevoNombre.value = valorInicial;

    // Mostrar el elemento original y ocultar el input
    usuario.style.display = "inline-block";
    usuario.style = "text-center";
    nuevoNombre.style.display = "none";

    // Deshabilitar el input
    nuevoNombre.setAttribute("disabled", true);

    // Ocultar los botones de guardar y cancelar
    btnEnviar.style.display = "none";
    btnCancel.style.display = "none";

    // Eliminar el atributo data-original-value
    nuevoNombre.removeAttribute("data-original-value");
}


