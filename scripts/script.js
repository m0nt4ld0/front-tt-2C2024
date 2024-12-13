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
const GEONAMES_API_KEY = "mmontaldo";
const UNSPLASH_API_KEY = "SQlNF6a80hwUX5aYFGBV3C3-qo7Bml7IbXvuZgc5ciI";

// Carrito de compras - Constantes para las claves en localStorage y sessionStorage
const CARRITO_COMPRAS_KEY = "carritoCompras";

// Carrito de compras - Inicializa el carrito en localStorage si no existe
if (!localStorage.getItem(CARRITO_COMPRAS_KEY)) {
    localStorage.setItem(CARRITO_COMPRAS_KEY, JSON.stringify([]));
}

const descripciones = {
    "tarjeta-peru": "Descubre Perú, un país lleno de maravillas naturales y culturales: desde la majestuosa ciudadela de Machu Picchu en los Andes, hasta la vibrante Amazonía y las encantadoras playas del Pacífico, donde cada rincón te invita a vivir una experiencia inolvidable.", 
    "tarjeta-mexico": "México te espera con sus playas paradisíacas, ciudades coloniales llenas de historia, y una cultura vibrante que se refleja en su gastronomía, sus festivales coloridos y su calidez única; un destino donde cada visita se convierte en una aventura inolvidable.", 
    "tarjeta-brasil": "Brasil te invita a explorar su belleza sin igual, desde las icónicas playas de Río de Janeiro hasta la imponente selva amazónica y el ritmo contagioso del carnaval; un país lleno de naturaleza exuberante, cultura vibrante y alegría que te harán querer regresar una y otra vez."
};

async function mainEjercicios() {
    esFormCompleto('contact');
    obtenerListadoProductos();

    // Initialize cart panel functionality
    initializeCartPanel();

    // Eventos de clic para divs de viajes
    const tarjetasProductos = document.getElementsByClassName("tarjeta-producto");

    for(let tp of tarjetasProductos) {
        tp.addEventListener("click", () => {
            mostrarDescripcionProducto(tp.id);
        });
    }
    mostrarListadoProductosEnListaDinamica();
    await obtenerDatosAPIyMostrarEnMain();
    await obtenerCardsPaisesYcargarFotos();
    // Registrar eventos en botones dinámicos
    document.querySelectorAll('.agrega-carrito-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const country = event.target.getAttribute('data-product');
            const action = event.target.getAttribute('data-action') || 'add';
            
            if (action === 'add') {
                agregarItemCarrito(country, 1);
            } else {
                agregarItemCarrito(country, -1);
            }
        });
    });
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
function mostrarDescripcionProducto(producto) {
    console.log(`El producto ${producto} ` + 
            ((producto == "" || producto == null) ? 
                `no fue encontrado.` : 
                `tiene la descripción: ${descripciones[producto]}`));
}

/* Manipulacion basica del DOM y eventos - 2
 * Crear un listado de productos incluidos en nuestro
 * HTML generado por medio de una función en Js.
 */
function mostrarListadoProductos() {
}

/////////// Funciones modulares /////////// 

/* Funciones modulares - 1
 * Crear una función que cree un array de
 * productos y los muestre en la página utilizando
 * una plantilla HTML dinámica.
 */
