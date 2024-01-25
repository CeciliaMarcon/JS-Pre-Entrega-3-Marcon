const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");

const productos = [
    {
        id: 1,
        nombre: "Short Mom Soho",
        descripcion: "Short confeccionado en denim.",
        precio: 10500,
        img: "img/modelo1.jpg",
    },
    {
        id: 2,
        nombre: "Vestido Helena",
        descripcion: "Vestido escote pico confeccionado en seda.",
        precio: 15500,
        img: "img/modelo2.jpg",
    },
    {
        id: 3,
        nombre: "Blusa Tina",
        descripcion: "Blusa cuello solapa confeccionada en lino rústico.",
        precio: 19500,
        img: "img/modelo3.jpg",
    },
    {
        id: 4,
        nombre: "Jean Bath",
        descripcion: "Jeans tiro alto confeccionado en denim elastizado.",
        precio: 16900,
        img: "img/modelo4.jpg",
    },
    
];

let carrito;


let carritoStorage = localStorage.getItem("carrito");

if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
} else {
    carrito = [];
    let div = document.createElement("div");
    div.innerHTML = "Carrito vacío";

    document.body.append(div);
}

function crearCard(producto) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text">Precio: $${producto.precio}</p>
            <button class="btn btn-primary agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
        </div>
    `;
    card.querySelector(".agregar-carrito").addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    return card;
}

const mostrarProductos = () => {
    productos.forEach((producto) => {
        contenedorProductos.innerHTML += `
            <div class="prod-container">
                <img src="${producto.img}" />
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <p>$${producto.precio}</p>
                <button id="${producto.id}" class="agregar">Agregar al carrito</button>
            </div>
        `;
    });

  
    document.querySelectorAll(".agregar").forEach((button) => {
        button.addEventListener("click", agregarAlCarrito);
    });
};

const agregarAlCarrito = (e) => {
    const id = e.target.id;
    const producto = productos.find((producto) => producto.id == id);
    carrito.push(producto);
    mostrarCarrito();
};

const mostrarCarrito = () => {
    const contenedorCarrito = document.getElementById("contenedor-carrito");
    contenedorCarrito.innerHTML = "<h2>Carrito:</h2>";
    carrito.forEach((producto) => {
        contenedorCarrito.innerHTML = `
            <p>${producto.nombre} \t $${producto.precio}</p>
        `;
    });

   
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

document.addEventListener("DOMContentLoaded", mostrarProductos);
