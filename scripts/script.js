/**
 * @file        script.js
 * @description Trabajo práctico para el curso Javascript Frontend de Talento Tech (segundo cuatrimestre de 2024).
 * @author      Mariela Montaldo (github.com/m0nt4ld0)
 * @date        2024-11-13
 * @version     1.0.0
 * @updated     2024-11-13
 * 
 * @license     MIT
 *
 */

const productos = ["Perú", "México", "Brasil"];

function mainEjercicios() {
    esFormCompleto('contact');
    obtenerListadoProductos();
}

/////////// Condicionales y ciclos /////////// 

/* Condicionales y ciclos - 1
 * Implementar una función que verifique si todos los
 * campos del formulario de contacto están
 * completos, mostrando un mensaje en la consola.
 */

function esFormCompleto(formId) {
    // ToDo: Quizas con array y filter se puede reescribir en menos lineas de codigo
    const form = document.getElementById(formId);

    if (!form) {
        console.error(`Formulario de id=${form.id} no encontrado`);
        return false;
    }
    
    const elements = form.elements;
    
    for (let e of elements) {
        if((e.type == "email" || e.type == "textarea") && e.value == "") {
            console.log(`Existen campos del formulario de id=${form.id} sin completar`);
            return false;
        }
    }

    console.log(`Todos los campos del formulario de id=${form.id} están completos`);
    return true;
}

/* Condicionales y ciclos - 2
 * Crear un ciclo que genere dinámicamente una
 * lista de productos disponibles y los muestre en la
 * consola 
 */
 
function obtenerListadoProductos() {
    console.log("Listado de productos disponibles:");
    for(let p of productos) {
        console.log(p);
    }
}

/////////// Manipulacion basica del DOM y eventos /////////// 

/* Manipulacion basica del DOM y eventos - 1
 * Implementar un evento click que muestra la
 * descripción ampliada del producto que clickeamos. 
 */
function mostrarDescripcionProducto() {
}

/* Manipulacion basica del DOM y eventos - 2
 * Crear un listado de productos incluidos en nuestro
 * HTML generado por medio de una función en Js.
 */
function mostrarListadoProductos() {
}

/////////// Funciones modulares /////////// 

/* Funciones modulares - 1
 * Crear de una función que cree un array de
 * productos y los muestre en la página utilizando
 * una plantilla HTML dinámica.
 */
function mostrarListadoProductosEnListaDinamica() {
}

/////////// Asincronia y consumo de API Rest /////////// 

/* Asincronia y consumo de API Rest - 1
 * Utilización de fetch para obtener datos de una API
 * pública y mostrarlos en la sección main del HTML.
 */
function obtenerDatosAPI() {
}

/* Asincronia y consumo de API Rest - 2
 * Procesar los datos obtenidos de la API para
 * organizarlos en cards, aplicando Flexbox o Grid para
 * mantener la coherencia en el diseño.
 */
function mostrarCardsDatosAPI() {
}

/////////// Carrito de compras ///////////

/* Debemos tener implementado un carrito de
 * compras que permita a los usuarios añadir
 * productos desde las cards, utilizando localStorage
 * y sessionStorage para almacenar la información
 * del carrito. 
 */
function agregarItemCarrito() {
    
}

/* Los productos en el carrito se deben poder
 * visualizar, editar (cambiar la cantidad) y eliminar.
 * 3. La información debe mantenerse después de
 * recargar la página.
*/

function quitarItemCarrito() {
    
}

function mostrarDetalleItemCarrito() {
    
}

function mostrarItemsCarrito() {
    
}

function modificarCantidadCarrito(itemId) {
    
}
