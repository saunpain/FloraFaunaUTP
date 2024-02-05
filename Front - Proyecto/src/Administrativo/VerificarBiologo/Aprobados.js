let biologosAprobados = []

function ObtenerBiologos() {
    fetch(baseUrl + "/biologo/all").then(res => {
        res.json().then(json => {
            biologosAprobados = json.filter(biologo => biologo.estado === "Aprobado");

            console.log(biologosAprobados);
            ImprimirBiologos(biologosAprobados);
        });
    });
}

function ImprimirBiologos(biologos){
    let contenedor = document.getElementById("cuerpo-tabla")
    contenedor.innerHTML = ""

    biologos.forEach(b => {
        contenedor.innerHTML += MapearBiologos(b)
    })
}

function MapearBiologos(b){
    return `<tr id="${b.id_biologo}" class="solicitud-row border-y-2 hover:bg-[#7EBBAA] bg-[#FFFFFF]">
    <td class="p-4">${b.nombre_biologo}</td>
    <td> Solicitud para ser biologo verificado uwu</td>
</tr>`
}