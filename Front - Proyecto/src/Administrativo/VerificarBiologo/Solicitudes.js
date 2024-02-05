let biologosEnEspera = []

function ObtenerBiologos() {
    fetch(baseUrl + "/biologo/all").then(res => {
        res.json().then(json => {
            biologosEnEspera = json.filter(biologo => biologo.estado === "En Espera");

            console.log(biologosEnEspera);
            ImprimirBiologos(biologosEnEspera);
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
    <td>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button class="mt-2" onclick="showDetails('00001')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Ver.png?raw=true">
            </button>
            <div class="absolute bg-white border rounded -ml-[6px]" x-show="open" @click.away="open = false">                  
                <span class="block w-9 px-2 py-1 text-xs font-semibold">Ver</span>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="00001-A" onclick="toggleEstado('00001-A', 'A')" data-fila-id="00001">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/Shi.png?raw=true">
            </button>
            <div class="absolute bg-white border rounded -ml-4" x-show="open" @click.away="open = false">
                <span class="block w-15 px-2 py-1 text-xs font-semibold">Aprobar</span>
            </div>
        </div>
        <div class="relative inline-block" x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
            <button id="00001-R" onclick="toggleEstado('00001-R', 'R')" data-fila-id="00001">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/%C3%91o.png?raw=true">
            </button>
            <div class="absolute bg-white border rounded -ml-6" x-show="open" @click.away="open = false">
                <span class="block w-[4rem] px-2 py-1 text-xs font-semibold">Rechazar</span>
            </div>
        </div>
    </td>
</tr>`
}