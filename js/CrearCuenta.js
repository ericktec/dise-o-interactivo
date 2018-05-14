window.onload = inicializar;
var formRegistro;
var database = firebase.database();

function inicializar(){
    formRegistro = document.getElementById("SingUpFormulario");
    formRegistro.addEventListener("submit", Registrarse, false);
}

function Registrarse(event){
    event.preventDefault();
    var usuario = event.target.email.value;
    var contrasena = event.target.password.value;

    firebase.auth().createUserWithEmailAndPassword(usuario, contrasena)
    .then(function(result){
        window.location.href = "Login.html"
        alert("Favor de iniciar sesión para verificar su cuenta");
    })
    .catch(function(error) {
        alert("Porfavor trate de nuevo");
        var errorCode = error.code;
        var errorMessage = error.message;
    });

}
