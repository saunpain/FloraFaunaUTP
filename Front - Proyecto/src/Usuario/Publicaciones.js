
/*************FUNCIONES PARA MAPEAR PUBLICACIONES********************/

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
function ObtenerFlora(){
    fetch(baseUrl + "/vista_flora").then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones);
        })
    })
}
function ObtenerFauna(){
    fetch(baseUrl + "/vista_fauna").then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones);
        })
    })
}

function ObtenerFloraCategoria(categoria){
    fetch(baseUrl + "/vista_flora/" + categoria).then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones);
        })
    })
}

function ObtenerFaunaCategoria(categoria){
    fetch(baseUrl + "/vista_fauna/" + categoria).then( res => {
        res.json().then(json => {
            publicaciones = json;
            ImprimirPublicacionesUsuario(publicaciones);
        })
    })
}

function menuCategoria(categoria){
    let contenedor = document.getElementById("publicacion");
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
function ImprimirPublicacionesUsuario(publicaciones) { //Imprime las publicaiones del usuario
    let contenedor = document.getElementById("publicacion");
    contenedor.innerHTML = "";

    
    const publicacionesEstudiante = publicaciones.filter(publicacion => {
        return usuario_name === publicacion.nombre_estudiante && //Verifica si el usuario tiene pubicaciones en flora o en fauna
            (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "" ||
            publicacion.nombre_animal !== null && publicacion.nombre_animal !== "");
    });
    

    if (publicacionesEstudiante.length === 0) { //En caso de que el usuario no tenga publicaciones, se muestra este mensaje
        contenedor.innerHTML = usuario_name + " no ha realizado publicaciones.";
        contenedor.style.fontWeight = 'bold';
        contenedor.style.margin = '15px'
        return;
    }

    publicacionesEstudiante.forEach(publicacion => { //Si la publicacion no tiene null el nombre de la planta pero es null el nombre de animal, significa que la publicación es de Flora
        if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
            contenedor.innerHTML += MapearPublicacionUsusarioFlora(publicacion); //Mapea la publicación de flora
        }
        if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") { ////Si la publicacion no tiene null el nombre de la animal pero es null el nombre de plata, significa que la publicación es de Fauna
            contenedor.innerHTML += MapearPublicacionUsusarioFauna(publicacion); //Mapea la publicaión de Fauna
        }
    });
}



function MapearPublicacionUsusarioFlora(publicacion) {
return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
        <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
            <div class="mt-2">
                <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                <span id="lugar-${publicacion.id_publicacion}" class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
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
                            <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_fauna}</span>
                            <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
                        </div>
                        <div class="relative inline-block ml-5" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                            <button class="top-1 right-3 relative" @click="open = !open">
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
    

function mostrarImagen() { //Muestra la imagen en el contenedor para hacer una breve preview de esta
    var input = document.getElementById('imagen');
    var imagenSubida = document.getElementById('preview');

    //Se verifica que se haya subido alguna imagen
    if (input.files && input.files[0]) {

        var imagen = new FileReader(); //Crea un objeto fileReader

        imagen.onload = function (e) { //Este evento onload se ejecuta al leer la foto subida
            // Muestra la nueva imagen subida
            imagenSubida.src = e.target.result;
        };
        imagen.readAsDataURL(input.files[0]); // Convierte la imagen a base64 (el archivo se lee como una caderna de caracteres para representar la imagen)
    }
}


function guardarPublicacion() { //Función para guardar publicaión
    const llave = "a8d6381e4d2a45ac047ad919c1de17a2"; //Llave proporcionada por imgBB
    const imagen = document.getElementById('imagen');
    const file = imagen.files[0];

    const formData = new FormData();
    formData.append('key', llave);
    formData.append('image', file);

    const apiUrl = 'https://api.imgbb.com/1/upload'; //Enlace de la api img para subir iiamgenes al servidor


    fetch(apiUrl, {
        method: 'POST', //Sube la imagen a imgBB mediante método post
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const img_pub = data.data.url; //toma el valor de la url subiida anteriormente a imgBB

        const titulo = document.getElementById("titulo_pub").value;
        const nombre = document.getElementById("nombre").value;
        const nombre_cientifico = document.getElementById("n_cientifico").value;
        const lugar = document.getElementById("lugar").value;
        const categoria = document.getElementById("categoria").value;
        const sub_cat = document.getElementById("subcategoria").value;
        const descripcion = document.getElementById("descrip_cientifica").value;
        console.log("Datos a enviar al servidor:", { img_pub, titulo, nombre, nombre_cientifico, lugar, categoria, sub_cat, descripcion });

        if(titulo === "" || nombre === "" || nombre_cientifico === "" || lugar === "Seleccione un lugar" || categoria === "Seleccione categoría" || sub_cat === "Seleccione subcategoría" || descripcion === ""){
            Swal.fire({
                title: "Debe completar todos los campos para proceder con el registro.", //En caso de que no estèn completos todos los campos, muestra el mensaje
                confirmButtonText: "OK",
                confirmButtonColor: "#276B58",
            });
        }
        else{
            if (categoria === "flora") {
                fetch(baseUrl + '/flora/' + nombre)
                    .then(res => res.json())
                    .then(json => {
                        flora = json;
                        if (flora) {
                            Swal.fire({
                                title: "La flora que intenta publicar ya ha sido registrada.", //En caso de que la flora exista
                                confirmButtonText: "OK",
                                confirmButtonColor: "#276B58",
                            });
                        }
                    })
                .catch(error => {
                    AgregarFlora(nombre, nombre_cientifico, sub_cat, descripcion, img_pub, lugar, titulo,)
                });
            
            }
            else{
                fetch(baseUrl + '/fauna/' + nombre)
                    .then(res => res.json())
                    .then(json => {
                        flora = json;
                        console.log("Respuesta de la API de fauna:", fauna);
                        if (fauna) {
                            Swal.fire({
                                title: "La fauna que intenta publicar ya ha sido registrada.",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#276B58",
                            });
                        }
                    })
                .catch(error => {
                    console.log("datos a agregar", nombre, lugar, titulo, nombre_cientifico, descripcion, sub_cat, img_pub)
                    AgregarFauna(nombre, nombre_cientifico, sub_cat, descripcion, img_pub, lugar, titulo,)
                });
            }
        }
    }).catch(error =>{
        Swal.fire({
            title: "Para proceder con el registro debe subir una foto y llenar todos los campos.",
            confirmButtonText: "OK",
            confirmButtonColor: "#276B58",
        });
    });
    
}


