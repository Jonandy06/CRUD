import {
  validarCodigo,
  validarCampoRequerido,
  validarGeneral,
  validarNumeros,
  validarURL,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

// traer los input/texarea

let codigo = document.querySelector("#codigo");
let cantidad = document.querySelector("#cantidad");
let url = document.querySelector("#url");
let producto = document.querySelector("#producto");
let descripcion = document.querySelector("#descripcion");
let formulario = document.querySelector("#formProducto");
let listoProducto = [];
let productoExistente = false; // si es falso significa que tengo que agregar un nuevo producto
// true signica que tengo que modificar un producto existente
let btnNuevoProducto = document.querySelector('#btnNuevoProducto');
// console.log(formulario)

cargarInicial();

// le agremos el evento
codigo.addEventListener("blur", () => {
  validarCodigo(codigo);
});
cantidad.addEventListener("blur", () => {
  validarNumeros(cantidad);
});
url.addEventListener("blur", () => {
  validarURL(url);
});
producto.addEventListener("blur", () => {
  validarCampoRequerido(producto);
});
descripcion.addEventListener("blur", () => {
  validarCampoRequerido(descripcion);
});
formulario.addEventListener("submit", guardarProducto);
btnNuevoProducto.addEventListener('click', limpiarFormulario);

function guardarProducto(e) {
  e.preventDefault();
  //   verificar q pase todas la validaciones
  if (validarGeneral()) {
    // aqui pregunto cual es el estado de mi variable productoExistente
    if( productoExistente === false){
      //   tengo q crear el producto
    console.log("aqui creo el producto");
    agregarProducto();      
    }else{
      // tengo que modificar un producto
      console.log('aqui quiero modificar producto');
      actualizarProducto();
    }    
  } else {
    //   aqui no hacemos nada
    console.log("no deberia hacer nada");
  }
}

function agregarProducto() {
  //   crear un objeto Producto
  let productoNuevo = new Producto(
    codigo.value,
    producto.value,
    descripcion.value,
    cantidad.value,
    url.value
  );
  console.log(productoNuevo);
  // cargar el producto dentro del arreglo
    listoProducto.push(productoNuevo);
    console.log(listoProducto)
  // al arreglo de productos lo almaceno en el localstorage
    localStorage.setItem('arregloProductos', JSON.stringify(listoProducto))
  // limpiar el formulario
    limpiarFormulario();
  // cargar el producto nuevo en la fila de la tabla
  crearFilas(productoNuevo);
  // mostrar un mensaje al usuario

  // mostrar el objeto en una tabla
}


function limpiarFormulario(){
  // limpia los value de mis input
    formulario.reset();
  // limpiar los estilos
  codigo.className = 'form-control';
  // TAREA: resetuar las clases del resto de los input
  cantidad.className = 'form-control';
  url.className = 'form-control';
  producto.className = 'form-control';
  descripcion.className = 'form-control';
  formulario.className = 'form-control';
  // resetear el valor de la variable bolleana
  productoExistente = false;
}

function cargarInicial(){
  // traer los productos del localstorage si existieran sino dejar el arreglo vacio
  listoProducto = JSON.parse(localStorage.getItem('arregloProductos',)) || [];
  // se hay productos dentro del arrglo entonces los muestros en la tabla
  listoProducto.forEach((itemProducto)=>{
    // codigo que se ejecuta por cada elemento del arreglo
    crearFilas(itemProducto);
  });  
}

function crearFilas(itemProducto){
  let tabla = document.querySelector('#tablaProducto');
  console.log(itemProducto)
  tabla.innerHTML += `<tr>
  <th scope="row">${itemProducto.codigo}</th>
  <td>${itemProducto.nombre}</td>
  <td>${itemProducto.descripcion}</td>
  <td>${itemProducto.cantidad}</td>
  <td>${itemProducto.url}</td>  
  <td>
    <button class="btn btn-warning" onclick= "prepararEdicion('${itemProducto.codigo}')">Editar</button>
    <button class="btn btn-danger" onclick= "eliminarProducto('${itemProducto.codigo}')">Borrar</button>
  </td>                    
</tr>`
}

window.prepararEdicion = (codigoProducto)=>{
  console.log(codigoProducto);
  // buscar el objeto
  let productoBuscado = listoProducto.find((itemProducto)=>{return itemProducto.codigo == codigoProducto})
  console.log(productoBuscado)
  // mostrarlo en el formulario
  codigo.value = productoBuscado.codigo
  cantidad.value = productoBuscado.cantidad
  url.value = productoBuscado.url
  producto.value = productoBuscado.producto
  descripcion.value = productoBuscado.descripcion
  formulario.value = productoBuscado.formulario
  // cambio el valor de la variable productoExistente
  productoExistente = true;
};

function actualizarProducto(){
  // buscar la posicion del elemento a editar dentro del arreglo
  let posicionProducto = listoProducto.findIndex((itemProducto) =>{return itemProducto.codigo == codigo.value});
  console.log(posicionProducto);
  // modificar los datos de esa posicion del arreglo
  listoProducto[posicionProducto].nombre = producto.value;
  listoProducto[posicionProducto].cantidad = cantidad.value;
  listoProducto[posicionProducto].descripcion = descripcion.value;
  listoProducto[posicionProducto].url = url.value;
  // modificar el localstorage
  localStorage.setItem('arregloProductos', JSON.stringify(listoProducto))
  // volver a dibujar la tabla
  borrarFilas();
  listoProducto.forEach((itemProducto) =>{crearFilas(itemProducto)});
  // limpiar formulario
  limpiarFormulario();
}

function borrarFilas(){
  let tabla = document.querySelector('#tablaProducto');
  tabla.innerHTML= '';
}

window.eliminarProducto = (codigo) => {
  console.log(codigo);
  // aqui borramos el producto dentro del arreglo
  let productosFiltrado = listoProducto.filter((itemProducto)=>{ return itemProducto.codigo != codigo});

  console.log(productosFiltrado);
  // actualizar el arreglo listoProducto
  listoProducto = productosFiltrado;
  // actualizo el localstorage
  localStorage.setItem('arregloProductos', JSON.stringify(listoProducto))
  // dibujar nuevamente la tabla
  borrarFilas();
  listoProducto.forEach((itemProducto)=>{ crearFilas(itemProducto)})
}
