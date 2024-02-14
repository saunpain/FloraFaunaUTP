let usuario = []
let usuario_name = localStorage.getItem("nombreusuario"); // se obtine el valor del nombre de usuario de la autenticacion a traves del localStorage.getItem
let perfil = "";

function mostrarPerfil() {
    const user = usuario_name;
    fetch(baseUrl + "/estudiante/" + user).then((res) => {
        res.json().then((json) => {
        usuario = json;

        let fotoPerfil = usuario.perfil_estudiante;
        perfil = fotoPerfil;
        ImprimirPerfil(usuario);
        });
    });
}

function ActualizarNombreUsuario(usuario) {

    let data = {
        id_estudiante: usuario.id,
        perfil_estudiante: perfil,
        correo_estudiante: document.getElementById("correo").textContent,
        nombre_estudiante: document.getElementById("input").value,
    };
    console.log('Datos a enviar:', data);
    fetch(baseUrl + "/estudiante", {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        console.log(res);
        usuario_name = data.nombre_estudiante;
        localStorage.setItem("nombreusuario", usuario_name);
        mostrarPerfil();
    });
}


function ImprimirPerfil(usuario) {
    document.body.style.overflow = "hidden";

    var overlay = document.getElementById("perfil");
    var perfilContainer = document.getElementById("contenedor-Perfil");
    let perfilContent = document.getElementById("userProfile-contenido");
    overlay.style.display = "block";
    perfilContainer.style.display = "flex";
    perfilContent.innerHTML = MapearPerfil(usuario);
}

function MapearPerfil(usuario) {
    return `<div class="w-80 h-[24rem] text-lg">
    <div class="ml-6 mr-6">
        <div class="flex justify-center">
            <h1 class="text-2xl">Perfil de usuario</h1>
            <button onclick="cerrarPerfil()" class="absolute ml-80 -mt-5">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Close_profile.png?raw=true" alt="cerrar" class="h-10 w-10">
            </button>
        </div>
        <div class="flex mt-5 items-center">
            <img src="${usuario.perfil_estudiante}" alt="foto de perfil" class="w-16 h-16">
            <p class="ml-5">Avatar de perfil</p>
        </div>
        <p class="mt-6 text-center mb-2 usuario" id="${usuario.id_estudiante}">${usuario.nombre_estudiante}</p>
        <input type="text" id="input" class="hidden mt-6 w-full text-center" disabled/>
        <hr class="h-px border-0 dark:bg-gray-600">
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="guardar" class="hidden focus:outline-none" onclick="guardarNuevoNombre('${usuario.id_estudiante}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
            </button>
            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Guardar cambios</p>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="cancelar" class="hidden focus:outline-none" onclick="cancelarNuevoNombre('${usuario.id_estudiante}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar">
            </button>
            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                <p class="text-sm">Cancelar</p>
            </div>
        </div>
        <div class="flex justify-center">
            <p>Editar</p>
            <button onclick="editarUsuario('${usuario.id_estudiante}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/editar-perfil.png?raw=true" class="h-6 w-6 ml-5">
            </button>
        </div>
        
        <p class="mt-6">Correo</p>
        <p class="mt-2 underline" id="correo">${usuario.correo_estudiante}</p>
        <button onclick="CerrarSesion()" id="cerrar_S" class="mt-10">
            <a href="/Front - Proyecto/src/Flora y Fauna UTP - inicio.html" class="flex">
                <p>Cerrar Sesión</p>
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cerrar%20sesi%C3%B3n%20perfil.png?raw=true" alt="" class="ml-4 h-6 w-6">
            </a>
        </button>
    </div>
</div>`;
}
//funcion que al darle click al boton de cerrar sesion remueve los valores del id_usuario y el nombre de usuario 
function CerrarSesion(){
    console.log("cerrando sesion")
    localStorage.removeItem('id_usuario');
    localStorage.removeItem("nombreusuario");
}

// Función para cerrar el cuadro de perfil y quitar la capa oscura
function cerrarPerfil() {
    document.body.style.overflow = "auto";

    var overlay = document.getElementById("perfil");
    var perfilContainer = document.getElementById("contenedor-Perfil");
    overlay.style.display = "none";
    perfilContainer.style.display = "none"; // Ocultar el cuadro de perfil
}

// Asignar evento al clic en la imagen de perfil
document.getElementById("mostrarPerfil")
    .removeEventListener("click", mostrarPerfil);

// Luego, agrega el nuevo evento
document.getElementById("mostrarPerfil")
    .addEventListener("click", function (event) {
        event.preventDefault(); 
        mostrarPerfil();
    });

function editarUsuario(id) {
    var usuario = document.getElementById(id);
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    nuevoNombre.setAttribute("data-original-value", usuario.innerText);
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
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    usuario.innerText = nuevoNombre.value;
    usuario.style.display = "inline-block";
    usuario.style = "text-center";
    nuevoNombre.style.display = "none";
    nuevoNombre.setAttribute("disabled", true);

    btnEnviar.style.display = "none";
    btnCancel.style.display = "none";

    nuevoNombre.removeAttribute("data-original-value");
    ActualizarNombreUsuario(usuario);
}

function cancelarNuevoNombre(id) {
    var usuario = document.getElementById(id);
    var nuevoNombre = document.getElementById("input");
    var btnEnviar = document.getElementById("guardar");
    var btnCancel = document.getElementById("cancelar");

    var valorInicial = nuevoNombre.getAttribute("data-original-value");
    nuevoNombre.value = valorInicial;

    usuario.style.display = "inline-block";
    usuario.style = "text-center";
    nuevoNombre.style.display = "none";
    nuevoNombre.setAttribute("disabled", true); // Deshabilitar el input
    btnEnviar.style.display = "none";
    btnCancel.style.display = "none";

    nuevoNombre.removeAttribute("data-original-value");
}
