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

// Asegúrate de cerrar el aside al cambiar de pantalla
window.addEventListener('resize', function () {
    var miAside = document.getElementById('aside');
    var overlay = document.getElementById('aside-active');
    var toggleButton = document.getElementById('toggleButton');
    var body = document.body;

    if (window.innerWidth >= 1024) {
        // Ajusta el comportamiento en pantallas más grandes
        body.style.overflow = 'auto';
        miAside.classList.add('hidden');
        overlay.classList.add('hidden');
        toggleButton.classList.remove('opened');
        toggleButton.classList.add('closed');
    }
});

/* Función para añadir celdas a las tablas */
function añadirRegistro() {
    var tabla = document.getElementById("añadir_datos");
    var nuevaCelda = tabla.insertRow(1);
    var ultimaColumna = tabla.rows[0].cells.length - 1; // Índice de la última columna

    for (var i = 0; i <= ultimaColumna; i++) {
        var nueva = nuevaCelda.insertCell(i);

        if (i === 0) {
            var registro = document.createElement('input');
            registro.setAttribute("disabled", true);
            registro.className = "text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700";  /* Le da estilo a las celdas agregadas formato texto*/
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
            btnEnviar.addEventListener('click', function () {});

            btnEliminar.appendChild(iconEliminar);
            btnEliminar.addEventListener('click', function () {
                tabla.deleteRow(nuevaCelda.rowIndex); /* Elimina la celda creada */
            });
            nueva.appendChild(btnEliminar);
            nueva.appendChild(btnEnviar);
        } else {
            var registro = document.createElement('input');
            registro.type = "text";
            registro.className = "text-center xl:px-8 lg:px-4 py-2 whitespace-nowrap text-gray-700";  /* Le da estilo a las celdas agregadas formato texto*/
            nueva.appendChild(registro);
        }
    }
    nuevaCelda.cells[0].querySelector('input').focus();
  }


// Función para hacer editable una fila
function hacerEditable(id) {
    // Obtener la fila actual
    const fila = document.getElementById(id);
    
    // Crear celdas de entrada para cada celda en la fila
    const celdas = fila.getElementsByTagName('td');
    for (let i = 0; i < celdas.length - 1; i++) {
        const valorOriginal = celdas[i].textContent;
        celdas[i].setAttribute('data-original-value', valorOriginal);

        if (i === 1) { // Si es el segundo campo (comentario), crea un textarea en lugar de input
            const textarea = document.createElement('textarea');
            textarea.value = valorOriginal;
            textarea.className = 'w-full h-auto'; // Ajusta el tamaño según tus necesidades
            textarea.addEventListener('blur', function () {
                
            });

            celdas[i].innerHTML = '';  // Cambiado a innerHTML
            celdas[i].appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = valorOriginal;
            input.addEventListener('blur', function () {
                // No hace nada al salir del input en este caso
            });

            celdas[i].innerHTML = '';  // Cambiado a innerHTML
            celdas[i].appendChild(input);
        }
    }

    // Reemplazar el botón de editar por botones de enviar y deshacer
    const botones = celdas[celdas.length - 1];
    const enviar = document.createElement('button');
    enviar.innerHTML = '<img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/a%C3%B1adir.png?raw=true" class="w-[18px] h-[18px] mt-[2px]">';
    enviar.onclick = function () {
        // Lógica para guardar los cambios y actualizar la interfaz
        alert('Cambios enviados');
        DeshacerCambios(id, celdas);
    };

    const deshacer = document.createElement('button');
    deshacer.innerHTML = '<img src= "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/cancelar.png?raw=true" class="w-[18px] h-[18px] ml-[2px]">';
    deshacer.onclick = function () {
        // Lógica para deshacer los cambios y actualizar la interfaz
        DeshacerCambios(id, celdas);
    };

    botones.innerHTML = '';
    botones.appendChild(enviar);
    botones.appendChild(deshacer);

}

function guardarCambios(cellIndex, newValue, celdas) {
    // Actualiza el contenido de la celda con el nuevo valor
    celdas[cellIndex].textContent = newValue;
}

// Función para hacer no editable una fila y restaurar los valores originales
function DeshacerCambios(id, celdas) {
    // Restaurar los valores originales en las celdas de entrada
    for (let i = 0; i < celdas.length - 1; i++) {
        var cell = celdas[i];
        var valorOriginal = cell.getAttribute('data-original-value');
        cell.textContent = valorOriginal;
        cell.removeAttribute('data-original-value');
    }

    // Reemplazar los botones de enviar y deshacer por el botón de editar original
    const botones = celdas[celdas.length - 1];
    botones.innerHTML = '<div class="flex items-center"><button onclick="hacerEditable(\'' + id + '\')"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/pen%201.png?raw=true" class="w-5 max-w-none"></button><button class="xl:ml-3 lg:ml-2"><img src="https://github.com/saunpain/FloraFaunaUTP/blob/main/img/trash%201.png?raw=true" class="w-5 max-w-none"></button></div>';
}