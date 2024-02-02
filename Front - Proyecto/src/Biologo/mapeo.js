/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let baseUrl = "http://localhost:8080";
let fauna = [];
let flora = [];
let publicaciones = [];

let id_usuario = localStorage.getItem('id_usuario');

function ObtenerBiologo(){
    const user = usuario_name;
    fetch(baseUrl + "/biologo/" + user)
          .then(res => res.json())
          .then(data => {
              const fotoPerfil = data.perfil_biologo;
              var img = document.getElementById("imgPerfil");
              img.src = fotoPerfil;
              localStorage.setItem('id_usuario', data.id_biologo)
          })
          .catch(error => {
              console.error(error);
          });
    ObtenerPublicaciones();
    ObtenerComentarios();
    ImprimirCrearComentario();
  }

function ObtenerPublicaciones() {
    fetch(baseUrl + '/vista/all').then(res => {
      res.json().then(json => {
        publicaciones = json;
        ImprimirPublicaciones(publicaciones); 
      });
    });
  }

  function ObtenerComentarios() {
    return fetch(baseUrl + '/comentario/' + id_usuario)
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

function ImprimirCrearComentario() {
    const contenedor = document.getElementById("AgregarComent");
    contenedor.innerHTML = MapAgregarComentario();
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
  

function MapearPublicacionesFauna(publicacion) {
  return `<div id="${publicacion.id_publicacion}" class="pub bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
  <div class="mt-2">
      <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
      <span class="textito text-gray-400 ml-2 md:ml-4 lg:ml-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
      <span class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
      <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 mt-2 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[13px]">${publicacion.titulo}</p>
  </div>
  <div class="flex justify-center mt-5 mb-5">
      <img src="${publicacion.foto_fauna}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
  </div>
  <div class="flex justify-around">
      <div class="flex">
          <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="md:h-6 md:w-6 md:ml-8 xl:h-6 xl:w-6 xl:ml-8 h-5 lg:ml-0">
          <span class="textito font-bold text-[#241111]ml-2 xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">15</span>
      </div>
      <div class="flex">
          <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 md:ml-8 lg:ml-6 ml-6">
          <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
      </div>
      <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:<span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_fauna}</span></span>
      <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 w-80 mt-3 ml-2"/>
      <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>

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

      <div class="relative inline-block">
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
              <button class="opciones invisible block w-[13rem]">
                  <a class="flex bg-white px-2 py-1 text-sm border border-black border-t-0 text-left hover:bg-gray-200" href="Publicacion.html">
                      <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Chat_search_light.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                      <p>Editar Descripción</p>
                  </a>
              </button>
          </div>
      </div>
  </div>
</div>`;
}

function MapearPublicacionesFlora(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="pub bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
    <div class="mt-2">
        <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
        <span class="textito text-gray-400 ml-2 md:ml-4 lg:ml-2 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
        <span class="textito text-gray-400 float-right xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1 xl:ml-10 xl:mr-10 lg:mr-0">${publicacion.lugar}</span>
        <p class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 ml-6 mt-2 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[13px]">${publicacion.titulo}</p>
    </div>
    <div class="flex justify-center mt-5 mb-5">
        <img src="${publicacion.foto_flora}" class="xl:max-h-[370px] xl:max-w-[490px] lg:max-h-[370px] lg:max-w-[300px] md:max-h-[350px] md:max-w-[420px] max-h-[220px] max-w-[280px] md:min-h-[72] md:min-w-[72] rounded-lg">
    </div>
    <div class="flex justify-around">
        <div class="flex">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="md:h-6 md:w-6 md:ml-8 xl:h-6 xl:w-6 xl:ml-8 h-5 lg:ml-0">
            <span class="textito font-bold text-[#241111]ml-2 xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">15</span>
        </div>
        <div class="flex">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 md:ml-8 lg:ml-6 ml-6">
            <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
        </div>
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre Científico:<span id="nombreC-${publicacion.id_publicacion}">${publicacion.nombre_cientifico_flora}</span></span>
        <input id="input-${publicacion.id_publicacion}" type="text" class="hidden h-6 w-80 mt-3 ml-2"/>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Planta: ${publicacion.nombre_planta}</span>
  
        <div id="contenedorEdicion-${publicacion.id_publicacion}" class="flex hidden absolute mt-10">
            <button onclick="guardarCambios('${publicacion.id_publicacion}')" id="guardar-${publicacion.id_publicacion}" class="relative">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi_Color.png?raw=true" alt="Enviar" class="w-6 h-6">
                <span id="cambioG-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded right-3 w-[8rem] p-1 text-sm">Guardar cambios</span>
            </button>
            <button id="cancelar-${publicacion.id_publicacion}" class="relative ml-4">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o_Color.png?raw=true" alt="Cancelar" class="w-6 h-6">
                <span id="cambioC-${publicacion.id_publicacion}" class="hidden absolute bg-white border rounded p-1 text-sm">Cancelar</span>
            </button>
        </div>
  
        <div class="relative inline-block">
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
                <button class="opciones invisible block w-[13rem]">
                    <a class="flex bg-white px-2 py-1 text-sm border border-black border-t-0 text-left hover:bg-gray-200" href="Publicacion.html">
                        <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Chat_search_light.png?raw=true" alt="" class="h-4 w-4 ml-2 mr-2">
                        <p>Editar Descripción</p>
                    </a>
                </button>
            </div>
        </div>
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
                      <a href="#pub" class="bg-[#276B58] w-full h-7 text-center text-white absolute bottom-0">
                          Ir arriba
                      </a>
                  </div>
              </div>`
  }