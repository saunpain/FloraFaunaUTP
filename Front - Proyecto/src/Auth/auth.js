let baseUrl = "http://localhost:8080"
let user = []

function GuardarEstudiante(){
    let data = {
        nombre_estudiante: document.getElementById("nombreusuario").value,
        contraseña_estudiante: document.getElementById("password").value,
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
        ObtenerEstudiantes()
    })
}

function loginUser() {
    var nombreUsuario = document.getElementById("nombreusuario").value;
    var contrasena = document.getElementById("password").value;

    fetch(baseUrl + "/estudiante/" + nombreUsuario)
        .then(res => res.json())
        .then(user => {
            if (user) {
                if (contrasena === user.contraseña_estudiante) {
                    window.location.href = "/Front - Proyecto/src/Usuario/Usuario - Inicio.html";

                } else {
                    window.alert("El usuario o contraseña ingresadas no son correctas.");
                }
            } else {
                window.alert("Estudiante no encontrado. Verifique el nombre de usuario.");
            }
        })
        .catch(error => {
            console.error(error);
        });
}

