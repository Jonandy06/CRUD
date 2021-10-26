let listaProducta = [];

cargarInicial();

function cargarInicial(){
    // revisar los datos del localstorage
    listaProducta = JSON.parse(localStorage.getItem('arregloProducto')) || [];
    // dibujar a las clumnas con sus respéctivas cards
    if(listaProducta.length >0){
        listaProducta.foreach(itemProducto => {crearColumna(itemProducto);
        });
    }
}

function crearColumna(producto){
    let grilla = document.querySelector('#grilla');
    grilla.innerHTML += `<div class="col-sm-12 col-md-4 col-lg-3 mb-3">
    <div class="card">
        <img src="${producto.url}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion}</p>
        </div>
      </div>  
</div>`;
}