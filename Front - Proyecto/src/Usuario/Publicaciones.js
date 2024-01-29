
/*************FUNCIONES PARA MAPEAR PUBLICACIONES VISTA GENERAL********************/

let fauna = [];
let flora = [];
let publicaciones = [];
let comentarios = [];

function ObtenerPublicaciones() {
    fetch(baseUrl + '/vista/all').then(res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones);
        });
    });
}

function ImprimirPublicacionesUsuario(publicaciones) {
    let contenedor = document.getElementById("publicacion");
    contenedor.innerHTML = "";

    
    const publicacionesEstudiante = publicaciones.filter(publicacion => {
        return usuario_name === publicacion.nombre_estudiante &&
            (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" ||
            publicacion.nombre_animal !== null && publicacion.nombre_animal !== "");
    });
    

    if (publicacionesEstudiante.length === 0) {
        contenedor.innerHTML = usuario_name + " no ha realizado publicaciones.";
        contenedor.style.fontWeight = 'bold';
        return;
    }

    publicacionesEstudiante.forEach(publicacion => {
        if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
            contenedor.innerHTML += MapearPublicacionUsusarioFlora(publicacion);
        }
        if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
            contenedor.innerHTML += MapearPublicacionUsusarioFauna(publicacion);
        }
    });
}


function MapearPublicacionUsusarioFlora(publicacion) {
return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
        <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
            <div class="mt-2">
                <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
            </div>    
        </a>    
        <div id="lugar-${publicacion.id_publicacion}" class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2">
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
                <div class="flex items-center">
                    <button id="${publicacion.id_publicacion}" class="w-6 lg:w-6 lg:h-6" onclick="DarLike('${publicacion.id_publicacion}')">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="w-5 h-5 lg:w-6 lg:h-6">
                    </button>
                    <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px] ml-1">35</span>
                </div>
                <button onclick="MostrarPub('${publicacion.id_publicacion}')" class="w-6 lg:w-6 lg:h-6 flex mr-5">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
                    <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
                </button>
                <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_flora}</span>
                <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_planta}</span>
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
                </div>
            </div>
        </div>
    </div>`;
}


function MapearPublicacionUsusarioFauna(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
                    <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
                        <div class="mt-2">
                            <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                            <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                            <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
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
                            <div class="flex items-center">
                                <button id="${publicacion.id_publicacion}" class="w-6 lg:w-6 lg:h-6" onclick="DarLike('${publicacion.id_publicacion}')">
                                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="w-5 h-5 lg:w-6 lg:h-6">
                                </button>
                                <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px] ml-1">35</span>
                            </div>
                            <button onclick="MostrarPub('${publicacion.id_publicacion}')" class="w-6 lg:w-6 lg:h-6 flex mr-5">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
                                <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
                            </button>
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
                            </div>
                        </div>
                    </div>
                </div>`;
    }
    

function CrearPublicacion(){
    return `<div id="publicar" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6 md:text-[16px] text-[12.5px] hidden">
    <div class="flex justify-center">
        <form action="/procesarFormulario" method="post" enctype="multipart/form-data" class="m-4">
            <input type="file" id="imagen" name="imagen" accept="image/*" style="display:none" onchange="mostrarImagen()">
            <label for="imagen" style="cursor:pointer;">
                <img id="preview" src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Subir%20imagen.png?raw=true" alt="Vista previa de la imagen" class="w-52 h-44">
            </label>
        </form>
        <img id="preview" alt="Vista previa de la imagen" class="hidden">
        <div class="w-96 m-5">
            <h3>Título</h3>
            <textarea class="w-full h-20 shadow-md p-2 border rounded-lg focus:outline-none" placeholder="Escribe un título o comentario..."></textarea>
            <h3>Nombre</h3>
            <input type="text" class="shadow-md p-2 border rounded-lg mb-2 focus:outline-none h-10 w-full" placeholder="Ingrese el nombre común...">
            
        </div>
    </div>
    
    <div class="justify-around items-center sm:flex md:flex lg:block xl:flex">
        <div class="ml-5 mr-2">
            <h3>Nombre científico</h3>
            <input type="text" class="shadow-md p-2 border rounded-lg mb-2 focus:outline-none h-10 w-full" placeholder="Ingrese el nombre científico...">
            <h3>Lugar</h3>
            <select class="shadow-md p-2 border rounded-lg mb-2 focus:outline-none w-full text-gray-400">
                <option disabled selected>Seleccione un lugar</option>
                <option>Campus Levi Sasso</option>
                <option>Ext. Sede Tocumen</option>
            </select>
        </div>
        <div class="ml-5 mr-5">
            <h3>Categoría</h3>
            <select id="categoria" onchange="seleccionCategoria()" class="shadow-md p-2 border rounded-lg mb-2 focus:outline-none w-full text-gray-400">
                <option disabled selected>Seleccione categoría</option>
                <option value="flora">Flora</option>
                <option value="fauna">Fauna</option>
            </select>
        
            <h3>Subcategoría</h3>
            <select id="subcategoria" class="shadow-md p-2 border rounded-lg mb-2 focus:outline-none w-full text-gray-400">
                <option disabled selected>Seleccione subcategoría</option>
                <optgroup label="Flora" id="floraOp" class="hidden">
                    <option>Hierbas</option>
                    <option>Planta</option>
                    <option>Árboles</option>
                </optgroup>
                <optgroup label="Fauna" id="faunaOp" class="hidden">
                    <option>Aves</option>
                    <option>Reptiles</option>
                    <option>Artrópodos</option>
                    <option>Mamíferos</option>
                </optgroup>
            </select>
            
        </div>
    </div>
    <div class="m-5">
        <h3>Descripción</h3>
        <textarea class="w-full h-28 shadow-md p-2 border rounded-lg focus:outline-none" placeholder="Agregue una descripción científica sobre su publicación."></textarea>
    </div>
    <div class="justify-center flex">
        <button class="bg-[#276B58] w-36 text-white py-2 px-4 m-5 rounded-lg hover:bg-[#2e5c5c] focus:outline-none active:bg-[#4b927e]">
            Publicar
        </button>
        <button id="cancelarPub" class="bg-[#4b927e] w-36 text-white py-2 px-4 m-5 rounded-lg hover:bg-[#2e5c5c] focus:outline-none active:bg-[#276B58]">
            Cancelar
        </button>
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