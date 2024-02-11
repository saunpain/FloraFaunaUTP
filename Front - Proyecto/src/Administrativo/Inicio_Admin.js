
/*************FUNCIONES PARA MAPEAR PUBLICACIONES INICIO DE ADMIN********************/

let fauna = [];
let flora = [];
let publicaciones = [];
let categoria = "";

function ObtenerPublicaciones() {
    fetch(baseUrl + '/vista/all').then(res => {
        res.json().then(json => {
        publicaciones = json;
        ImprimirPublicaciones(publicaciones);
        });
    });
}

function ObtenerFlora(){
    fetch(baseUrl + "/vista_flora").then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicaciones(publicaciones);
        })
    })
}
function ObtenerFauna(){
    fetch(baseUrl + "/vista_fauna").then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicaciones(publicaciones);
        })
    })
}
function ObtenerFloraCategoria(categoria){
    fetch(baseUrl + "/vista_flora/" + categoria).then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicaciones(publicaciones);
        })
    })
}
function ObtenerFaunaCategoria(categoria){
    fetch(baseUrl + "/vista_fauna/" + categoria).then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicaciones(publicaciones);
        })
    })
}

function menuCategoria(categoria){
    let contenedor = document.getElementById("pub");
    contenedor.innerHTML = "";

    if(categoria === "flora"){
        ObtenerFlora()
    }
    if(categoria === "fauna"){
        ObtenerFauna()
    }
    if(categoria === "planta"){
        ObtenerFloraCategoria("Planta")
    }
    if(categoria === "hierbas"){
        ObtenerFloraCategoria("Hierbas")
    }
    if(categoria === "arboles"){
        ObtenerFloraCategoria("Arboles")
    }
    if(categoria === "aves"){
        ObtenerFaunaCategoria("Aves")
    }
    if(categoria === "reptiles"){
        ObtenerFaunaCategoria("Reptiles")
    }
    if(categoria === "artropodos"){
        ObtenerFaunaCategoria("Artrópodos")
    }
    if(categoria === "mamiferos"){
        ObtenerFaunaCategoria("Mamíferos")
    }
}

function ImprimirPublicaciones(publicaciones) {
    let contenedor = document.getElementById("pub");
    contenedor.innerHTML = "";

    publicaciones.forEach((publicacion, index) => {
        if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
            contenedor.innerHTML += MapearPublicacionFlora(publicacion);
        }
    
        if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
            contenedor.innerHTML += MapearPublicacionFauna(publicacion);
        }
    
        if (index === publicaciones.length - 1) {
            contenedor.innerHTML += Subir();
        }
    });
}

function EliminarPublicaciones(id){
    fetch(baseUrl + "/publicaciones/" + id, {method: "Delete"}).then(res =>{
        console.log(res)
        ObtenerPublicaciones()
    })
}

function MapearPublicacionFlora(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
                <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
                    <div class="mt-2">
                        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
                    </div>
                </a>
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
            <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
                <div class="flex justify-center mt-5 mb-5">
                    <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
                </div>
            </a>
                <div class="flex justify-around items-center mb-2">
                    <div class="flex items-center">
                        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_flora}</span>
                        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
                    </div>
                    <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="top-1 right-3 relative " @click="open = !open">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
                        </button>
                        <div class="absolute bg-white border rounded -mt-3 -ml-36" x-show="open" @click.away="open = false">
                            <button class="block w-[11rem]" onclick="editarComentario('${publicacion.id_publicacion}')">
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
            </div>`;
}


function MapearPublicacionFauna(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
                <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
                    <div class="mt-2">
                        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                        <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                        <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0"> ${publicacion.lugar}</span>
                    </div>
                </a>
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
                <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
                    <div class="flex justify-center mt-5 mb-5">
                        <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
                    </div>
                </a>
                <div class="flex justify-around items-center mb-2">
                    <div class="flex items-center">
                        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_fauna}</span>
                        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
                    </div>
                    <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                        <button class="top-1 right-3 relative " @click="open = !open">
                            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/edit%20pub.png?raw=true">
                        </button>
                        <div class="absolute bg-white border rounded -mt-3 -ml-36" x-show="open" @click.away="open = false">
                            <button class="block w-[11rem]" onclick="editarComentario('${publicacion.id_publicacion}')">
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
            </div>`;
}

function Subir(){
    return `<div class="mt-10 flex justify-center">
              <div class="mt-10 flex justify-center">
              <a href="javascript:void(0);" onclick="subirBoton('pub')" class="bg-[#276B58] active:bg-[#50a48c] hover:bg-[#5e9f9f] w-full h-7 text-center text-white absolute bottom-0">
                Ir arriba
              </a>
              </div>
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
  
function MostrarPub(id) {
    // Construye la URL con el parámetro
    let url = "Publicacion.html?id=" + id;

    // Redirige a la página de destino
    window.location.href = url;
}

function subirBoton(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function FiltrarPublicaciones() {
    let busqueda = document.getElementById("busqueda-input").value.trim()

    if(busqueda == null){
        ImprimirPublicaciones(pub)
    }
    else{
        fetch(baseUrl + "/vista/filtrarGlob?busqueda=" + busqueda).then(res => {
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