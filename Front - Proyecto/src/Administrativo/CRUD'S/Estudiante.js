let estudiantes = []
let estudiantesFiltro = []
let usuario_name = localStorage.getItem("nombreusuario");
document.getElementById('nombreAdmin').textContent = usuario_name;
let foto = localStorage.getItem("perfil_Admin");
let img = document.getElementById("imgPerfil");
img.src = foto;

function ObtenerEstudiantes(){
    fetch(baseUrl + "/estudiante/all").then( res => {
        res.json().then(json => {
            estudiantes = json
            ImprimirEstudiantes(estudiantes)
        })
    })
}


function GuardarEstudiante() {
    let data = {
        nombre_estudiante: document.getElementById("input2").value,
        correo_estudiante: document.getElementById("input3").value,
    }

    console.log(data)

    fetch(baseUrl + "/estudiante", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        console.log(res)
        ObtenerEstudiantes()
    })
}


// Función para actualizar estudiantes
function ActualizarEstudiantes(id) {
    let data = {
        id_estudiante:id,
        nombre_estudiante: document.getElementById('input2').value,
        correo_estudiante: document.getElementById('input3').value,
    };

    console.log('Datos a enviar:', data); // Imprimir datos en la consola

    fetch(baseUrl + "/estudiante", {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(res => {
        console.log(res)
        ObtenerEstudiantes();
    })
}

function EliminarEstudiante(id){
    fetch(baseUrl + "/estudiante/" + id, {method: "Delete"}).then(res =>{
        console.log(res)
        ObtenerEstudiantes()
    })
}

function ImprimirEstudiantes(estudiantes){
    let contenedor = document.getElementById("cuerpo-tabla")
    contenedor.innerHTML = ""

    estudiantes.forEach(e => {
        contenedor.innerHTML += MapearEstudiantes(e)
    })
}

function MapearEstudiantes(e){
    return `<tr class="bg-white border-b-[15px] border-[#F0F9FF]" id="${e.id_estudiante}">
    <td class="py-2 xl:px-8 lg:px-4">
        <img src="${e.perfil_estudiante}" class="w-14 h-16 rounded-md justify-center mx-auto">
    </td>
    <td class="text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700">${e.id_estudiante}</td>
    <td class="text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700">${e.nombre_estudiante}</td>
    <td class="text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700">${e.correo_estudiante}</td>
    <td class="xl:px-8 lg:px-4">
        <div class="botoncitos flex items-center">
            <button onclick="hacerEditable('${e.id_estudiante}')">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/pen%201.png?raw=true" class="w-5 max-w-none">
            </button>
            <button onclick= "EliminarEstudiante('${e.id_estudiante}')" class="xl:ml-3 lg:ml-2">
                <img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/trash%201.png?raw=true" class="w-5 max-w-none">
            </button>
        </div>
    </td>
</tr>`
}



/* Función para añadir celdas a las tablas */


function añadirRegistro() {
    var tabla = document.getElementById("añadir_datos");
    var nuevaCelda = tabla.insertRow(1);
    var ultimaColumna = tabla.rows[0].cells.length - 1; // Índice de la última columna

    for (var i = 0; i < tabla.rows[0].cells.length; i++) {
        var nueva = nuevaCelda.insertCell(i);

        if (i === 0 || i === 1) {
            var registro = document.createElement('input');
            registro.setAttribute("disabled", true);
            registro.className = "text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700"; 
            nueva.appendChild(registro);

        } else if (i === ultimaColumna) {
            var btnEnviar = document.createElement('button');
            var iconEnviar = document.createElement('img');
            iconEnviar.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/a%C3%B1adir.png?raw=true';
            iconEnviar.className = "w-[25px] h-[23px] ml-[6px] mt-[4px]";

            var btnEliminar = document.createElement('button');
            var iconEliminar = document.createElement('img');
            iconEliminar.src = 'https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cancelar.png?raw=true';
            iconEliminar.className = "w-[25px] h-[23px] lg:ml-[1.5rem] ml-[2px] mt-[4px]";

            btnEnviar.appendChild(iconEnviar);
            btnEnviar.addEventListener('click', function () {
                GuardarEstudiante();
            });

            btnEliminar.appendChild(iconEliminar);
            btnEliminar.addEventListener('click', function () {
                tabla.deleteRow(nuevaCelda.rowIndex);
            });
            nueva.appendChild(btnEliminar);
            nueva.appendChild(btnEnviar);
        } else {
            
            var registro = document.createElement('input');
            registro.type = "text";
            registro.className = "text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700";
            registro.id = 'input' + i;
            nueva.appendChild(registro);
        }
    }
    nuevaCelda.cells[0].querySelector('input').focus();
}


function hacerEditable(id) {
    // Obtiene el id de la fila donde se realizarán cambios
    const fila = document.getElementById(id);

    // Crea celdas de entrada para las celdas deseadas en la fila
    const celdas = fila.getElementsByTagName('td');

    for (let i = 2; i < celdas.length - 1; i++) { // a partir de la tecrcera celda, las priemras dos no son editables
        var cell = celdas[i];
        
        const input = document.createElement('input');
        const valorOriginal = cell.textContent;
        cell.setAttribute('data-original-value', valorOriginal);
        input.type = 'text';
        input.value = valorOriginal;

        input.id = 'input' + i;
        cell.innerHTML = '';
        cell.appendChild(input);

    }

    // Reemplaza el botón de editar por botones de enviar y deshacer
    const botones = celdas[celdas.length - 1];
    const enviar = document.createElement('button');
    enviar.innerHTML = '<img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/a%C3%B1adir.png?raw=true" class="w-[18px] h-[18px] mt-[2px]">';
    enviar.onclick = function () {
        const botones = celdas[celdas.length - 1];
        botones.innerHTML = '<div class="flex items-center"><button onclick="hacerEditable(\'' + id + '\')"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/pen%201.png?raw=true" class="w-5 max-w-none"></button><button class="xl:ml-3 lg:ml-2"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/trash%201.png?raw=true" class="w-5 max-w-none"></button></div>';
        ActualizarEstudiantes(id); // Pasa el id como parámetro
    };

    const deshacer = document.createElement('button');
    deshacer.innerHTML = '<img src= "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cancelar.png?raw=true" class="w-[18px] h-[18px] ml-[2px]">';
    deshacer.onclick = function () {
        //Realiza la función de deshacer cambios al tocar el boton deshacer
        DeshacerCambios(id, celdas);
    };
    botones.innerHTML = '';
    botones.appendChild(enviar);
    botones.appendChild(deshacer);
}

// Función para quitar el modo edición y deshacer los cambios realizados
function DeshacerCambios(id, celdas) {
    // Restaura los valores originales en las celdas
    for (let i = 2; i < celdas.length - 1; i++) {
        var cell = celdas[i];
        var valorOriginal = cell.getAttribute('data-original-value');
        cell.innerHTML = valorOriginal;
        cell.removeAttribute('data-original-value');
    }

    // Reemplaza los botones de enviar y deshacer por el botón de editar original
    const botones = celdas[celdas.length - 1];
    botones.innerHTML = '<div class="flex items-center"><button onclick="hacerEditable(\'' + id + '\')"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/pen%201.png?raw=true" class="w-5 max-w-none"></button><button class="xl:ml-3 lg:ml-2"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/trash%201.png?raw=true" class="w-5 max-w-none"></button></div>';
}

function mostrarAside() {
    var body = document.body;
    var overlay = document.getElementById('aside-active');
    var miAside = document.getElementById('aside');
    var toggleButton = document.getElementById('toggleButton');

    if (miAside.classList.contains('hidden')) {
        // Si el aside está oculto, lo mostramos
        body.style.overflow = 'hidden';
        miAside.classList.remove('hidden');
        overlay.classList.remove('hidden');
        toggleButton.classList.add('opened');
        toggleButton.classList.remove('closed');
    } else {
        // Si el aside está visible, lo ocultamos
        body.style.overflow = 'auto';
        miAside.classList.add('hidden');
        overlay.classList.add('hidden');
        toggleButton.classList.remove('opened');
        toggleButton.classList.add('closed');
    }
}

window.addEventListener('resize', function () {
    var miAside = document.getElementById('aside');
    var overlay = document.getElementById('aside-active');
    var toggleButton = document.getElementById('toggleButton');
    var body = document.body;

    if (window.innerWidth >= 1024) {
        
        body.style.overflow = 'auto';
        miAside.classList.add('hidden');
        overlay.classList.add('hidden');
        toggleButton.classList.remove('opened');
        toggleButton.classList.add('closed');
    }
});

function FiltrarEstudiantes() {
    let busqueda = document.getElementById("busqueda-input").value.trim()

    if(busqueda == null){
        ImprimirEstudiantes(estudiantes)
    }
    else{
        fetch(baseUrl + "/estudiante/filtrar?busqueda=" + busqueda).then(res => {
            res.json().then(json =>{
                estudiantesFiltro = json
                console.log(busqueda)
                console.log(estudiantesFiltro)
                ImprimirEstudiantes(estudiantesFiltro)
            })
        }).catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
}

function FiltrarEstudiantes2(){
    let busqueda2 = document.getElementById("busqueda-input2").value.trim()

    if(busqueda2 == null){
        ImprimirEstudiantes(estudiantes)
    }
    else{
        fetch(baseUrl + "/estudiante/filtrar?busqueda=" + busqueda2).then(res => {
            res.json().then(json =>{
                estudiantesFiltro = json
                console.log(busqueda2)
                console.log(estudiantesFiltro)
                ImprimirEstudiantes(estudiantesFiltro)
            })
        }).catch(error => {
            console.error("Error en la solicitud:", error);
        });
    }
}