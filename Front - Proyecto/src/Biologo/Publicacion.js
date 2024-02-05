let urlParams = new URLSearchParams(window.location.search);
let id_pub = urlParams.get('id');
let id_user = localStorage.getItem('id_usuario');
let fauna = [];
let flora = [];
let publicaciones = [];
let comentarios = [];
let estado = localStorage.getItem('estado_biologo')

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
    let cont = document.getElementById("regresar");
    cont.innerHTML += MapRegresar();


    let contenedor = document.getElementById("publicacion");
    contenedor.innerHTML = "";

    if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
        if(estado === "Aprobado"){
            contenedor.innerHTML += MapearPublicacionFlora(publicacion);
            }else{
            contenedor.innerHTML += MapearPublicacionSinFlora(publicacion);
            };
    }
    if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
        if(estado === "Aprobado"){
            contenedor.innerHTML += MapearPublicacionFauna(publicacion);
          }else{
            contenedor.innerHTML += MapearPublicacionSinFauna(publicacion);
          }
    }

}

function MapRegresar(){
    return `<a href="Biologo - Inicio.html">
                <button class="flex p-2 rounded-md ml-10 hover:bg-[#D7EFFF]">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Regresar.png?raw=true" class="mr-1">
                    Volver a Inicio
                </button>
            </a>`
}
function ImprimirComentarios(comentarios) {
    const contenedor = document.getElementById("comentarios");
    contenedor.innerHTML = '';
    comentarios.forEach(comentario => {
        
        if(usuario_name === comentario.nombre_estudiante){
            contenedor.innerHTML +=  MapearComentarioUsuario(comentario);
        }
        else{
            contenedor.innerHTML +=  MapearComentarios(comentario);
        }
        
    });

}
function ImprimirCrearComentario() {
    const contenedor = document.getElementById("AgregarComent");
    contenedor.innerHTML = MapAgregarComentario();
}


function MapearPublicacionFlora(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p id="comentario-${publicacion.id_publicacion}" class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between ml-2 mr-8">

        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:<span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_flora}</span></span>
        <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 w-80 mt-3 ml-2"/>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-5">Planta: ${publicacion.nombre_planta}</span>

        <div id="contenedorEdicion-${publicacion.id_publicacion}" class="flex hidden absolute mt-10">
            <button onmouseenter="mouseenterGuardar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardar('${publicacion.id_publicacion}')" onclick="guardarCambios('${publicacion.id_publicacion}')" id="guardar-${publicacion.id_publicacion}" class="relative">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
                <span id="cambioG-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
            </button>
            <button onmouseenter="mouseenterCancelar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelar('${publicacion.id_publicacion}')" onclick="cancelarEdicion('${publicacion.id_publicacion}')" id="cancelar-${publicacion.id_publicacion}" class="relative ml-4">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
                <span id="cambioC-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
            </button>
        </div>

        <div class="relative inline-block ml-2">
            <button id="boton-principal" class="top-1 right-3 relative ">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
            </button>
            <div class="absolute -mt-3 -ml-44">
                <button onclick="editarNombreC('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Nombre Científico</p>
                    </a>
                </button>
            </div>
        </div>
        
    </div>
    
    <hr class="mt-2  ml-10 mr-10">
    <div class="mt-2 mb-2 xl:ml-10 xl:mr-10 md:ml-10 lg:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <div class="relative inline-block float-right">
            <button id="boton-principal" class="-mt-3">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
            </button>
            <div class="absolute -mt-3 -ml-44">
                <button onclick="editarDescrip('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Descripción</p>
                    </a>
                </button>
            </div>
        </div>
        <p class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_flora}</p>
    </div>`
}

function MapearPublicacionSinFlora(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p id="comentario-${publicacion.id_publicacion}" class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between ml-2 mr-8">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:${publicacion.nombre_cientifico_flora}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-5">Planta: ${publicacion.nombre_planta}</span>
    </div>
    <hr class="mt-2  ml-10 mr-10">
    <div class="mt-2 mb-2 xl:ml-10 xl:mr-10 md:ml-10 lg:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <p class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_flora}</p>
    </div>`
}