function mostrarListadoProductosEnListaDinamica() {
    console.log("Inicia ejecucion mostrarListadoProductosEnListaDinamica()");

    var arrayProductos = {
        "tarjeta-peru": {
            "title" : "Perú",
            "description" : "Descubre Perú, un país lleno de maravillas naturales y culturales: desde la majestuosa ciudadela de Machu Picchu en los Andes, hasta la vibrante Amazonía y las encantadoras playas del Pacífico, donde cada rincón te invita a vivir una experiencia inolvidable.",
            "image" : "./imgs/destinations/MachuPicchu.jpg"
        },
        "tarjeta-mexico": {
            "title" : "México",
            "description" : "México te espera con sus playas paradisíacas, ciudades coloniales llenas de historia, y una cultura vibrante que se refleja en su gastronomía, sus festivales coloridos y su calidez única; un destino donde cada visita se convierte en una aventura inolvidable.",
            "image" : "./imgs/destinations/mexico.jpg"
        },
        "tarjeta-brasil": {
            "title" : "Brasil",
            "description" : "Brasil te invita a explorar su belleza sin igual, desde las icónicas playas de Río de Janeiro hasta la imponente selva amazónica y el ritmo contagioso del carnaval; un país lleno de naturaleza exuberante, cultura vibrante y alegría que te harán querer regresar una y otra vez.",
            "image" : "./imgs/destinations/buzios.jpg"
        }
    };
    
    const grillaProductos = document.getElementById('grilla-productos');

    for (var p in arrayProductos) {
        if (arrayProductos.hasOwnProperty(p)) {
            console.log("entra if mostrarListadoProductosEnListaDinamica()");
            var producto = arrayProductos[p];
            var html = `<div class="tarjeta-producto" 
                id="${p}" 
                data-title="${producto.title}"
                style="background-image: url('${producto.image}'); ">
                <div class="tarjeta-contenido">
                    <h3>${producto.title}</h3>
                    <p>${producto.description}</p>
                    <div class="cart-controls">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity-display">0</span>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
            </div>`;
            grillaProductos.innerHTML += html;
        }
    }

    // Add event listeners after rendering
    setupProductCardEventListeners();
}

// Setup event listeners for dynamically created product cards
function setupProductCardEventListeners() {
    // Get all product cards from both grids
    const grillaProductos = document.getElementById('grilla-productos');
    const grillaDinamica = document.getElementById('grilla-dinamica-productos');
    
    // Function to handle click events
    function handleCardClick(event) {
        const productCard = event.target.closest('.tarjeta-producto');
        if (!productCard) return;

        const productTitle = productCard.dataset.title;
        const quantityDisplay = productCard.querySelector('.quantity-display');
        
        if (event.target.classList.contains('plus')) {
            event.preventDefault(); // Prevent any default button behavior
            event.stopPropagation(); // Stop event from bubbling
            
            if (quantityDisplay) {
                const currentQuantity = parseInt(quantityDisplay.textContent, 10) || 0;
                const newQuantity = currentQuantity + 1;
                agregarItemCarrito(productTitle, 1);
                quantityDisplay.textContent = newQuantity;
            }
        } else if (event.target.classList.contains('minus')) {
            event.preventDefault();
            event.stopPropagation();
            
            if (quantityDisplay) {
                const currentQuantity = parseInt(quantityDisplay.textContent, 10) || 0;
                if (currentQuantity > 0) {
                    const newQuantity = currentQuantity - 1;
                    if (newQuantity === 0) {
                        quitarItemCarrito(productTitle);
                    } else {
                        modificarCantidadCarrito(productTitle, newQuantity);
                    }
                    quantityDisplay.textContent = newQuantity;
                }
            }
        }
    }

    // Remove any existing event listeners
    if (grillaProductos) {
        const oldGrilla = grillaProductos.cloneNode(true);
        grillaProductos.parentNode.replaceChild(oldGrilla, grillaProductos);
        oldGrilla.addEventListener('click', handleCardClick);
    }

    if (grillaDinamica) {
        const oldGrillaDinamica = grillaDinamica.cloneNode(true);
        grillaDinamica.parentNode.replaceChild(oldGrillaDinamica, grillaDinamica);
        oldGrillaDinamica.addEventListener('click', handleCardClick);
    }

    // Initial update of quantities
    updateProductQuantityDisplays();
}

