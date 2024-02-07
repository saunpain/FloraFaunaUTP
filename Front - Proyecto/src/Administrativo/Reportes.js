// ------------- Usuarios Registrados ------------- //
fetch(baseUrl + "/cantidadEstudiante")
.then(response => response.json()) 
    .then(estudiantes => {
        let cantEstudiante = estudiantes;
        fetch(baseUrl + "/cantidadBiologo")
        .then(response => response.json()) 
            .then(biologo => {
                let cantBiologo = biologo;

                fetch(baseUrl + "/cantidadAdmin")
                .then(response => response.json()) 
                    .then(admin => {
                        let cantAdmin =  admin;
                        document.getElementById('usuarios_registrados').innerText = cantEstudiante + cantBiologo + cantAdmin;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
            
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadBiologosV")
.then(response => response.json()) 
    .then(biologos_v => {
        let bio =  biologos_v;
        document.getElementById('biologos_verificados').innerText = bio;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadPub")
.then(response => response.json()) 
    .then(pub => {
        let cant_pub =  pub;
        document.getElementById('cantidad_publicaciones').innerText = cant_pub;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadComentarios")
.then(response => response.json()) 
    .then(comentarios => {
        let cant_coment =  comentarios;
        document.getElementById('cantidad_comentarios').innerText = cant_coment;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadFlora")
.then(response => response.json()) 
    .then(flora => {
        let cant_flora =  flora;
        document.getElementById('cantidad_flora').innerText = cant_flora;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadFauna")
    .then(response => response.json())
    .then(fauna => {
        let cant_fauna =  fauna;
        document.getElementById('cantidad_fauna').innerText = cant_fauna;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadArboles")
    .then(response => response.json())
    .then(arbol => {
        let cant_arbol =  arbol;
        document.getElementById('cantidad_arboles').innerText = cant_arbol;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadHierbas")
    .then(response => response.json())
    .then(hierba => {
        let cant_hierbas =  hierba;
        document.getElementById('cantidad_hierbas').innerText = cant_hierbas;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadPlantas")
    .then(response => response.json())
    .then(planta => {
        let cant_plantas =  planta;
        document.getElementById('cantidad_plantas').innerText = cant_plantas;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadAves")
    .then(response => response.json())
    .then(aves => {
        let cant_aves =  aves;
        document.getElementById('cantidad_aves').innerText = cant_aves;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadArtropodos")
    .then(response => response.json())
    .then(artropodos => {
        let cant_artropodos =  artropodos;
        document.getElementById('cantidad_artropodos').innerText = cant_artropodos;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadReptiles")
    .then(response => response.json())
    .then(reptiles => {
        let cant_reptiles =  reptiles;
        document.getElementById('cantidad_reptiles').innerText = cant_reptiles;
    })
    .catch(error => {
        console.error(error);
    });

fetch(baseUrl + "/cantidadMamiferos")
    .then(response => response.json())
    .then(mamiferos => {
        let cant_mamiferos =  mamiferos;
        document.getElementById('cantidad_mamiferos').innerText = cant_mamiferos;
    })
    .catch(error => {
        console.error(error);
    });


    //Función para activar y desactivar aside en celulares
    document.addEventListener('DOMContentLoaded', function () {
        var toggleButton = document.getElementById('toggleButton');
        var miAside = document.getElementById('aside');
      
        toggleButton.addEventListener('click', function () {
            miAside.classList.toggle('hidden');
      
            // Cambia las clases del botón
            toggleButton.classList.toggle('opened');
            toggleButton.classList.toggle('closed');
        });
      });
      