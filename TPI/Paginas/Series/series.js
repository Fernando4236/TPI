function cambiarTemporada(numTemporada, botonSeleccionado) {
  // y esto sirve para quitarle la clase activa a la anterior que estaba seleccionada
  const botones = document.querySelectorAll('.btn-temporada');
  botones.forEach(boton => {
    boton.classList.remove('activa');
  });

  // esto le da una clase llamada activa al boton que el usuario presiono, que significa esto?
  // a cada boton de temporada digamos que esta desactivada, la unica que por defecto esta activa es la temporada 1
  // esto sirve cuando el usuario selecciona una serie y entra, por defecto la temporada 1 se va a ver
  // cuando el usuario hace click en la temporada 2 o 3 o 4, etc.
  // la temporada 1 se descativa y se activa la temporada que el usuario selecciono
  botonSeleccionado.classList.add('activa');

  // 3. Ocultar todos los grupos de episodios
  const todasLasTemporadas = document.querySelectorAll('.grupo-episodios');
  todasLasTemporadas.forEach(contenedor => {
    contenedor.classList.remove('activo');
  });

  // esto es muy importante porque muestra la temporada cuando el usuario hace click
  const temporadaElegida = document.getElementById('temporada-' + numTemporada);
  if (temporadaElegida) {
    temporadaElegida.classList.add('activo');
  }

  // Lo que hacemos aqui es actualizar el titulo
  const tituloActual = document.getElementById('titulo-temporada-actual');
  if (tituloActual) {
    tituloActual.textContent = 'Episodios - Temporada ' + numTemporada;
  }
}


// Lo que hacemos es que al hacer click en un episodio
// se abre la ventana del reproductor
function abrirReproductor(nombreCapitulo, urlVideo) {
  const modal = document.getElementById('modal-reproductor');
  const video = document.getElementById('video-player');
  const titulo = document.getElementById('titulo-reproduciendo');

  titulo.textContent = nombreCapitulo;
  if (urlVideo) {
    video.src = urlVideo;
    video.play();
  }

  modal.style.display = 'flex';
}

// menos mal porque era un bucle infinito, grecias por poner para ponerle pause y parar video
function cerrarReproductor() {
  const modal = document.getElementById('modal-reproductor');
  const video = document.getElementById('video-player');

  modal.style.display = 'none';
  video.pause();
  video.currentTime = 0; 
}

// esto no es necesario pero lo agregamos igual, porque se lo copiamos al profe el viernes
window.onclick = function(event) {
  const modal = document.getElementById('modal-reproductor');
  if (event.target === modal) {
    cerrarReproductor();
  }
};