window.onload = inicializar;
var formAutenticacion;
var provider = new firebase.auth.GoogleAuthProvider();

function inicializar(){
    formAutenticacion = document.getElementById("boton");
    formAutenticacion.addEventListener("click", autentificar,false);
}

function autentificar(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  window.location.href = "ToDOList.html"
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