function MapearPublicacionFauna(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p id="comentario-${publicacion.id_publicacion}" class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between ml-2 mr-8">

    <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:<span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_fauna}</span></span>
    <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 w-80 mt-3 ml-2"/>
    <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-5">Animal: ${publicacion.nombre_animal}</span>

    <div id="contenedorEdicion-${publicacion.id_publicacion}" class="flex hidden absolute mt-10">
        <button onmouseenter="mouseenterGuardar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardar('${publicacion.id_publicacion}')" onclick="guardarCambios('${publicacion.id_publicacion}')" id="guardar-${publicacion.id_publicacion}" class="relative">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
            <span id="cambioG-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
        </button>
        <button onmouseenter="mouseenterCancelar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelar('${publicacion.id_publicacion}')" onclick="cancelarEdicion('${publicacion.id_publicacion}')" id="cancelar-${publicacion.id_publicacion}" class="relative ml-4">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
            <span id="cambioC-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
        </button>
    </div>

    <div class="relative inline-block ml-2">
        <button id="boton-principal" class="top-1 right-3 relative ">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
        </button>
        <div class="absolute -mt-3 -ml-44">
            <button onclick="editarNombreC('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                    <p>Editar Nombre Científico</p>
                </a>
            </button>
        </div>
    </div>
        
    </div>
    
    <hr class="mt-2  ml-10 mr-10">
    <div class="mt-2 mb-2 xl:ml-10 xl:mr-10 md:ml-10 lg:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <div class="relative inline-block float-right">
            <button id="boton-principal" class="-mt-3">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
            </button>
            <div class="absolute -mt-3 -ml-44">
                <button onclick="editarDescrip('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Descripción</p>
                    </a>
                </button>
            </div>
        </div>
        <p class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_fauna}</p>
    </div>`
}

function MapearPublicacionSinFauna(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p id="comentario-${publicacion.id_publicacion}" class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between ml-2 mr-8">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico: ${publicacion.nombre_cientifico_fauna}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-5">Animal: ${publicacion.nombre_animal}</span>    
    </div>
    <hr class="mt-2  ml-10 mr-10">
    <div class="mt-2 mb-2 xl:ml-10 xl:mr-10 md:ml-10 lg:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <p class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_fauna}</p>
    </div>`
}

function MapearComentarios(comentario){
return `<div id="${comentario.id_comentario}" class= "w-full">
            <hr class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
            <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${comentario.nombre_estudiante}</span>
            <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${comentario.fecha_comentario}</span>
            <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${comentario.comentario}</p>
        </div>`
}
function MapearComentarioUsuario(comentario){
    return `<div id=${comentario.id_comentario} class="w-full">
            <hr class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
                <div class="mt-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
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
                </div>`
    }

function MapAgregarComentario() {
    return `<div class="mt-2 mb-2 w-full">
        <hr class="mt-2 ml-10 mr-10 mb-4">
        <textarea id="text-coment" class="w-full h-28 shadow-md p-2 border rounded mb-4 focus:outline-none" placeholder="Escribe tu comentario..."></textarea>
        <button onclick="AgregarComentario()" class="bg-[#276B58] text-white py-2 px-4 rounded hover:bg-[#2e5c5c] focus:outline-none focus:shadow-outline-blue active:bg-[#4b927e]">
            Publicar comentario
        </button>
    </div>`;
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
        Swal.fire({
            title: "La fauna que intenta publicar ya ha sido registrada.",
            confirmButtonText: "OK",
            confirmButtonColor: "#276B58",
        });
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

function MostrarPub(id) {
    // Construye la URL con el parámetro
    let url = "Publicacion.html?id=" + id;
  
    // Redirige a la página de destino
    window.location.href = url;
  }
  