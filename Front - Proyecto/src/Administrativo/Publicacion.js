let urlParams = new URLSearchParams(window.location.search);
let id_pub = urlParams.get('id');
let id_user = localStorage.getItem('id_usuario');
let fauna = [];
let flora = [];
let publicaciones = [];
let comentarios = [];

function ObtenerPublicaciones(){
    fetch(baseUrl + '/vista/' + id_pub).then(res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacion(publicaciones);
            
        });
    });
}

function ObtenerComentarios() {
    return fetch(baseUrl + '/comentarios/' + id_pub)
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


function ImprimirPublicacion(publicacion) {
    let contenedor = document.getElementById("publicacion");
    contenedor.innerHTML = "";

    if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
        contenedor.innerHTML += MapearPublicacionFlora(publicacion);
    }

    if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
        contenedor.innerHTML += MapearPublicacionFauna(publicacion);
    }

}


function ImprimirComentarios(comentarios) {
    const contenedor = document.getElementById("comentarios");
    contenedor.innerHTML = '';
    
    comentarios.forEach(comentario => {
        contenedor.innerHTML +=  MapearComentarios(comentario);
    });

}

function EliminarPublicaciones(id){
    fetch(baseUrl + "/publicaciones/" + id, {method: "Delete"}).then(res =>{
        window.location.href = "Admin - Inicio.html";
    })
}

function MapearPublicacionFlora(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
                <div class="mt-2">
                    <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                    <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                    <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
                    <div class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">
                        <span id="comentario-${publicacion.id_publicacion}">${publicacion.titulo}</span>
                        <input type="text" id="input-${publicacion.id_publicacion}" class="hidden w-full mb-2" disabled/>
                        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                            <button id="guardar-${publicacion.id_publicacion}" class="hidden focus:outline-none" onclick="guardarCambios('${publicacion.id_publicacion}')">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
                            </button>
                            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                                <p>Guardar cambios</p>
                            </div>
                        </div>
                        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                            <button id="cancelar-${publicacion.id_publicacion}" class="hidden focus:outline-none" onclick="cancelarEdicion('${publicacion.id_publicacion}')">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar">
                            </button>
                            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                                <p>Cancelar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-5 mb-5">
                    <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
                </div>
                <div class="flex items-center justify-between ml-2 mb-2">
                        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_flora}</span>
                        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
                    <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="top-1 right-3 relative " @click="open = !open">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
                        </button>
                        <div class="absolute bg-white border rounded -mt-3 -ml-36" x-show="open" @click.away="open = false">
                            <button class="block w-[11rem]" onclick="editarTitulo('${publicacion.id_publicacion}')">
                                <a class="flex px-2 py-1 text-sm">
                                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                                    <p>Editar título</p>
                                </a>
                            </button>
                            <hr class="w-full">
                            <button class="block w-[11rem]" onclick="EliminarPublicaciones('${publicacion.id_publicacion}')">
                                <a class="flex px-2 py-1 text-sm">
                                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/delete-icon.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                                    <p>Eliminar</p>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            <hr class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
            <div class="mt-2 mb-2">
                <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
                <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_flora}</p>
            </div>`
}



function MapearComentarios(comentario){
    return `<div id="${comentario.id_comentario}" class= "w-full">
                <hr class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
                <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${comentario.nombre_estudiante}</span>
                <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${comentario.fecha_comentario}</span>
                <div class="flex mt-2">
                    <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${comentario.comentario}</p>
                    <div class="relative inline-block ml-4" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="mt-2" onclick="EliminarComentario(${comentario.id_comentario})">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/delete-icon.png?raw=true" class="mr-10 w-4">
                        </button>
                        <div class="absolute bg-white border rounded -ml-32 w-[9rem]" x-show="open" @click.away="open = false">
                            <span class="px-2 py-1 text-sm">
                                Eliminar comentario
                            </span>
                        </div>
                    </div>
                </div>
            </div>`
    }

function MapearPublicacionFauna(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
                <div class="mt-2">
                    <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                    <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                    <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
                    <div class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">
                        <span id="comentario-${publicacion.id_publicacion}">${publicacion.titulo}</span>
                        <input type="text" id="input-${publicacion.id_publicacion}" class="hidden w-full mb-2" disabled/>
                        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                            <button id="guardar-${publicacion.id_publicacion}" class="hidden focus:outline-none" onclick="guardarCambios('${publicacion.id_publicacion}')">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar">
                            </button>
                            <div class="absolute bg-white border rounded -ml-5 w-[8rem] p-1" x-show="open" @click.away="open = false">
                                <p>Guardar cambios</p>
                            </div>
                        </div>
                        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                            <button id="cancelar-${publicacion.id_publicacion}" class="hidden focus:outline-none" onclick="cancelarEdicion('${publicacion.id_publicacion}')">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar">
                            </button>
                            <div class="absolute bg-white border rounded p-1" x-show="open" @click.away="open = false">
                                <p>Cancelar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mt-5 mb-5">
                    <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
                </div>
                <div class="flex items-center justify-between ml-2 mb-2">
        
                        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_fauna}</span>
                        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
                    
                    <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="top-1 right-3 relative " @click="open = !open">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
                        </button>
                        <div class="absolute bg-white border rounded -mt-3 -ml-36" x-show="open" @click.away="open = false">
                            <button class="block w-[11rem]" onclick="editarTitulo('${publicacion.id_publicacion}')">
                                <a class="flex px-2 py-1 text-sm">
                                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                                    <p>Editar comentario</p>
                                </a>
                            </button>
                            <hr class="w-full">
                            <button class="block w-[11rem]" onclick="EliminarPublicaciones('${publicacion.id_publicacion}')">
                                <a class="flex px-2 py-1 text-sm">
                                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/delete-icon.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                                    <p>Eliminar</p>
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            <hr class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
            <div class="mt-2 mb-2">
                <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
                <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_fauna}</p>
            </div>`
}

function ActualizarPub(id) {
    let data = {
      id_publicacion: id,
      titulo: document.getElementById("input-" + id).value,
      lugar: document.getElementById("lugar-" + id).textContent,
    };
  
    console.log('Datos a enviar:', data);
  
    fetch(baseUrl + "/publicaciones", {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(res => {
        ObtenerPublicaciones();
    }).catch(error => {
      console.log("No se ha podido completar su solicitud.", error);
    });
  }

function EliminarComentario(id){
    fetch(baseUrl + "/comentario/" + id, {method: "Delete"}).then(res =>{
        console.log(res)
        location.reload()
        ObtenerPublicaciones()
    })
    
}

function editarTitulo(id) {
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
    ActualizarPub(id);
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

function AgregarComentario() {
    var elemento = document.getElementById("text-coment").value;
    if (elemento === "" || elemento === null) {
        window.alert('Usted no ha comentado nada.');
    } else {
        GuardarComentario();
    }
}
function GuardarComentario(){
    let data = {
        comentario: document.getElementById("text-coment").value,
        id_publicacion: id_pub,
        id_estudiante: id_user,
    }
    console.log(data)

    fetch(baseUrl + "/comentario", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        console.log(res)
        location.reload()
        ObtenerPublicaciones()
    })
}