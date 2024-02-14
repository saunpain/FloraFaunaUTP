let fauna = [];
let flora = [];
let comentarios = [];

let id_usuario = localStorage.getItem('id_usuario');

function ObtenerPublicaciones() {
    fetch(baseUrl + '/vista/all').then(res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones); 
        });
    });
}

function ObtenerComentarios() {
    return fetch(baseUrl + '/comentario/' + id_usuario)
        .then(res => res.json())
        .then(json => {
            comentarios = json;
            ImprimirComentarios(comentarios);
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

function ImprimirComentarios(comentarios) {
    const contenedor = document.getElementById("pub");
    contenedor.innerHTML = '';

    comentarios.forEach(comentario => {
        const comentarioHTML = MapearComentarios(comentario);
        contenedor.innerHTML += comentarioHTML;
    });

    if (comentarios.length === 0) {
        
        contenedor.innerHTML = usuario_name + " no ha comentado en ninguna publicación.";
        contenedor.style.fontWeight = 'bold';
    }
}


function MapearComentarios(comentario){

    return `<div id=${comentario.id_comentario} class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
    <div class="mb-5 ml-2 mr-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px]">
        <div class="">
            <span class="textito font-semibold ml-0 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Comentaste: </span>
            <span id="fecha-${comentario.id_comentario}" class="textito text-gray-400 ml-10 md:mr-6 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${comentario.fecha_comentario}</span>
            <div class="relative inline-block float-right" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false"> <!--Menú desplegable implementando lógica de Framework Alpine.js-->
                <button class="-mt-3" @click="open = !open">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true" alt="">
                </button>
                <div class="absolute bg-white border rounded -mt-3 -ml-36" x-show="open" @click.away="open = false">
                    <button class="block w-[11rem]" onclick="editarTitComentario('${comentario.id_comentario}')">
                        <a class="flex px-2 py-1 text-sm">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                            <p>Editar comentario</p>
                        </a>
                    </button>
                </div>
            </div>
        </div>
        <span id="comentarioC-${comentario.id_comentario}" class="mt-2">${comentario.comentario}</span>
        <input type="text" id="inputC-${comentario.id_comentario}" class="hidden w-full mb-2" disabled/>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="guardarC-${comentario.id_comentario}" class="hidden focus:outline-none" onclick="guardarCambioComentario('${comentario.id_comentario}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
            </button>
            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                <p>Guardar cambios</p>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="cancelarC-${comentario.id_comentario}" class="hidden focus:outline-none" onclick="cancelarEdicionComentario('${comentario.id_comentario}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar">
            </button>
            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                <p>Cancelar</p>
            </div>
        </div>
    </div>
    <button id="pub-${comentario.id_publicacion}" class="w-full">
        <div class="mt-2 mb-2 border-slate-300 border-[1.5px] rounded-md">
            <a onclick="MostrarPub(${comentario.id_publicacion})" class="text-left">
                <div class="mt-2 ml-2 mr-2 mb-2">
                    <p>Ir a publicación</p>
                </div>
            </a>
        </div>
    </button>
</div>`
}

function editarTitComentario(id) {
    var comentarioTextoElemento = document.getElementById("comentarioC-" + id);
    var comentarioInput = document.getElementById("inputC-" + id);
    var btnEnviar = document.getElementById("guardarC-" + id);
    var btnCancel = document.getElementById("cancelarC-" + id);

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

function guardarCambioComentario(id) {
    var comentarioTextoElemento = document.getElementById("comentarioC-" + id);
    var comentarioInput = document.getElementById("inputC-" + id);
    var btnEnviar = document.getElementById("guardarC-" + id);
    var btnCancel = document.getElementById("cancelarC-" + id);

    comentarioTextoElemento.innerText = comentarioInput.value;
    comentarioTextoElemento.style.display = "inline-block";
    comentarioInput.style.display = "none";
    comentarioInput.setAttribute("disabled", true); // Deshabilitar el input
    btnEnviar.style.display = "none";
    btnCancel.style.display = "none";

    // Eliminar el atributo data-original-value
    comentarioInput.removeAttribute('data-original-value');
    ActualizarComentario(id);
}

function cancelarEdicionComentario(id) {
    var comentarioTextoElemento = document.getElementById("comentario-" + id);
    var comentarioInput = document.getElementById("inputC-" + id);
    var btnEnviar = document.getElementById("guardarC-" + id);
    var btnCancel = document.getElementById("cancelarC-" + id);

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

function ActualizarComentario(id) {
    let data = {
    id_comentario: id,
    comentario: document.getElementById("inputC-" + id).value,
    };

    console.log('Datos a enviar:', data);

    fetch(baseUrl + "/comentario", {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    }).then(res => {
        console.log(res)
        ObtenerComentarios();
    }).catch(error => {
    console.log("No se ha podido completar su solicitud.", error);
    });
}

function MostrarPub(id) {
    // Construye la URL con el parámetro
    let url = "Publicacion.html?id=" + id;

    // Redirige a la página con la publicacion indicada
    window.location.href = url;
}

function menuCategoria() {
    window.location.href = "Usuario - Inicio.html";
}