let biologosRechazados = []

function ObtenerBiologos() {
    fetch(baseUrl + "/biologo/all")
        .then(res => res.json())
        .then(json => {
            const biologosRechazados = json.filter(biologo => biologo.estado == "Rechazado");

            if (biologosRechazados.length > 0) {
                fetch(baseUrl + "/solicitud/all")
                    .then(res => res.json())
                    .then(solicitud => {
                        ImprimirBiologos(biologosRechazados, solicitud);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                let contenedor = document.getElementById("cuerpo-tabla");
                contenedor.innerHTML = "<h2 class='font-semibold'>Sin solicitudes rechazadas.</h2>";
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

function MapearBiologos(b, s){
    return `<tr id="${b.id_biologo}" class="solicitud-row border-y-2 hover:bg-[#7EBBAA] bg-[#FFFFFF]">
    <td class="p-4">${b.nombre_biologo}</td>
    <td>${s.titulo}</td>
</tr>`
}