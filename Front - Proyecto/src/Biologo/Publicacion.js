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
    let cont = document.getElementById("regresar");
    cont.innerHTML += MapRegresar();


    let contenedor = document.getElementById("publicacion");
    contenedor.innerHTML = "";
    const estado = localStorage.getItem('estado_biologo');
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
        <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between mr-0 xl:ml-10 xl:mr-10 lg:ml-0">
        <div class="xl:flex items-center lg:block md:flex block">
            <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico: <span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_flora}</span></span>
            <div class="flex items-center justify-center">
                <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 lg:w-14 xl:w-20 ml-1 xl:text-sm lg:text-xs md:text-sm text-xs"/>
                <div id="contenedorEdicion-${publicacion.id_publicacion}" class="flex hidden absolute mt-12 p-1 z-10">
                    <button onmouseenter="mouseenterGuardar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardar('${publicacion.id_publicacion}')" onclick="guardarCambios('${publicacion.id_publicacion}')" id="guardar-${publicacion.id_publicacion}" class="inline-block p-1"">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
                        <span id="cambioG-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
                    </button>
                    <button onmouseenter="mouseenterCancelar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelar('${publicacion.id_publicacion}')" onclick="cancelarEdicion('${publicacion.id_publicacion}')" id="cancelar-${publicacion.id_publicacion}" class="inline-block p-1">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
                        <span id="cambioC-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
        <div>  
            <span class="textito font-bold text-[#241111] ml-1 mr-1 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px]">Planta: <span id="planta-${publicacion.id_publicacion}">${publicacion.nombre_planta}</span></span>
        </div>
        <div class="relative inline-block">
            <button id="boton-principal" class="top-1 relative p-1">
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
    
    <hr class="mt-4 xl:ml-10 xl:mr-10 lg:ml-0 lg:mr-0">
    <div class="mt-4 mb-2 xl:ml-10 xl:mr-10 md:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <div class="relative inline-block float-right">
            <button id="boton-principal" class="-mt-3">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
            </button>
            <div class="absolute -mt-3 -ml-44">
                <button onclick="editarDescripcion('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Descripción</p>
                    </a>
                </button>
            </div>
        </div>
        <p id="descripcion-${publicacion.id_publicacion}" class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_flora}</p>
        <textarea id="inputD-${publicacion.id_publicacion}" type="text" class="hidden h-20 w-full mt-3 ml-2"></textarea>

        <div id="contenedorEdicionD-${publicacion.id_publicacion}" class="flex hidden absolute z-10">
        <button onmouseenter="mouseenterGuardarD('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardarD('${publicacion.id_publicacion}')" onclick="guardarDescripcion('${publicacion.id_publicacion}')" id="guardarD-${publicacion.id_publicacion}" class="relative">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
            <span id="cambioGD-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
        </button>
        <button onmouseenter="mouseenterCancelarD('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelarD('${publicacion.id_publicacion}')" onclick="cancelarDescripcion('${publicacion.id_publicacion}')" id="cancelarD-${publicacion.id_publicacion}" class="relative ml-2">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
            <span id="cambioCD-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
        </button>
        </div>
    </div>`
}

function MapearPublicacionSinFlora(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
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
        <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex items-center justify-between mr-0 xl:ml-10 xl:mr-10 lg:ml-0">
        <div class="xl:flex items-center lg:block md:flex block">
            <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico: <span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_fauna}</span></span>
            <div class="flex items-center justify-center">
                <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 lg:w-14 xl:w-20 ml-1 xl:text-sm lg:text-xs md:text-sm text-xs"/>
                <div id="contenedorEdicion-${publicacion.id_publicacion}" class="flex hidden absolute mt-12 p-1 z-10">
                    <button onmouseenter="mouseenterGuardar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardar('${publicacion.id_publicacion}')" onclick="guardarCambios('${publicacion.id_publicacion}')" id="guardar-${publicacion.id_publicacion}" class="inline-block p-1">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
                        <span id="cambioG-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
                    </button>
                    <button onmouseenter="mouseenterCancelar('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelar('${publicacion.id_publicacion}')" onclick="cancelarEdicion('${publicacion.id_publicacion}')" id="cancelar-${publicacion.id_publicacion}" class="inline-block p-1">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
                        <span id="cambioC-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <span class="textito font-bold text-[#241111] ml-1 mr-1 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px]"> Animal: <span id="animal-${publicacion.id_publicacion}">${publicacion.nombre_animal}</span></span>
        </div>
        

        <div class="relative inline-block">
            <button id="boton-principal" class="top-1 relative p-1">
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
    
    <hr class="mt-2 xl:ml-10 xl:mr-10 lg:ml-0 lg:mr-0">
    <div class="mt-4 mb-2 xl:ml-10 xl:mr-10 md:ml-0">
        <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <div class="relative inline-block float-right">
            <button id="boton-principal" class="-mt-3">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
            </button>
            <div class="absolute -mt-3 -ml-44">
                <button onclick="editarDescripcion('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black text-left hover:bg-gray-200">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Edit.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Descripción</p>
                    </a>
                </button>
            </div>
        </div>
        <p id="descripcion-${publicacion.id_publicacion}" class="textito text-justify text-[#241111] xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_fauna}</p>
        <textarea id="inputD-${publicacion.id_publicacion}" type="text" class="hidden  h-20 w-full mt-3 ml-2"></textarea>

        <div id="contenedorEdicionD-${publicacion.id_publicacion}" class="flex hidden absolute z-10">
        <button onmouseenter="mouseenterGuardarD('${publicacion.id_publicacion}')" onmouseleave="mouseleaveGuardarD('${publicacion.id_publicacion}')" onclick="guardarDescripcion('${publicacion.id_publicacion}')" id="guardarD-${publicacion.id_publicacion}" class="relative">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
            <span id="cambioGD-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
        </button>
        <button onmouseenter="mouseenterCancelarD('${publicacion.id_publicacion}')" onmouseleave="mouseleaveCancelarD('${publicacion.id_publicacion}')" onclick="cancelarDescripcion('${publicacion.id_publicacion}')" id="cancelarD-${publicacion.id_publicacion}" class="relative ml-2">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
            <span id="cambioCD-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
        </button>
        </div>
    </div>`
}

function MapearPublicacionSinFauna(publicacion){
    return `<div id="${publicacion.id_publicacion}" class="w-full">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
        <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${publicacion.titulo}</p>
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
return `<div id="${comentario.id_comentario}" class= "w-full mt-2">
            <hr class="mt-2 mb-2 md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10">
            <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${comentario.nombre_estudiante}</span>
            <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${comentario.fecha_comentario}</span>
            <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">${comentario.comentario}</p>
        </div>`
}


function MostrarPub(id) {
    // Construye la URL con el parámetro
    let url = "Publicacion.html?id=" + id;
  
    // Redirige a la página de destino
    window.location.href = url;
}

function FiltrarPublicaciones() {
    let busqueda = document.getElementById("busqueda-input").value.trim()
  
    if(busqueda == null){
        ImprimirPublicaciones(pub)
    }
    else{
        fetch(baseUrl + "/publicacion/filtrarGlob?busqueda=" + busqueda).then(res => {
            res.json().then(json =>{
                pubFiltro = json
                console.log(busqueda)
                console.log(pubFiltro)
                ImprimirPublicaciones(pubFiltro)
            })
        }).catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
  }
