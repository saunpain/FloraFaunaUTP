/*************FUNCIONES PARA MAPEAR PUBLICACIONES ********************/

let baseUrl = "http://localhost:8080";
let fauna = [];
let flora = [];
let publicaciones = [];

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

/*
function GuardarSolicitud() {
  let data = {
    nombre: document.getElementById("nombre").value,
    precio: document.getElementById("precio").value,
    categoriaId: document.getElementById("categoriaId").value,
    foto: document.getElementById("foto").value,
    fechaProduccion: document.getElementById("fechaProduccion").value,
    fechaCaducidad: document.getElementById("fechaCaducidad").value
  };

  fetch(baseUrl + "/producto", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": 'application/json; charset=UTF-8'
    }
  }).then(res => {
    ObtenerProductos();
  });
}

*/

/*
function ObtenerPublicacionesFauna() {
  // Array para almacenar las promesas de fetch
  const promesasFetch = [];

  // Primer fetch para obtener datos de fauna
  const fetchFauna = fetch(baseUrl + '/fauna/all').then(res => {
    if (!res.ok) {
      throw new Error('Error al obtener datos de fauna');
    }
    return res.json();
  });

  // Segundo fetch para obtener datos de publicaciones
  const fetchPublicaciones = fetch(baseUrl + '/publicaciones/all').then(res => {
    if (!res.ok) {
      throw new Error('Error al obtener datos de publicaciones');
    }
    return res.json();
  });

    // Tercer fetch para obtener datos de estudiantes
    const fetchEstudiante = fetch(baseUrl + '/estudiante/all').then(res => {
      if (!res.ok) {
        throw new Error('Error al obtener datos de estudiante');
      }
      return res.json();
    });

  // Agregar las promesas al array
  promesasFetch.push(fetchFauna, fetchPublicaciones, fetchEstudiante);

  // Ejecutar Promise.all cuando ambas promesas estén resueltas
  Promise.all(promesasFetch)
    .then(resultados => {
      // resultados[0] contendrá los datos de fauna
      // resultados[1] contendrá los datos de publicaciones
      // resultados[2] contendrá los datos de estudiante
      const fauna = resultados[0];
      const publicaciones = resultados[1];
      const estudiante = resultados[2];

      // Aquí puedes combinar ambos conjuntos de datos o realizar otras acciones según tus necesidades
      const datosCombinados = { fauna, publicaciones, estudiante };

      // Llamar a tu método ImprimirPublicacionesFauna con los datos combinados
      ImprimirPublicacionesFauna(datosCombinados);
    })
    .catch(error => {
      console.error(error);
    });
} */