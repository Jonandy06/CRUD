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

function guardarProducto(e) {
  e.preventDefault();
  //   verificar q pase todas la validaciones
  if (validarGeneral()) {
    //   tengo q crear el producto
    console.log("aqui creo el producto");
    agregarProducto();
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
    <button class="btn btn-warning" onclick= "prepararEdicion(${itemProducto.codigo})">Editar</button>
    <button class="btn btn-danger" onclick= "">Borrar</button>
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
}