window.onload = inicializar;
var GphApiClient = require('giphy-js-sdk-core');
client = GphApiClient("Ivh6UNXuh9JCnT0RaJVhINEK76WmKk26");

function inicializar(){
    boton = document.getElementById("boton");
    boton.addEventListener("click",random );
}

function random(){
    client.random('gifs', {})
      .then((response) => {
          var data = result.data;
          vargifurl = data.images.original.url;
          var img = document.getElementById('image-holder');
          img.src = "vargifurl";
          img.style.display = 'block';
      })
      .catch((err) => {

      });
}