// Update quantity displays for all products
function updateProductQuantityDisplays() {
    const carrito = obtenerCarrito() || [];
    
    // Update all product cards
    document.querySelectorAll('.tarjeta-producto').forEach(card => {
        const productTitle = card.dataset.title;
        const quantityDisplay = card.querySelector('.quantity-display');
        if (quantityDisplay && productTitle) {
            const item = carrito.find(item => item.id === productTitle);
            quantityDisplay.textContent = item ? item.quantity : 0;
        }
    });
}

// Update the cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCountDisplay = document.querySelector('.cart-count');
    const totalAmountDisplay = document.querySelector('.total-amount');
    const carrito = obtenerCarrito() || [];
    const template = document.getElementById('cartItemTemplate');
    
    // Clear current items except the template
    while (cartItemsList.children.length > 1) {
        cartItemsList.removeChild(cartItemsList.lastChild);
    }

    let total = 0;
    let totalItems = 0;

    // Add each item to the cart
    carrito.forEach(item => {
        const clone = template.content.cloneNode(true);
        
        const nameElement = clone.querySelector('.item-name');
        const quantityElement = clone.querySelector('.quantity');
        const minusButton = clone.querySelector('.minus');
        const plusButton = clone.querySelector('.plus');

        nameElement.textContent = item.id;
        quantityElement.textContent = item.quantity;
        totalItems += item.quantity;
        total += item.quantity;

        // Add event listeners for + and - buttons
        minusButton.addEventListener('click', () => {
            const newQuantity = Math.max(item.quantity - 1, 0);
            if (newQuantity === 0) {
                quitarItemCarrito(item.id);
            } else {
                modificarCantidadCarrito(item.id, newQuantity);
            }
            updateProductQuantityDisplays();
            updateCartDisplay();
        });

        plusButton.addEventListener('click', () => {
            modificarCantidadCarrito(item.id, item.quantity + 1);
            updateProductQuantityDisplays();
            updateCartDisplay();
        });

        cartItemsList.appendChild(clone);
    });

    // Update total and cart count
    totalAmountDisplay.textContent = total;
    cartCountDisplay.textContent = totalItems;
}

function setupProductCardEventListeners() {
    // Get all product cards from both grids
    const grillaProductos = document.getElementById('grilla-productos');
    const grillaDinamica = document.getElementById('grilla-dinamica-productos');
    
    // Function to handle click events
    function handleCardClick(event) {
        const productCard = event.target.closest('.tarjeta-producto');
        if (!productCard) return;

        const productTitle = productCard.dataset.title;
        const quantityDisplay = productCard.querySelector('.quantity-display');
        
        if (event.target.classList.contains('plus')) {
            event.preventDefault();
            event.stopPropagation();
            
            if (quantityDisplay) {
                const currentQuantity = parseInt(quantityDisplay.textContent, 10) || 0;
                const newQuantity = currentQuantity + 1;
                agregarItemCarrito(productTitle, 1);
                updateCartDisplay();
                updateProductQuantityDisplays();
            }
        } else if (event.target.classList.contains('minus')) {
            event.preventDefault();
            event.stopPropagation();
            
            if (quantityDisplay) {
                const currentQuantity = parseInt(quantityDisplay.textContent, 10) || 0;
                if (currentQuantity > 0) {
                    const newQuantity = currentQuantity - 1;
                    if (newQuantity === 0) {
                        quitarItemCarrito(productTitle);
                    } else {
                        modificarCantidadCarrito(productTitle, newQuantity);
                    }
                    updateCartDisplay();
                    updateProductQuantityDisplays();
                }
            }
        }
    }

    // Remove any existing event listeners
    if (grillaProductos) {
        const oldGrilla = grillaProductos.cloneNode(true);
        grillaProductos.parentNode.replaceChild(oldGrilla, grillaProductos);
        oldGrilla.addEventListener('click', handleCardClick);
    }

    if (grillaDinamica) {
        const oldGrillaDinamica = grillaDinamica.cloneNode(true);
        grillaDinamica.parentNode.replaceChild(oldGrillaDinamica, grillaDinamica);
        oldGrillaDinamica.addEventListener('click', handleCardClick);
    }

    // Initial update of quantities
    updateProductQuantityDisplays();
    updateCartDisplay();
}

