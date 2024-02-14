/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let fauna = [];
let flora = [];
let publicaciones = [];

function ObtenerPublicaciones() {
    fetch(baseUrl + '/vista/all')
    .then(res => res.json())
    .then(json => {
        publicaciones = json;
        ImprimirPublicaciones(publicaciones);

    })
    .catch(error => {
        console.error("Error al obtener las publicaciones:", error);
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



function menuCategoria(categoria){ /* Mapea las publicaciones dependiendo de la categoria seleccionada en el menú de inicio*/
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
                contenedor.innerHTML += MapearPublicacionesFlora(publicacion);
            }
            
            if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
                contenedor.innerHTML += MapearPublicacionesFauna(publicacion);
            }

            if (index === publicaciones.length - 1) {
                contenedor.innerHTML += Subir();
            }
    });
}
function Subir(){ //Mapea un boton de subir al final de las publicaciones
    return `<div id="subir" class="mt-10 flex justify-center">
                  <div class="mt-10 flex justify-center">
                  <a href="javascript:void(0);" onclick="regresarInicioS('pub')" class="bg-[#276B58] active:bg-[#50a48c] hover:bg-[#5e9f9f] w-full h-7 text-center absolute text-white bottom-0">
                      Ir arriba
                  </a>
                  </div>
              </div>`
}


function MapearPublicacionesFlora(publicacion) {
  return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
    <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
        <div class="mt-2">
            <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
            <span class="textito text-gray-400 ml-2 md:ml-4 lg:ml-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
            <span class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
            <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 mt-2 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[13px]">${publicacion.titulo}</p>
        </div>
        <div class="flex justify-center mt-5 mb-5">
            <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
        </div>
    </a>
    <div class="flex justify-around items-center mb-2">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_flora}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
    </div>
    </div>`;
}


  function MapearPublicacionesFauna(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
    <a class="cursor-pointer" onclick="MostrarPub(${publicacion.id_publicacion})">
        <div class="mt-2">
            <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
            <span class="textito text-gray-400 ml-2 md:ml-4 lg:ml-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
            <span class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
            <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 mt-2 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[13px]">${publicacion.titulo}</p>
        </div>
        <div class="flex justify-center mt-5 mb-5">
            <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
        </div>
    </a>
    <div class="flex justify-around items-center mb-2">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_fauna}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
    </div>
  </div>`;
  }

//Redirige a la publicacion seleccionada 
  function MostrarPub(id) {
    // Construye la URL con el parámetro
    let url = "Publicacion.html?id=" + id;

    // Redirige a la página de destino
    window.location.href = url;
}

//Regresa al principio de las publicaciones con un scroll suave
function regresarInicioS(sectionId) {
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