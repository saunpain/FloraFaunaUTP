
/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let fauna = [];
let flora = [];
let publicaciones = [];

function ObtenerEstudiante(){
  const user = usuario_name;
  fetch(baseUrl + "/estudiante/" + user)
        .then(res => res.json())
        .then(data => {
            const fotoPerfil = data.perfil_estudiante;
            var img = document.getElementById("imgPerfil");
            img.src = fotoPerfil;
        })
        .catch(error => {
            console.error(error);
        });
  ObtenerPublicaciones();
  
}


function ObtenerPublicaciones() {
  fetch(baseUrl + '/vista/all').then(res => {
    res.json().then(json => {
      publicaciones = json;
      ImprimirPublicaciones(publicaciones);
    });
  });
}


function ImprimirPublicaciones(publicaciones) {
    let contenedor = document.getElementById("pub");
    contenedor.innerHTML = "";
  
    publicaciones.forEach((publicacion, index) => {
      if (publicacion.nombre_planta !== null && publicacion.nombre_planta !== "") {
        if (usuario_name === publicacion.nombre_estudiante) {
          contenedor.innerHTML += MapearPublicacionUsusarioFlora(publicacion);
        } else {
          contenedor.innerHTML += MapearPublicacionesFlora(publicacion);
        }
      }
  
      if (publicacion.nombre_animal !== null && publicacion.nombre_animal !== "") {
        if (usuario_name === publicacion.nombre_estudiante) {
          contenedor.innerHTML += MapearPublicacionUsusarioFauna(publicacion);
        } else {
          contenedor.innerHTML += MapearPublicacionesFauna(publicacion);
        }
      }
  
      if (index === publicaciones.length - 1) {
        contenedor.innerHTML += Subir();
      }
    });
  }
  

function MapearPublicacionUsusarioFlora(publicacion) {
  return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
                <div class="mt-2">
                    <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                    <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                    <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
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
                </div>
                <a href="Publicacion.html">
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
                        <a href="Publicacion.html">
                            <button class="w-6 lg:w-6 lg:h-6 flex mr-5">
                                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
                                <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
                            </button>
                        </a>
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

function MapearPublicacionesFlora(publicacion) {
  return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
  <a href="Publicacion.html">
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
      <div class="flex items-center">
          <button id="2" class="w-6 lg:w-6 lg:h-6" onclick="DarLike('2')">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="w-5 h-5 lg:w-6 lg:h-6">
          </button>
          <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px] ml-2">15</span>
      </div>
      <a href="Publicacion.html">
          <button class="w-6 lg:w-6 lg:h-6 flex mr-5">
              <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
              <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
          </button>
      </a>
      <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_flora}</span>
      <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_planta}</span>
  </div>
</div>`;
}

function MapearPublicacionUsusarioFauna(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
                  <div class="mt-2">
                      <span class="textito font-bold text-[#241111] md:ml-10 lg:ml-0 xl:ml-10 xl:mr-10 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.nombre_estudiante}</span>
                      <span class="textito text-gray-400 md:ml-6 ml-4 xl:text-sm md:text-[14px] lg:text-[12px] text-[12px]">${publicacion.fecha_estudiante}</span>
                      <span class="textito text-gray-400 float-right md:ml-10 lg:mr-0 md:mr-6 xl:ml-10 xl:mr-10 xl:text-sm lg:text-[12px] md:text-[14px] text-[12px] mt-1">${publicacion.lugar}</span>
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
                  </div>
                  <a href="Publicacion.html">
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
                          <a href="Publicacion.html">
                              <button class="w-6 lg:w-6 lg:h-6 flex mr-5">
                                  <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
                                  <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
                              </button>
                          </a>
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
  
  function MapearPublicacionesFauna(publicacion) {
    return `<div id="${publicacion.id_publicacion}" class="bg-white p-4 sm:rounded-lg border-2 border-gray-300 mt-7 w-screen sm:w-9/12 lg:w-5/6">
    <a href="Publicacion.html">
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
        <div class="flex items-center">
            <button id="2" class="w-6 lg:w-6 lg:h-6" onclick="DarLike('2')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/favorite.png?raw=true" class="w-5 h-5 lg:w-6 lg:h-6">
            </button>
            <span class="textito font-bold text-[#241111] xl:text-sm md:text-[14px] xl:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px] ml-2">15</span>
        </div>
        <a href="Publicacion.html">
            <button class="w-6 lg:w-6 lg:h-6 flex mr-5">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/chat-alt-2.png?raw=true" class="md:h-6 md:w-6 h-5 ml-2">
                <span class="textito font-bold text-[#241111] ml-2 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] md:mt-[2px] lg:mt-[4px] mt-[4px]">14</span>
            </button>
        </a>
        <span class="textito font-bold text-[#241111] md:ml-8 ml-9 xl:text-sm md:text-[14px] lg:text-[10px] text-[10px] mt-[2px]">Nombre científico: ${publicacion.nombre_cientifico_fauna}</span>
        <span class="textito font-bold text-[#241111] ml-8 lg:text-[10px] xl:text-sm md:text-[14px] text-[10px] mt-[2px] lg:mr-0 xl:mr-10 mr-10">Animal: ${publicacion.nombre_animal}</span>
    </div>
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