/////////// Asincronia y consumo de API Rest /////////// 

/* Asincronia y consumo de API Rest - 1
 * Utilización de fetch para obtener datos de una API
 * pública y mostrarlos en la sección main del HTML.
 */

/* Asincronia y consumo de API Rest - 2
 * Procesar los datos obtenidos de la API para
 * organizarlos en cards, aplicando Flexbox o Grid para
 * mantener la coherencia en el diseño.
 */
async function obtenerDatosAPIyMostrarEnMain() {
    console.log("Inicia ejecución obtenerDatosAPIyMostrarEnMain");
    const apiUrl = '/.netlify/functions/proxy';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);
        console.log('Data received from proxy:', data);
        const grillaProductos = document.getElementById('grilla-dinamica-productos');
        grillaProductos.innerHTML = ''; // Clear existing content
        
        // Actualizar el DOM
        if (data.geonames && Array.isArray(data.geonames)) {
            data.geonames.forEach(country => {
                var html = `<div class="tarjeta-producto" 
                    id="tarjeta-${country.countryName}" 
                    data-title="${country.countryName}"
                    style="background-image: url('./imgs/destinations/sin-imagen.jpg');">
                    <div class="tarjeta-contenido">
                        <h3>${country.countryName}</h3>
                        <p>${country.countryName}</p>
                        <div class="cart-controls">
                            <button class="quantity-btn minus">-</button>
                            <span class="quantity-display">0</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                </div>`;
                grillaProductos.innerHTML += html;
            });

            // Setup event listeners for dynamically created product cards
            setupProductCardEventListeners();
        } else {
            console.error("No se encontraron datos de geonames.");
            document.getElementById('destinos').innerHTML = "No se encontraron datos de geonames.";
        }

        return data; // Retorna los datos obtenidos
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
        document.getElementById('destinos').innerHTML = error.message;
    }
}

async function obtenerCardsPaisesYcargarFotos() {
    console.log("Inicia ejecución obtenerCardsPaisesYcargarFotos()");
    const grillaProductos = document.getElementsByClassName('grilla-productos');
    for(grilla of grillaProductos) {
        for(card of grilla.children) {
            var cardId = card.id;
            var countryName = card.id.split('-')[1];
            const apiUrl = `https://api.unsplash.com/search/collections?page=1&query=${countryName}&client_id=${UNSPLASH_API_KEY}`;
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                var img_url = data.results[0].cover_photo.urls.small;
                document.getElementById(cardId).style = `background-image: url('${img_url}'); `;
            } catch(e) {
                console.error("Hubo un error al procesar la solicitud: ", e);
            }
        }
    }
}

/////////// Carrito de compras ///////////

/* Debemos tener implementado un carrito de
 * compras que permita a los usuarios añadir
 * productos desde las cards, utilizando localStorage
 * y sessionStorage para almacenar la información
 * del carrito. 
 */

// Initialize cart panel functionality
function initializeCartPanel() {
    const cartButton = document.getElementById('cartButton');
    const cartPanel = document.getElementById('cartPanel');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartButton && cartPanel && closeCart) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            cartPanel.classList.add('active');
            updateCartDisplay(); // Update cart when opened
        });

        closeCart.addEventListener('click', function() {
            cartPanel.classList.remove('active');
        });

        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            if (cartPanel.classList.contains('active') && 
                !cartPanel.contains(event.target) && 
                !cartButton.contains(event.target)) {
                cartPanel.classList.remove('active');
            }
        });
    }
}

