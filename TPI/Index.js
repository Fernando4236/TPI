// películas
const peliculas = [
    {
        imagen: "assets/ico/Fondos/Spiderman.webp",
        titulo: "Spider-Man: Brand New Day",
        sinopsis: "Cuatro años después de los acontecimientos de Spider-Man: No Way Home, nadie sabe ya quién es Peter Parker. Solo, anónimo y sin el apoyo de quienes habían formado parte de su vida, recorre las calles de Nueva York deteniendo delincuentes mientras colabora con la detective Jean DeWolff.",
        link: "Paginas/Peliculas/El hombre araña.html"
    },
    {
        imagen: "assets/ico/Fondos/LaOdisea.webp",
        titulo: "La Odisea",
        sinopsis: "Odiseo, el legendario rey de Ítaca, emprende un largo y peligroso viaje de regreso a casa tras la guerra de Troya. A lo largo de su travesía, se ve obligado a enfrentarse a los caprichos de los dioses, a monstruos mitológicos y a pruebas que ponen a prueba su astucia y su humanidad hasta el límite.",
        link: "Paginas/Peliculas/La odisea.html"
    },
    {
        imagen: "assets/ico/Fondos/ToyStory5.webp",
        titulo: "Toy Story 5",
        sinopsis: "Cuando Woody logra regresar con Buzz, Jessie y el resto de la pandilla, descubren una nueva amenaza: la tecnología. Un nuevo tiempo de juego para los niños.",
        link: "Paginas/Peliculas/Toy story 5.html"
    },
    {
        imagen: "assets/ico/Fondos/Backrooms.webp",
        titulo: "Backrooms",
        sinopsis: "Una extraña puerta aparece en el sótano de una exposición de muebles. Cuando el paciente de una terapeuta desaparece en una dimensión más allá de la realidad, ella deberá adentrarse en lo desconocido para salvarlo.",
        link: "Paginas/Peliculas/Backroom.html"
    },
    {
        imagen: "assets/ico/Fondos/Normal.webp",
        titulo: "Normal",
        sinopsis: "Ulysses es un sheriff sustituto que llega al tranquilo y apartado pueblo de Normal, Minnesota, huyendo de un pasado turbulento. Sin embargo, cuando el banco local es asaltado, su investigación desencadena una serie de eventos que revelan que el pueblo esconde una oscura y profunda red criminal.",
        link: "Paginas/Peliculas/Normal.html"
    }
];

let indiceActual = 0;
let contenedorFondo = null;
const tiempo = 8000; // 8 segundos
let intervalo;

//Función para actualizar la imagen y textos en el HTML
function actualizarFondo() {
    const actual = peliculas[indiceActual]; // Usa la variable peliculas

    if (contenedorFondo) {
        contenedorFondo.style.backgroundImage = `url('${actual.imagen}')`;
    }

    // Validar que existan los elementos en el HTML antes de cambiar su texto
    const tituloElem = document.getElementById("tituloFondo");
    const sinopsisElem = document.getElementById("sinopsisFondo");
    const btnVerMas = document.getElementById("btnVerMas");

    if (tituloElem) {
        tituloElem.textContent = actual.titulo;
    }
    if (sinopsisElem) {
        sinopsisElem.textContent = actual.sinopsis;
    }
    if (btnVerMas) {
        btnVerMas.href = actual.link;
    }
};



//Función global que ejecutan los botones 
function cambiarImg(direccion) {
    indiceActual += direccion;

    if (indiceActual >= peliculas.length) {
        indiceActual = 0;
    } else if (indiceActual < 0) {
        indiceActual = peliculas.length - 1;
    }
    actualizarFondo();
    reiniciarIntervalo();
};

//Controladores del temporizador
function inicioAutomatico() {
    intervalo = setInterval(() => {
        cambiarImg(1);
    }, tiempo);
};

function reiniciarIntervalo() {
    clearInterval(intervalo);
    inicioAutomatico();
};

// 5. Inicialización cuando el HTML termina de cargar
document.addEventListener("DOMContentLoaded", () => {
    contenedorFondo = document.querySelector(".fondo1");
    if (contenedorFondo) {
        actualizarFondo();
        inicioAutomatico();
    } else {
        console.error("No se encontró el elemento .fondo1 en el HTML");
    }

});








