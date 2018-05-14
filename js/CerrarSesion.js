window.onload=function(){
    var cerrarsesion = document.getElementById("Cerrarsesion");
    cerrarsesion.addEventListener("click",logout);
}

function logout(){
    console.log("funciona");
    firebase.auth().signOut();
    window.location.href = "index.html";
}