// Update the cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCountDisplay = document.querySelector('.cart-count');
    const totalAmountDisplay = document.querySelector('.total-amount');
    const carrito = obtenerCarrito() || [];
    const template = document.getElementById('cartItemTemplate');
    
    // Clear current items except the template
    while (cartItemsList.children.length > 1) {
        cartItemsList.removeChild(cartItemsList.lastChild);
    }

    let total = 0;
    let totalItems = 0;

    // Add each item to the cart
    carrito.forEach(item => {
        const clone = template.content.cloneNode(true);
        
        const nameElement = clone.querySelector('.item-name');
        const quantityElement = clone.querySelector('.quantity');
        const minusButton = clone.querySelector('.minus');
        const plusButton = clone.querySelector('.plus');

        nameElement.textContent = item.id;
        quantityElement.textContent = item.quantity;
        totalItems += item.quantity;
        total += item.quantity;

        // Add event listeners for + and - buttons
        minusButton.addEventListener('click', () => {
            const newQuantity = Math.max(item.quantity - 1, 0);
            if (newQuantity === 0) {
                quitarItemCarrito(item.id);
            } else {
                modificarCantidadCarrito(item.id, newQuantity);
            }
            updateProductQuantityDisplays();
            updateCartDisplay();
        });

        plusButton.addEventListener('click', () => {
            modificarCantidadCarrito(item.id, item.quantity + 1);
            updateProductQuantityDisplays();
            updateCartDisplay();
        });

        cartItemsList.appendChild(clone);
    });

    // Update total and cart count
    totalAmountDisplay.textContent = total;
    cartCountDisplay.textContent = totalItems;

    // Update product quantity displays
    updateProductQuantityDisplays();
}

// Agregar un ítem al carrito
function agregarItemCarrito(item, qty = 1) {
    const carrito = Array.isArray(obtenerCarrito()) ? obtenerCarrito() : [];

    if (typeof item === "string") {
        item = { id: item, quantity: qty };
    }

    const existingItem = carrito.find((carritoItem) => carritoItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        carrito.push({ id: item.id || item, quantity: qty });
    }
    
    guardarCarrito(carrito);
    updateCartDisplay();
}

// Modificar la cantidad de un ítem específico en el carrito
function modificarCantidadCarrito(itemId, nuevaCantidad) {
    const carrito = obtenerCarrito();
    const item = carrito.find((carritoItem) => carritoItem.id === itemId);

    if (item) {
        if (nuevaCantidad <= 0) {
            quitarItemCarrito(itemId);
        } else {
            item.quantity = nuevaCantidad;
            guardarCarrito(carrito);
        }
        updateCartDisplay();
    }
}

// Quitar un ítem del carrito
function quitarItemCarrito(itemId) {
    const carrito = obtenerCarrito();
    const updatedCarrito = carrito.filter((item) => item.id !== itemId);
    guardarCarrito(updatedCarrito);
    updateCartDisplay();
}

// Function to handle quantity changes from product cards
function modificarCantidadEnProducto(productId, change) {
    const carrito = obtenerCarrito() || [];
    const existingItem = carrito.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity + change <= 0) {
            quitarItemCarrito(productId);
        } else {
            modificarCantidadCarrito(productId, existingItem.quantity + change);
        }
    } else if (change > 0) {
        agregarItemCarrito(productId, 1);
    }

    // Update quantity displays
    updateProductQuantityDisplays();
}

// Función para obtener el carrito actual desde localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(CARRITO_COMPRAS_KEY));
}
  
// Función para guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_COMPRAS_KEY, JSON.stringify(carrito));
}

  
// Mostrar detalles de un ítem específico del carrito
function mostrarDetalleItemCarrito(itemId) {
    const carrito = obtenerCarrito();
    const item = carrito.find((carritoItem) => carritoItem.id === itemId);

    if (item) {
        console.log("Detalles del producto:", item);
    } else {
        console.log(`Producto con ID ${itemId} no encontrado en el carrito.`);
    }
}
  
// Mostrar todos los ítems del carrito
function mostrarItemsCarrito() {
    const carrito = obtenerCarrito();
    console.log("Productos en el carrito:", carrito);
}
