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
            ObtenerComentarios();
            ImprimirCrearComentario();
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
            contenedor.innerHTML += MapearPublicacionFlora(publicacion);
        }
    
        if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
            contenedor.innerHTML += MapearPublicacionFauna(publicacion);
        }

}
//funcion para mapear un boton de regresar al inicio
function MapRegresar(){
    return `<a href="Flora y Fauna UTP - inicio.html">
                <button class="flex p-2 rounded-md ml-4 sm:ml-16 mt-2 md:mt-0 hover:bg-[#D7EFFF]">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Regresar.png?raw=true" class="mr-1">
                    Volver a Inicio
                </button>
            </a>`
}


function ImprimirComentarios(comentarios) {
    const contenedor = document.getElementById("comentarios");
    contenedor.innerHTML = '';
    
    comentarios.forEach(comentario => {
        contenedor.innerHTML +=  MapearComentarios(comentario);
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
                <div class="flex justify-around">
                    <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:  ${publicacion.nombre_cientifico_flora}</span>
                    <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
                </div>
                <hr class="mt-2  ml-10 mr-10">
                <div class="mt-2 mb-2">
                    <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
                    <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_flora}</p>
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
    <div class="flex justify-around">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:  ${publicacion.nombre_cientifico_fauna}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
    </div>
    <hr class="mt-2  ml-10 mr-10">
    <div class="mt-2 mb-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">Descripción científica</span>
        <p class="textito text-justify text-[#241111] md:ml-10 lg:ml-0 ml-6 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[13px] mt-2"> ${publicacion.descripcion_cientifica_fauna}</p>
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

function MapAgregarComentario() {
    return `<div class="mt-2 mb-2 w-full">
        <hr class="mt-2 ml-10 mr-10 mb-4">
        <textarea id="text-coment" class="w-full h-28 shadow-md p-2 border rounded mb-4 focus:outline-none" placeholder="Escribe tu comentario..."></textarea>
        <button onclick="AgregarComentario()" class="bg-[#276B58] text-white py-2 px-4 rounded hover:bg-[#2e5c5c] focus:outline-none focus:shadow-outline-blue active:bg-[#4b927e]">
            Publicar comentario
        </button>
    </div>`;
}

//Ya que cuando no se ha iniciado sesion no se puede comentar esta funcion tiene como papel que al tratar de comentar se muestre el cuadro de registro
function AgregarComentario() {
    mostrarInicioS(event);
}

