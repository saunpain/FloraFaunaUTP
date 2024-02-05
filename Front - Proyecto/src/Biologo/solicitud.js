function mostrarSolicitud() {
    const user = usuario_name;
    fetch(baseUrl + "/biologo/" + user).then((res) => {
        res.json().then((json) => {
        usuario = json;

        let fotoPerfil = usuario.perfil_biologo;
        perfil = fotoPerfil;
        ImprimirSolicitud(usuario);
        });
    });
}

function ImprimirSolicitud(usuario) {
    document.body.style.overflow = "hidden";

    var overlay = document.getElementById("verificacion");
    var perfilContainer = document.getElementById("contenedor-verificacion");
    let perfilContent = document.getElementById("verificacion-contenido");
    overlay.style.display = "block";
    perfilContainer.style.display = "flex";
    perfilContent.innerHTML = MapearSolicitud(usuario);
}

function MapearSolicitud(usuario) {
    return `<div class="w-80 h-[28rem] text-lg relative">
    <div class="ml-6 mr-6">
        <button onclick="cerrarVerificacion()" class="px-4 py-2 absolute -top-8 -right-10">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Close_profile.png?raw=true" alt="">
        </button>
        <h2 class="text-2xl text-center">Solicitud de Verificación</h2>
    <form enctype="multipart/form-data">
        <div class="flex mt-5 items-center justify-around">
            <img src="${usuario.perfil_biologo}" alt="foto de perfil" class="rounded-full w-16 h-16">
            <p>${usuario.nombre_biologo}</p>
        </div>
        
        <p class="mt-6">Correo</p>
        <p class="mt-2 underline">${usuario.correo_biologo}</p>
       
    
        <p class="mt-2">Ingrese el título</p>
        <div class="flex mt-2 items-center">
            <input id="tituloInput" name="titulo" required class="w-full mr-2 h-6 password-display inline-block border rounded border-gray-400 p-4">
            
        </div>

        <p class="mt-2">Adjunte su archivo pdf</p>
        <input id="archivoInput" name="file" class="w-80 mt-4 block" type="file" accept=".pdf">
        <button id="botonSubir" onclick="subirArchivo()" class="mt-6 py-1 px-2 bg-white border rounded border-gray-400 hover:bg-gray-200">Subir Archivo</button>
    </div>
    </form>
    
</div> `;
}

/***************FUNCIONES PARA LA SOLICITUD DE VERIFICACION*******************************/ 

function mostrarVerificacion() {
    const user = usuario_name;
    fetch(baseUrl + "/biologo/" + user).then((res) => {
        res.json().then((json) => {
        usuario = json;

        let fotoPerfil = usuario.perfil_biologo;
        perfil = fotoPerfil;
        ImprimirSolicitud(usuario);
        });
    });
  }
  
  // Función para cerrar el cuadro de perfil y quitar la capa oscura
  function cerrarVerificacion() {
    document.body.style.overflow = 'auto';
  
    var overlay = document.getElementById('verificacion');
    var verificacionContainer = document.getElementById('contenedor-verificacion');
  
    overlay.style.display = 'none'; // Ocultar la capa oscura
    verificacionContainer.style.display = 'none'; // Ocultar el cuadro de perfil
  }
  
  // Asignar evento al clic en la imagen de perfil
  document.getElementById('mostrarVerificacion').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar que la página se recargue
  
    mostrarVerificacion();
  });
  
  /************FUNCIONES PARA LA SUBIDA DE SOLICITUD *******************/
  
  async function subirArchivo() {
    const tituloInput = document.getElementById('tituloInput');
    const archivoInput = document.getElementById('archivoInput');
    const botonSubir = document.getElementById('botonSubir');
  
    botonSubir.disabled = true;
  
    const formData = new FormData();
    formData.append('file', archivoInput.files[0]);
    formData.append('titulo', tituloInput.value);
  
    const backendURL = 'http://localhost:8080/upload';
  
    try {
      const response = await fetch(backendURL, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const message = await response.text();
      console.log(message);
      alert("La solicitud fue enviada.");
    } catch (error) {
      console.error('Error:', error);
      alert("Error, no se pudo enviar la solicitud.");
    } finally {
      botonSubir.disabled = false;
    }
  }
  
/*
  function guardarArchivo() {
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
        const img_pub = data.data.url;

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
                title: "Debe completar todos los campos para proceder con el registro.",
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
                        console.log("Respuesta de la API de flora:", flora);
                        if (flora) {
                            Swal.fire({
                                title: "La flora que intenta publicar ya ha sido registrada.",
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
*/