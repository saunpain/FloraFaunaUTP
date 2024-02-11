let baseUrl = "http://localhost:8080"
const user = "";

function GuardarEstudiante() {
    let data = {
        nombre_estudiante: document.getElementById("nombreUsuario").value,
        contraseña_estudiante: document.getElementById("contrasena").value,
        correo_estudiante: document.getElementById("correoUsuario").value.toLowerCase(), //convierte las letras en minusculas
    }

    if (data.nombre_estudiante === "" || data.contraseña_estudiante === "" || data.correo_estudiante === "") {
        mostrarMensajeRegistro("Debe completar todos los campos para registrarse.");
    }
    else{
        const correoValid = data.correo_estudiante.split('@'); //Divide el correo ingresado en dos desde el @ para hacer validaciones
    
        if (correoValid.length !== 2 || correoValid[0] === "" || correoValid[1] === "") { //Valida que el @ exista, y que hayan dos partes del correo ingresado.
            mostrarMensajeRegistro("Por favor ingrese un correo electrónico válido.");
        } else {
            const dominioValido = correoValid[1];

            if (dominioValido === "" || dominioValido !== "utp.ac.pa" && dominioValido !== "gmail.com" && dominioValido !== "hotmail.com") {
                mostrarMensajeRegistro("Correo electrónico no válido. Utilice alguno de estos dominios: utp.ac.pa, gmail.com, hotmail.com");
            }
            else{
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
    }
}


function GuardarBiologo() {
    let data = {
        nombre_biologo: document.getElementById("nombreUsuario").value,
        contraseña_biologo: document.getElementById("contrasena").value,
        correo_biologo: document.getElementById("correoUsuario").value.toLowerCase(), //convierte las letras en minusculas
    }

    if(data.nombre_biologo === "" || data.contraseña_biologo === "" || data.correo_biologo === ""){
        mostrarMensajeRegistro("Debe completar todos los campos para registrarse.");
    }else{
        const correoValid = data.correo_biologo.split('@'); //Divide el correo ingresado en dos desde el @ para hacer validaciones
    
        if (correoValid.length !== 2 || correoValid[0] === "" || correoValid[1] === "") { //Valida que el @ exista, y que hayan dos partes del correo ingresado.
            mostrarMensajeRegistro("Por favor ingrese un correo electrónico válido.");
        }
        else{
            const dominioValido = correoValid[1];

            if (dominioValido === "" || dominioValido !== "utp.ac.pa" && dominioValido !== "gmail.com" && dominioValido !== "hotmail.com") {
                mostrarMensajeRegistro("Correo electrónico no válido. Utilice alguno de estos dominios: utp.ac.pa, gmail.com, hotmail.com");
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
    
    }}
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
                if (user && user.nombre_estudiante === nombreUsuario) {
                    if (contrasena === user.contraseña_estudiante) {
                        localStorage.setItem('nombreusuario', nombreUsuario);
                        window.location.href = "/Front - Proyecto/src/Usuario/Usuario - Inicio.html";
                        return;
                    } else {
                        mostrarMensaje("La contraseña ingresada no es correcta.");
                    }
                }
                else{
                    mostrarMensaje("El nombre de usuario ingresado es incorrecto.");
                }
            })
            .catch(() => {
                return fetch(baseUrl + "/administrativo/" + nombreUsuario)
                    .then(res => res.json())
                    .then(user => {
                        if (user && user.nombre_admin === nombreUsuario){
                            if (contrasena === user.contraseña_admin) {
                                localStorage.setItem('nombreusuario', nombreUsuario);
                                window.location.href = "/Front - Proyecto/src/Administrativo/Admin - Inicio.html";
                                return;
                            } else {
                                mostrarMensaje("La contraseña ingresada no es correcta.");
                            }
                        } else {
                            mostrarMensaje("El nombre de usuario ingresado es incorrecto.");
                        }
                        
                    });
            })
            .catch(() => {
                return fetch(baseUrl + "/biologo/" + nombreUsuario)
                    .then(res => res.json())
                    .then(user => {
                        if (user && user.nombre_biologo === nombreUsuario){
                            if (user && contrasena === user.contraseña_biologo) {
                                localStorage.setItem('nombreusuario', nombreUsuario);
                                window.location.href = "/Front - Proyecto/src/Biologo/Biologo - Inicio.html";
                                return;
                            } else {
                                mostrarMensaje("La contraseña ingresada no es correcta.");
                            }
                        }else {
                            mostrarMensaje("El nombre de usuario ingresado es incorrecto.");
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

function mostrarMensajeRP(msj) {
    var mensajeElemento = document.getElementById("mensaje3");
    mensajeElemento.innerHTML = msj;
}

document.getElementById('PerfilEstudiante').checked = true;

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

    if (selectedProfile === 'PerfilEstudiante') {
        GuardarEstudiante();
    } else if (selectedProfile === 'PerfilBiologo') {
        GuardarBiologo();
    } else {
        GuardarEstudiante();
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

function mostrarInicioS(event) {
    event.preventDefault();
    document.body.style.overflow = 'hidden';
  
    var overlay = document.getElementById('login');
    var loginContainer = document.getElementById('contenedor-login');
    var loginContent = document.getElementById('login-contenido');
    // Cargar dinámicamente el contenido
    fetch('/Front - Proyecto/src/Auth/login.html')
      .then(response => response.text())
      .then(data => {
        loginContent.innerHTML = data;
        overlay.style.display = 'block';
        
        loginContainer.style.display = 'flex';
      })
      .catch(error => console.error(error));
  }
  
  function mostrarRegistro(event) {
    event.preventDefault();
    document.body.style.overflow = 'hidden';
  
    var overlay = document.getElementById('registro');
    var registroContainer = document.getElementById('contenedor-registro');
    var registroContent = document.getElementById('registro-contenido');
  
    cerrarLogin();
    fetch('/Front - Proyecto/src/Auth/Registro.html')
      .then(response => response.text())
      .then(data => {
        registroContent.innerHTML = data;
        overlay.style.display = 'block';
        
        registroContainer.style.display = 'flex';
      })
      .catch(error => console.error(error));
  }
  
  function mostrarR1() {
    document.body.style.overflow = 'hidden';
  
    var overlay = document.getElementById('reestablecer1');
    var rpContainer = document.getElementById('contenedor-reestablecer1');
    var rpContent = document.getElementById('reestablecer1-contenido');
  
    cerrarLogin();
    // Cargar dinámicamente el contenido
    fetch('/Front - Proyecto/src/Auth/Reestablecer_contraseña.html')
      .then(response => response.text())
      .then(data => {
        rpContent.innerHTML = data;
        overlay.style.display = 'block';
        
        rpContainer.style.display = 'flex'; 
      })
      .catch(error => console.error(error));
  }
  
  
  function mostrarR2() {
    const usuario = document.getElementById('reestablecer_usuario').value;

    if (usuario === '') {
        mostrarMensajeRP("Por favor ingrese su nombre de usuario o correo.");
        return;
    } else {
        fetch(baseUrl + "/estudiante/all")
            .then(res => res.json())
            .then(estudiantes => {
                const usuarioEncontrado = estudiantes.find(estudiante => estudiante.nombre_estudiante === usuario);
                const correoEncontrado = estudiantes.find(estudiante => estudiante.correo_estudiante === usuario);

                if (usuarioEncontrado || correoEncontrado) {
                    ReesContraseña();
                } else {
                    fetch(baseUrl + "/biologo/all")
                    .then(res => res.json())
                    .then(biologos => {
                        const usuarioEncontrado = biologos.find(biologo => biologo.nombre_biologo === usuario);
                        const correoEncontrado = biologos.find(biologo => biologo.correo_biologo === usuario);

                        if (usuarioEncontrado || correoEncontrado) {
                            ReesContraseña();
                        } else {
                            mostrarMensajeRP("No se ha encontrado usuario ni correo existente.");
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            })
            .catch(error => {
                console.error("Error al obtener datos ", error);
                mostrarMensajeRP("No se ha encontrado usuario ni correo existente.");
            });
    }
}


function ReesContraseña(){
    document.body.style.overflow = 'hidden';
  
var overlay = document.getElementById('reestablecer2');
var rp2Container = document.getElementById('contenedor-reestablecer2');
var rp2Content = document.getElementById('reestablecer2-contenido');
  
    cerrarR1();
    fetch('/Front - Proyecto/src/Auth/Revisa_tu_bandeja.html')
      .then(response => response.text())
      .then(data => {
        rp2Content.innerHTML = data;
        overlay.style.display = 'block';
        
        rp2Container.style.display = 'flex'; 
      })
      .catch(error => console.error(error));
}

  
  function mostrarR3() {
    document.body.style.overflow = 'hidden';
  
    var overlay = document.getElementById('reestablecer3');
    var rp3Container = document.getElementById('contenedor-reestablecer3');
    var rp3Content = document.getElementById('reestablecer3-contenido');
  
    cerrarLogin();
    // Cargar dinámicamente el contenido
    fetch('/Front - Proyecto/src/Auth/Reestablezca_contraseña.html')
      .then(response => response.text())
      .then(data => {
        rp3Content.innerHTML = data;
        overlay.style.display = 'block';
        
        rp3Container.style.display = 'flex'; 
      })
      .catch(error => console.error(error));
  }
  
  
  function cerrarRegistro() {
    document.body.style.overflow = 'auto';
  
    var overlay = document.getElementById('registro');
    var registroContainer = document.getElementById('contenedor-registro');
  
    overlay.style.display = 'none';
    registroContainer.style.display = 'none';
}
  
  function cerrarLogin() {
    document.body.style.overflow = 'auto';
  
    var overlay = document.getElementById('login');
    var loginContainer = document.getElementById('contenedor-login');
  
    overlay.style.display = 'none';
    loginContainer.style.display = 'none';
  }
  
  function cerrarR1() {
    document.body.style.overflow = 'auto';
  
    var overlay = document.getElementById('reestablecer1');
    var rpContainer = document.getElementById('contenedor-reestablecer1');
  
    overlay.style.display = 'none';
    rpContainer.style.display = 'none';
  }
  
  function cerrarR2() {
    document.body.style.overflow = 'auto';

    var overlay = document.getElementById('reestablecer2');
    var rp2Container = document.getElementById('contenedor-reestablecer2');

    overlay.style.display = 'none';
    rp2Container.style.display = 'none';
}

function cerrarR3() {
    document.body.style.overflow = 'auto';

    var overlay = document.getElementById('reestablecer3');
    var rp3Container = document.getElementById('contenedor-reestablecer3');

    overlay.style.display = 'none';
    rp3Container.style.display = 'none';
}