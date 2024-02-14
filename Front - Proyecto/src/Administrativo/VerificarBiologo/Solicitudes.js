let biologosEnEspera = []

function ObtenerBiologos() {
    fetch(baseUrl + "/biologo/all")
        .then(res => res.json())
        .then(json => {
            const biologosEnEspera = json.filter(biologo => biologo.estado == "En espera");

            if (biologosEnEspera.length > 0) {
                fetch(baseUrl + "/solicitud/all")
                    .then(res => res.json())
                    .then(solicitud => {
                        ImprimirBiologos(biologosEnEspera, solicitud);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                let contenedor = document.getElementById("cuerpo-tabla");
                contenedor.innerHTML = "<h2 class='font-semibold'>Sin solicitudes.</h2>";
            }
        })
        .catch(error => {
            console.error(error);
        });
}


function ImprimirBiologos(biologos, solicitudes) {
    let contenedor = document.getElementById("cuerpo-tabla");
    contenedor.innerHTML = "";

    biologos.forEach((biologo) => {
        const solicitud = solicitudes.find(s => s.id_biologo === biologo.id_biologo);

        if (solicitud) {
            contenedor.innerHTML += MapearBiologos(biologo, solicitud);
        }
    });
}



function verSolicitud(id){
    
    console.log(id)
    fetch(baseUrl + "/solicitud_biologo/" + id)
        .then(res => res.json())
        .then(s => {
            console.log(s);
            let solicitud = s;

            fetch(baseUrl + "/biologo_id/" + id)
                    .then(res => res.json())
                    .then(biologo => {
                        console.log(biologo)
                        ImprimirSolicitud(solicitud, biologo);
                    })
                    .catch(error => {
                        console.error(error);
                    });
        })
        .catch(error => {
            console.error(error);
        });
    
}

function ImprimirSolicitud(solicitud, biologo) {
    let cont = document.getElementById("solicitud");
    document.getElementById("tabla-solicitudes").style.display = "none";

    cont.style.display = "block";
    cont.innerHTML = MapearSolicitudBiologo(solicitud, biologo);
    
}


function Deshacer() {

    document.getElementById("tabla-solicitudes").style.display = "flex";
    let cont = document.getElementById("solicitud");
    cont.style.display = "none";
}

function MapearBiologos(b, s) {
    return `<tr id="${b.id_biologo}" class="border-y-2 hover:bg-[#7EBBAA] bg-[#FFFFFF] flex justify-between px-4 items-center">
        <td class="">${b.nombre_biologo}</td>
        <td class="text-gray-700 max-w-64 truncate hidden md:block">${s.titulo}</td>
        <td class="">
            <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                <button class="mt-2" onclick="verSolicitud('${b.id_biologo}')">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Ver.png?raw=true">
                </button>
                <div class="absolute bg-white border rounded -ml-[6px]" x-show="open" @click.away="open = false">
                    <span class="block w-9 px-2 py-1 text-xs font-semibold">Ver</span>
                </div>
            </div>
            <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                <button id="${b.id_biologo}-A" onmouseover="BioEstado('${b.id_biologo}-A', 'A')" onmouseout="BioEstado('${b.id_biologo}-A', 'A')" data-fila-id="${b.id_biologo}" onclick="confirmAprobarBiologo(${b.id_biologo})">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true">
                </button>
                <div class="absolute bg-white border rounded -ml-4" x-show="open" @click.away="open = false">
                    <span class="block w-15 px-2 py-1 text-xs font-semibold">Aprobar</span>
                </div>
            </div>
            <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
                <button id="${b.id_biologo}-R" onmouseover="BioEstado('${b.id_biologo}-R', 'R')" onmouseout="BioEstado('${b.id_biologo}-R', 'R')" data-fila-id="${b.id_biologo}" onclick="confirmRechazarBiologo(${b.id_biologo})">
                    <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true">
                </button>
                <div class="absolute bg-white border rounded -ml-6" x-show="open" @click.away="open = false">
                    <span class="block w-[4rem] px-2 py-1 text-xs font-semibold">Rechazar</span>
                </div>
            </div>
        </td>
    </tr>`;
}

function confirmAprobarBiologo(idBiologo) {
    Swal.fire({
        title: '¿Está seguro de verificar a este biólogo?',
        text: 'Una vez aprobado el biólogo podrá hacer modificaciones en los registros de flora y fauna.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aprobar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#276B58",
    }).then((result) => {
        if (result.isConfirmed) {
            AprobarBiologo(idBiologo);
            location.reload()
        }
    });
}

function confirmRechazarBiologo(idBiologo) {
    Swal.fire({
        title: '¿Está seguro de rechazar a este biólogo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Rechazar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: "#276B58",
    }).then((result) => {
        if (result.isConfirmed) {
            RechazarBiologo(idBiologo);
            location.reload()
        }
    });
}



function RechazarBiologo(id){
    fetch(baseUrl + "/administrativo/cambiarEstado/" + id + "/" + 0, {method: "Put"}).then(res =>{
        console.log(res)
        ObtenerBiologos()
    })
}

function AprobarBiologo(id) {
    fetch(baseUrl + "/administrativo/cambiarEstado/" + id + "/" + 1, {method: "Put"}).then(res =>{
        console.log(res)
        ObtenerBiologos()
    })
}


function MapearSolicitudBiologo(s, b){
    return `<div class="w-[80%] lg:w-[90%] bg-[#FFFFFF] rounded-lg mx-auto my-auto mb-10">
    <div class="flex p-4 ml-3">
        <button class="flex bg-[#D7EFFF] p-2 rounded-md" onclick="Deshacer()">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Regresar.png?raw=true" class="mr-1">
            Regresar
        </button>
        <button id="solicitud-${s.id_biologo}-A" class="flex bg-[#D7EFFF] ml-3 p-2 rounded-md" onmouseover="BioEstado('${b.id_biologo}-A', 'A')" onmouseout="BioEstado('${b.id_biologo}-A', 'A')" data-fila-id="${b.id_biologo}"  onclick="confirmAprobarBiologo(${b.id_biologo})">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true" class="mr-1">
            Aprobar
        </button>
        <button id="solicitud-${s.id_biologo}-R" class="flex bg-[#D7EFFF] ml-3 p-2 rounded-md" onmouseover="BioEstado('${b.id_biologo}-R', 'R')" onmouseout="BioEstado('${b.id_biologo}-R', 'R')" data-fila-id="${b.id_biologo}"  onclick="confirmRechazarBiologo(${b.id_biologo})">
            <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true" class="mr-1">
            Rechazar
        </button>
    </div>
    <div class="flex justify-center">
        <hr class="w-11/12">
    </div>
    <div class="mt-2 ml-6 mr-6 text-lg">
        <h2>Título: ${s.titulo}</h2>
    </div>
    <div class="flex mt-3 ml-6 items-center">
        <img src="${b.perfil_biologo}" class="w-16">
        <div class="ml-3">
            <p class="text-sm">${b.nombre_biologo}</p>
            <p class="text-sm">${b.correo_biologo}</p>
        </div>
    </div>
    <div class="flex justify-center">
        <hr class="w-11/12 mt-4">
    </div>
    <div class="flex mt-3 p-2 flex-col items-center">
        <p class="font-bold">Solicitud adjunta</p>
        <a href="${s.archivo}" target="_blank">Ver archivo</a>
    </div>
</div>`
}
