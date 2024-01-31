
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
        contenedor.style.margin = '15px'
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
    

function mostrarImagen() {
    var input = document.getElementById('imagen');
    var imagenSubida = document.getElementById('preview');
    //Primero se verifica si se subió una imagen
    if (input.files && input.files[0]) {
        var imagen = new FileReader();
        imagen.onload = function (e) {
            // Mostrar la nueva imagen seleccionada
            imagenSubida.src = e.target.result;
        };
        imagen.readAsDataURL(input.files[0]); // Convertir la imagen a base64
    }
}


function guardarPublicacion() {
    let id_usuario = localStorage.getItem('id_usuario');
    const apiKey = "a8d6381e4d2a45ac047ad919c1de17a2";
    const fileInput = document.getElementById('imagen');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', file);

    const apiUrl = 'https://api.imgbb.com/1/upload';

    fetch(apiUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta de ImgBB:', data);
        alert('Imagen subida con éxito. Enlace directo: ' + data.data.url);

        const img_pub = data.data.url;

        const titulo = document.getElementById("titulo_pub").value;
        const nombre = document.getElementById("nombre").value;
        const nombre_cientifico = document.getElementById("n_cientifico").value;
        const lugar = document.getElementById("lugar").value;
        const categoria = document.getElementById("categoria").value;
        const sub_cat = document.getElementById("subcategoria").value;
        const descripcion = document.getElementById("descrip_cientifica").value;
        console.log("Datos a enviar al servidor:", { img_pub, titulo, nombre, nombre_cientifico, lugar, categoria, sub_cat, descripcion });

        if (categoria === "flora") {
            fetch(baseUrl + '/flora/' + nombre)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        throw new Error('La flora no existe en el servidor.');
                    } else {
                        throw new Error('Error en la solicitud al servidor. Código de estado: ' + res.status);
                    }
                }
            })
            .then(flora => {
                console.log("Respuesta de la API de flora:", flora);
                if (flora) {
                    window.alert("La flora que intenta publicar ya ha sido registrada.");
                } else {
                    const data_flora = {
                        nombre_planta: nombre,
                        nombre_cientifico_flora: nombre_cientifico,
                        categoria_flora: sub_cat,
                        descripcion_cientifica_flora: descripcion,
                        foto_flora: img_pub,
                    };
                    console.log("Datos pa flora ", data_flora)
                    
                    fetch(baseUrl + "/flora", {
                        method: "POST",
                        body: JSON.stringify(data_flora),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                    })
                    .then(res => {
                        console.log(data_flora);
                        if (res.ok) {
                            fetch(baseUrl + '/flora/' + nombre)
                            .then(res => res.json())
                            .then(buscar_Flora => {
                                const id_flora = buscar_Flora.id_flora;
                                const data_pub_flora = {
                                    titulo: titulo,
                                    lugar: lugar,
                                    id_flora: id_flora,
                                };
                                console.log(data_pub_flora);
                                fetch(baseUrl + "/publicacion/flora", {
                                    method: "POST",
                                    body: JSON.stringify(data_pub_flora),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                    },
                                })
                                .then(res => {
                                    console.log(res);
                                    if(res.ok){
                                        fetch(baseUrl + '/publicacion_flora/' + data_pub_flora.id_flora)
                                        .then(res => res.json())
                                        .then(publicacion_insertada => {
                                            const id_pubFlora = publicacion_insertada.id_publicacion;
                                            console.log(id_pubFlora);

                                            const data_pub_estudiante = {
                                                id_publicacion: id_pubFlora,
                                                id_estudiante: id_usuario,
                                            }
                                            console.log(data_pub_estudiante);
                                            console.log("Entrando a insertar estudiante");
                                            if(res.ok){
                                                fetch(baseUrl + "/publicacion_estudiante", {
                                                    method: "POST",
                                                    body: JSON.stringify(data_pub_estudiante),
                                                    headers: {
                                                        "Content-type": "application/json; charset=UTF-8"
                                                    }
                                                }).then(res => res.json())
                                                    console.log(res)
                                                    ObtenerPublicaciones();
                                                
                                            }
                                        })
                                        .catch(error => {
                                            console.error('Error al obtener las publicaciones:', error);
                                        })
                                    }
                                    console.log("ni modos");
                                })
                                .catch(error => {
                                    console.error('Error al registrar publicación', error);
                                    alert('Error al subir publicación.');
                                });
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error al registrar flora', error);
                        alert('Error al subir publicación.');
                    });
                }
            })
            .catch(error => {
                console.error('Error al obtener información de flora', error);
                alert('Error al subir publicación.');
            });
        }
    })
    .catch(error => {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir publicación.');
    });
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