function AgregarFlora(nombre, nombre_cientifico, sub_cat, descripcion, img_pub, lugar, titulo,){
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
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error('Error en solicitud POST');
                        }
                        console.log("Insercion de publicacion flora completada");
                        var crearPub = document.getElementById('publicar');
                        crearPub.style.display = 'none';
                        BuscarPublicacionFlora(data_pub_flora.id_flora)
                    })
            }).catch(error => {
                Swal.fire({
                    title: "La flora que intenta publicar ya ha sido registrada.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#276B58",
                });
            });
        }
    })
}

function BuscarPublicacionFlora(id_flora) {
    console.log("id ", id_flora)

    fetch(baseUrl + '/publicacion_flora/' + id_flora).then(res => { 
        res.json().then(json => {
            pub_estudiante = json;
            const id_pubFlora = pub_estudiante.id_publicacion;
            console.log(id_pubFlora)
            let id_usuario = localStorage.getItem('id_usuario');

            const data_pub_estudiante = {
                id_publicacion: id_pubFlora,
                id_estudiante: id_usuario,
            };
            console.log(data_pub_estudiante);
            console.log("Entrando a insertar estudiante");
                fetch(baseUrl + "/publicacion_estudiante", {
                    method: "POST",
                    body: JSON.stringify(data_pub_estudiante),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                }).then(res => {
                    location.reload()
                    ObtenerPublicaciones();
                }).catch(error => {
                    console.log("Error en la solicitud unu", error);
            });
        });
    });
}

//   Procedimientos para registrar Fauna     //

function AgregarFauna(nombre, nombre_cientifico, sub_cat, descripcion, img_pub, lugar, titulo,){
    const data_fauna = {
        nombre_animal: nombre,
        nombre_cientifico_fauna: nombre_cientifico,
        categoria_fauna: sub_cat,
        descripcion_cientifica_fauna: descripcion,
        foto_fauna: img_pub,
    };
    console.log(data_fauna)
    
    fetch(baseUrl + "/fauna", {
        method: "POST",
        body: JSON.stringify(data_fauna),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    })
    .then(res => {
        console.log("datos a insertar", data_fauna);
        if (res.ok) {
            fetch(baseUrl + '/fauna/' + data_fauna.nombre_animal)
                .then(res => res.json())
                .then(buscar_Fauna => {
                    const id_fauna = buscar_Fauna.id_fauna;
                    const data_pub_fauna = {
                        titulo: titulo,
                        lugar: lugar,
                        id_fauna: id_fauna,
                    };
                    console.log(data_pub_fauna);
                    fetch(baseUrl + "/publicacion/fauna", {
                        method: "POST",
                        body: JSON.stringify(data_pub_fauna),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                    }).then(res => {
                        if (!res.ok) {
                            throw new Error('Error en solicitud POST');
                        }
                        console.log("Insercion de publicacion fauna completada");
                        var crearPub = document.getElementById('publicar');
                        crearPub.style.display = 'none';
                        BuscarPublicacionFauna(data_pub_fauna.id_fauna)
                    })
            }).catch(error => {
                Swal.fire({
                    title: "La fauna que intenta publicar ya ha sido registrada.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#276B58",
                });
            });
        }
    })
}

function BuscarPublicacionFauna(id_fauna) {
    console.log("id ", id_fauna)

    fetch(baseUrl + '/publicacion_fauna/' + id_fauna).then(res => {
        res.json().then(json => {
            pub_estudiante = json;
            const id_pubFauna = pub_estudiante.id_publicacion;
            console.log(id_pubFauna)
            let id_usuario = localStorage.getItem('id_usuario');

            const data_pub_estudiante = {
                id_publicacion: id_pubFauna,
                id_estudiante: id_usuario,
            };
            console.log(data_pub_estudiante);
            console.log("Entrando a insertar estudiante");
                fetch(baseUrl + "/publicacion_estudiante", {
                    method: "POST",
                    body: JSON.stringify(data_pub_estudiante),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                }).then(res => {
                    location.reload()
                    ObtenerPublicaciones();
                }).catch(error => {
                    console.log("Error en la solicitud unu", error);
            });
        });
    });
}

//Actualiza el titulo de la publicacion segun el usuario que la ha publicado
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
    let url = "Publicacion.html?id=" + id; //Este id de parámetro nos sirve posteriormnete para mapear la publicación completa con ese id

    // Redirige a la página de destino
    window.location.href = url;
}