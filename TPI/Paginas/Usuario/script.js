document.addEventListener('DOMContentLoaded', () => {
  const seccionRegistro = document.getElementById('seccionRegistro');
  const seccionPerfil = document.getElementById('seccionPerfil');
  const form = document.getElementById('formRegistro');
  const navIniciarSesion = document.getElementById('navIniciarSesion');
  const navRegistrarse = document.getElementById('navRegistrarse');
  const btnCerrarSesion = document.getElementById('btnCerrarSesion');
  const btnEliminarCuenta = document.getElementById('btnEliminarCuenta');

  function mostrarEstado() {
    const usuarioGuardado = localStorage.getItem('usuarioRegistrado');
    const sesionIniciada = localStorage.getItem('sesionActiva');

    if (usuarioGuardado && sesionIniciada === 'true') {
      const usuario = JSON.parse(usuarioGuardado);

      seccionRegistro.style.display = 'none';
      seccionPerfil.style.display = 'block';

      if (navIniciarSesion) navIniciarSesion.style.display = 'none';
      if (navRegistrarse) navRegistrarse.style.display = 'none';

      const nombreCompleto = usuario.apellido ? `${usuario.nombre} ${usuario.apellido}` : usuario.nombre;
      document.getElementById('perfilNombreCompleto').textContent = nombreCompleto;
      document.getElementById('perfilUsername').textContent = usuario.username;
      document.getElementById('perfilCorreo').textContent = usuario.correo;
      document.getElementById('perfilGenero').textContent = usuario.generoFavorito;
    } else {
      seccionRegistro.style.display = 'block';
      seccionPerfil.style.display = 'none';

      if (navIniciarSesion) navIniciarSesion.style.display = 'inline-block';
      if (navRegistrarse) navRegistrarse.style.display = 'flex';
    }
  }

  mostrarEstado();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const username = document.getElementById('username').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm_password').value;
    const terminos = document.getElementById('terminos').checked;

    if (!nombre) return alert('El nombre es obligatorio.');
    if (!username) return alert('El apodo (nombre de usuario) es obligatorio.');
    if (!correo) return alert('El correo electrónico es obligatorio.');
    if (pass.length < 4) return alert('La contraseña debe tener un mínimo de 4 caracteres.');
    if (pass !== confirmPass) return alert('Las contraseñas no coinciden.');
    if (!terminos) return alert('Debes aceptar los términos y condiciones.');

    const nuevoUsuario = {
      nombre: nombre,
      apellido: apellido,
      username: username,
      fechaNacimiento: document.getElementById('fecha_nac').value,
      correo: correo,
      generoFavorito: document.getElementById('genero_fav').value
    };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    localStorage.setItem('sesionActiva', 'true');

    form.reset();
    mostrarEstado();
  });

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
      if (confirm('¿Quieres cerrar sesión?')) {
        localStorage.removeItem('sesionActiva');
        localStorage.removeItem('sesionIniciada');
        mostrarEstado();
      }
    });
  }

  if (btnEliminarCuenta) {
    btnEliminarCuenta.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer y tendrás que registrarte otra vez.')) {
        localStorage.removeItem('usuarioRegistrado');
        localStorage.removeItem('sesionActiva');
        localStorage.removeItem('sesionIniciada');
        mostrarEstado();
      }
    });
  }
});

// aca empieza el modo oscurito
const toggleDarkMode = document.getElementById('toggleDarkMode');

function aplicarModoOscuro(activado) {
  if (activado) {
    document.body.classList.add('dark-mode');
    if (toggleDarkMode) toggleDarkMode.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    if (toggleDarkMode) toggleDarkMode.checked = false;
  }
}

aplicarModoOscuro(localStorage.getItem('modoOscuro') === 'true');

if (toggleDarkMode) {
  toggleDarkMode.addEventListener('change', () => {
    aplicarModoOscuro(toggleDarkMode.checked);
    localStorage.setItem('modoOscuro', toggleDarkMode.checked ? 'true' : 'false');
  });
}

window.addEventListener('storage', (e) => {
  if (e.key === 'modoOscuro') {
    aplicarModoOscuro(e.newValue === 'true');
  }
});