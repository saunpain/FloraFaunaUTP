/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let categoria = "";
function ObtenerPublicaciones() {//Función para obtener las publicaciones con toda su info
    fetch(baseUrl + '/vista/all').then(res => {
      res.json().then(json => {
        publicaciones = json;
        ImprimirPublicaciones(publicaciones);
      });
    });
  }


function ObtenerFlora(){//Función para obtener la Flora con toda su info
  fetch(baseUrl + "/vista_flora").then( res => {
      res.json().then(json => {
          publicaciones = json;
          ImprimirPublicaciones(publicaciones);
      })
  })
}
function ObtenerFauna(){//Función para obtener la Fauna con toda su info
  fetch(baseUrl + "/vista_fauna").then( res => {
      res.json().then(json => {
          publicaciones = json;
          ImprimirPublicaciones(publicaciones);
      })
  })
}
function ObtenerFloraCategoria(categoria){//Obtener la flora por categoría
  fetch(baseUrl + "/vista_flora/" + categoria).then( res => {
      res.json().then(json => {
          publicaciones = json;
          ImprimirPublicaciones(publicaciones);
      })
  })
}
function ObtenerFaunaCategoria(categoria){//Obtener la fauna por categoría
  fetch(baseUrl + "/vista_fauna/" + categoria).then( res => {
      res.json().then(json => {
          publicaciones = json;
          ImprimirPublicaciones(publicaciones);
      })
  })
}

function menuCategoria(categoria){//Función para saber que categoría se va a mapear de las que están en el aside
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

function ImprimirPublicaciones(publicaciones) {//Función para mapear publicaciones según el estado del biologo
  const estado = localStorage.getItem('estado_biologo');
  let contenedor = document.getElementById("pub");
  contenedor.innerHTML = "";

  publicaciones.forEach((publicacion, index) => {
    if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
      if(estado === "Aprobado"){//Si el estado del biólogo es "Aprobado" se mapean las publicaciones con opciones para editar
        contenedor.innerHTML += MapearPublicacionesFlora(publicacion);
      }else{//Sino está Aprobado mapea las publicaciones sin opciones para editar
        contenedor.innerHTML += MapearPublicacionesSinFlora(publicacion);
      }
    }
    if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
      if(estado === "Aprobado"){
        contenedor.innerHTML += MapearPublicacionesFauna(publicacion);
      }else{
        contenedor.innerHTML += MapearPublicacionesSinFauna(publicacion);
      }

    }

    if (index === publicaciones.length - 1) {//Mapea la opción para subir hasta la primera publicación
      contenedor.innerHTML += Subir();
    }
  });
}

function MapearPublicacionesFauna(publicacion) {
  return `<div id="${publicacion.id_publicacion}" class="bg-white md:p-4 p-6 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
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
                <button onclick="MostrarPub('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                  <div class="flex bg-white px-2 py-1 text-sm border border-black border-t-0 text-left hover:bg-gray-200">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Chat_search_light.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                    <p>Editar Descripción</p>
                </div>
              </button>
            </div>
        </div>
    </div>
</div>`;
}

function MapearPublicacionesSinFauna(publicacion) {
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
  <div class="flex justify-around items-center">
      <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico: ${publicacion.nombre_cientifico_fauna}</span>
      <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
  </div>
</div>`;
}

function MapearPublicacionesFlora(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white md:p-4 p-6 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
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
                <button onclick="MostrarPub('${publicacion.id_publicacion}')" class="opciones invisible block w-[13rem]">
                  <div class="flex bg-white px-2 py-1 text-sm border border-black border-t-0 text-left hover:bg-gray-200">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Chat_search_light.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                    <p>Editar Descripción</p>
                </div>
              </button>
            </div>
        </div>
    </div>
  </div>`;
  }

  function MapearPublicacionesSinFlora(publicacion) {
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
    <div class="flex justify-around items-center">
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:${publicacion.nombre_cientifico_flora}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
    </div>
  </div>`;
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

function Subir(){
  return `<div class="mt-10 flex justify-center">
            <div class="mt-10 flex justify-center">
            <a href="javascript:void(0);" onclick="subirBoton('pub')" class="bg-[#276B58] active:bg-[#50a48c] hover:bg-[#5e9f9f] w-full h-7 text-center text-white absolute bottom-0">
              Ir arriba
            </a>
            </div>
          </div>`    
}

function MostrarPub(id) {//Función que muestra la publicación clickeada según su id
  //Construye la URL con el parámetro
  let url = "Publicacion.html?id=" + id;

  //Redirige a la página de destino
  window.location.href = url;
}
  
//Función para desplazar la vista de la página hacia arriba
function subirBoton(sectionId) {
  var section = document.getElementById(sectionId);
  
  if (section) {
    //Utilizar el método scrollIntoView para desplazar la vista hacia la sección con un efecto suave
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function CerrarSesion(){
  console.log("cerrando sesion");
  
  //Remover los elementos relacionados con la sesión del usuario en el almacenamiento local
  localStorage.removeItem('id_usuario');
  localStorage.removeItem("estado_biologo");
  localStorage.removeItem("nombreusuario");
}

//Función para filtrar las publicaciones según el término de búsqueda ingresado
function FiltrarPublicaciones() {
  //Obtener el valor de la entrada de búsqueda y eliminar espacios en blanco al principio y al final
  let busqueda = document.getElementById("busqueda-input").value.trim()

  if(busqueda == "") {
      // Si la búsqueda está vacía, imprimir todas las publicaciones sin filtrar
      ImprimirPublicaciones(pub);
  } else {
      // Si hay un término de búsqueda, realizar una solicitud fetch al servidor para obtener las publicaciones filtradas
      fetch(baseUrl + "/vista/filtrarGlob?busqueda=" + busqueda).then(res => {
          res.json().then(json =>{
              // Almacenar las publicaciones filtradas en la variable pubFiltro
              pubFiltro = json;
              console.log(busqueda);
              console.log(pubFiltro);
              
              // Imprimir las publicaciones filtradas
              ImprimirPublicaciones(pubFiltro);
          })
      }).catch(error => {
          console.error("Error en la solicitud:", error);
      });
  }
}
