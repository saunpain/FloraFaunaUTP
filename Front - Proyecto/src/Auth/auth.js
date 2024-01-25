let baseUrl = "http://localhost:8080"
const user = "";


function GuardarEstudiante(){
    let data = {
        nombre_estudiante: document.getElementById("nombreUsuario").value,
        contraseña_estudiante: document.getElementById("contrasena").value,
        correo_estudiante : document.getElementById("correoUsuario").value,
    }

    console.log(data)
    fetch(baseUrl + "/estudiante", {
        method: "POST",
        body:JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(res => {
        console.log(res)
    })
}


function GuardarBiologo() {
    let data = {
        nombre_biologo: document.getElementById("nombreUsuario").value,
        contraseña_biologo: document.getElementById("contrasena").value,
        correo_biologo: document.getElementById("correoUsuario").value,
    }

    if(data.nombre_biologo === "" || data.contraseña_biologo === "" || data.correo_biologo === ""){
        mostrarMensajeRegistro("Debe completar todos los campos para registrarse.");
    }
    
    else{
        console.log(data);
        fetch(baseUrl + "/biologo", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if(res.ok){
                console.log("Registro exitoso");
            } else {
                throw new Error("Error en la solicitud");
            }
        })
        .catch(error => {
            mostrarMensajeRegistro("No se ha podido completar su registro.");
        });
    }
}

function loginUser() {
    var nombreUsuario = document.getElementById("nombreusuario").value;
    var contrasena = document.getElementById("password").value;

    if (nombreUsuario === "" || contrasena === "") {
        mostrarMensaje("Por favor complete ambos campos.");
        return;
    } else {
        fetch(baseUrl + "/estudiante/" + nombreUsuario)
            .then(res => res.json())
            .then(user => {
                if (user) {
                    if (contrasena === user.contraseña_estudiante) {
                        localStorage.setItem('nombreusuario', nombreUsuario);
                        window.location.href = "/Front - Proyecto/src/Usuario/Usuario - Inicio.html";
                        return;
                    } else {
                        mostrarMensaje("El usuario o contraseña ingresadas no son correctas.");
                    }
                }
            })
            .catch(() => {
                return fetch(baseUrl + "/administrativo/" + nombreUsuario)
                    .then(res => res.json())
                    .then(user => {
                        if (user && contrasena === user.contraseña_admin) {
                            localStorage.setItem('nombreusuario', nombreUsuario);
                            window.location.href = "/Front - Proyecto/src/Administrativo/Admin - Inicio.html";
                            return;
                        } else {
                            mostrarMensaje("El usuario o contraseña ingresadas no son correctas.");
                        }
                    });
            })
            .catch(() => {
                return fetch(baseUrl + "/biologo/" + nombreUsuario)
                    .then(res => res.json())
                    .then(user => {
                        if (user && contrasena === user.contraseña_biologo) {
                            window.location.href = "/Front - Proyecto/src/Biologo/Biologo - Inicio.html";
                            return;
                        } else {
                            mostrarMensaje("El usuario o contraseña ingresadas no son correctas.");
                        }
                    });
            })
            .catch(() => {
                mostrarMensaje("El usuario ingresado no está registrado.");
            });
    }
}

function mostrarMensajeRegistro(msj) {
    var mensajeElemento = document.getElementById("mensaje2");
    mensajeElemento.innerHTML = msj;
}
function mostrarMensaje(mensaje) {
    var mensajeElemento = document.getElementById("mensaje");
    mensajeElemento.innerHTML = mensaje;
}

function perfilUser() {
    const selectedProfile = document.querySelector('input[name="perfil"]:checked');
    return selectedProfile ? selectedProfile.id : null;
}

function RegistrarUsuario(id) {
    const selectedProfile = perfilUser();

    const usuario = document.getElementsByName('perfil');
    usuario.forEach(usua => {
    if (usua.id !== id) {
        usua.checked = false;
        }
    });

    switch (selectedProfile) {
        case 'PerfilEstudiante':
            GuardarEstudiante();
        break;
        case 'PerfilBiologo':
            GuardarBiologo();
        break;
        default: GuardarEstudiante();
    }
}

function OcultarVer(){
    const eye = document.getElementById("eye");
    var input = document.getElementById("password");
        if(input.type === "password"){
            input.type = "text";
            eye.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/OjoOpen.png?raw=true"
        }else{
            input.type = "password";
            eye.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/OjoClose.png?raw=true"
        }
}

function VerOcultar(){
    const eye = document.getElementById("ojito");
    var input = document.getElementById("contrasena");
        if(input.type === "password"){
            input.type = "text";
            eye.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/OjoOpen.png?raw=true"
        }else{
            input.type = "password";
            eye.src = "https://github.com/saunpain/FloraFaunaUTP/blob/main/img/OjoClose.png?raw=true"
        }
}


