let baseUrl = "http://localhost:8080"
const user = "";


function GuardarEstudiante() {
    let data = {
        nombre_estudiante: document.getElementById("nombreUsuario").value,
        contraseña_estudiante: document.getElementById("contrasena").value,
        correo_estudiante: document.getElementById("correoUsuario").value,
    }

    if (data.nombre_estudiante === "" || data.contraseña_estudiante === "" || data.correo_estudiante === "") {
        mostrarMensajeRegistro("Debe completar todos los campos para registrarse.");
    } else {
        // Hacer una petición para obtener la lista de estudiantes y verificar si ya existe el nombre de usuario y correo
        fetch(baseUrl + '/estudiante/all')
            .then(res => res.json())
            .then(estudiantes => {
                // Verificar si el nombre de usuario ya existe
                const usuarioExistente = estudiantes.find(estudiante => estudiante.nombre_estudiante === data.nombre_estudiante);
                const correoExiste = estudiantes.find(estudiante => estudiante.correo_estudiante === data.correo_estudiante);

                // Si el nombre de usuario ya existe, mostrar mensaje y salir
                if (usuarioExistente) {
                    mostrarMensajeRegistro("El nombre de usuario ya está siendo usado. Ingrese otro nombre de usuario.");
                } else if (correoExiste) {
                    mostrarMensajeRegistro("El correo ingresado ya se encuentra registrado.");
                } else {
                    // Si el nombre de usuario y correo no existen para estudiantes, hacer la misma verificación para biólogos
                    fetch(baseUrl + '/biologo/all')
                        .then(res => res.json())
                        .then(biologos => {
                            // Verificar si el nombre de usuario ya existe para biólogos
                            const biologoUsuarioExistente = biologos.find(biologo => biologo.nombre_biologo === data.nombre_estudiante);
                            const biologoCorreoExiste = biologos.find(biologo => biologo.correo_biologo === data.correo_estudiante);

                            // Si el nombre de usuario ya existe para biólogos, mostrar mensaje y salir
                            if (biologoUsuarioExistente) {
                                mostrarMensajeRegistro("El nombre de usuario ya está siendo usado. Ingrese otro nombre de usuario.");
                            } else if (biologoCorreoExiste) {
                                mostrarMensajeRegistro("El correo ingresado ya se encuentra registrado.");
                            } else {
                                // Si el nombre de usuario y correo no existen para biólogos, continuar con el registro
                                fetch(baseUrl + "/estudiante", {
                                    method: "POST",
                                    body: JSON.stringify(data),
                                    headers: {
                                        "Content-type": "application/json; charset=UTF-8"
                                    }
                                })
                                .then(res => {
                                    if (res.ok) {
                                        console.log("Registro exitoso");
                                        localStorage.setItem('nombreusuario', data.nombre_estudiante);
                                        window.location.href = "/Front - Proyecto/src/Usuario/Usuario - Inicio.html";
                                    } else {
                                        throw new Error("Error en la solicitud");
                                    }
                                })
                                .catch(error => {
                                    mostrarMensajeRegistro("No se ha podido completar su registro.");
                                });
                            }
                        })
                        .catch(error => {
                            mostrarMensajeRegistro("Error al obtener la lista de biólogos.");
                        });
                }
            })
            .catch(error => {
                mostrarMensajeRegistro("Error al obtener la lista de estudiantes.");
            });
    }
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
        fetch(baseUrl + '/estudiante/all')
            .then(res => res.json())
            .then(estudiantes => {

                // Verificar si el nombre de usuario ya existe en estudiante
                const usuarioExistente = estudiantes.find(estudiante => estudiante.nombre_estudiante === data.nombre_biologo);
                const correoExiste = estudiantes.find(estudiante => estudiante.correo_estudiante === data.correo_biologo);

                if (usuarioExistente) {
                    mostrarMensajeRegistro("El nombre de usuario ya está siendo usado. Ingrese otro nombre de usuario.");
                } else if (correoExiste) {
                    mostrarMensajeRegistro("El correo ingresado ya se encuentra registrado.");
                } else {
                    // Si el nombre de usuario y correo no existen para estudiantes, verificar biologo
                    fetch(baseUrl + '/biologo/all')
                        .then(res => res.json())
                        .then(biologos => {
                            const biologoUsuarioExistente = biologos.find(biologo => biologo.nombre_biologo === data.nombre_biologo);
                            const biologoCorreoExiste = biologos.find(biologo => biologo.correo_biologo === data.correo_biologo);

                            if (biologoUsuarioExistente) {
                                mostrarMensajeRegistro("El nombre de usuario ya está siendo usado. Ingrese otro nombre de usuario.");
                            } else if (biologoCorreoExiste) {
                                mostrarMensajeRegistro("El correo ingresado ya se encuentra registrado.");
                            } else {
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
                                        localStorage.setItem('nombreusuario', data.nombre_biologo);
                                        window.location.href = "/Front - Proyecto/src/Biologo/Biologo - Inicio.html"
                                    } else {
                                        throw new Error("Error en la solicitud");
                                    }
                                })
                                .catch(error => {
                                    mostrarMensajeRegistro("No se ha podido completar su registro.");
                                });
                            }
                    })
                    .catch(error => {
                        mostrarMensajeRegistro("Algo ha salido mal. No se ha podido completar su registro");
                    });
                }
        })
        .catch(error => {
            mostrarMensajeRegistro("Algo ha salido mal. No se ha podido completar su registro");
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


