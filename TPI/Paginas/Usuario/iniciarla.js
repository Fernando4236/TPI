document.addEventListener('DOMContentLoaded', () => {
    const seccionLogin = document.getElementById('seccionLogin');
    const seccionPerfil = document.getElementById('seccionPerfil');
    const formLogin = document.getElementById('formLogin');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const navIniciarSesion = document.getElementById('navIniciarSesion');
    const navRegistrarse = document.getElementById('navRegistrarse');

    function checkEstado() {
        const sesion = localStorage.getItem('sesionIniciada') || localStorage.getItem('usuarioRegistrado');
        const sesionActiva = localStorage.getItem('sesionActiva') === 'true';

        if (sesion && sesionActiva) {
            const usuario = JSON.parse(sesion);
            seccionLogin.style.display = 'none';
            seccionPerfil.style.display = 'block';

            if (navIniciarSesion) navIniciarSesion.style.display = 'none';
            if (navRegistrarse) navRegistrarse.style.display = 'none';

            document.getElementById('perfilNombreCompleto').textContent = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim() || 'Usuario';
            document.getElementById('perfilUsername').textContent = usuario.username || 'usuario';
            document.getElementById('perfilCorreo').textContent = usuario.correo || 'correo@ejemplo.com';
            document.getElementById('perfilGenero').textContent = usuario.generoFavorito || 'No especificado';
        } else {
            seccionLogin.style.display = 'block';
            seccionPerfil.style.display = 'none';

            if (navIniciarSesion) navIniciarSesion.style.display = 'inline-block';
            if (navRegistrarse) navRegistrarse.style.display = 'flex';
        }
    }

    checkEstado();

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const identificador = document.getElementById('identificador').value.trim();
        const pass = document.getElementById('password').value;

        if (!identificador || !pass) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const datosGuardados = localStorage.getItem('usuarioRegistrado');

        if (!datosGuardados) {
            alert('No hay cuentas registradas. Por favor regístrate primero.');
            return;
        }

        const usuario = JSON.parse(datosGuardados);

        const matchUser = (usuario.username && identificador.toLowerCase() === usuario.username.toLowerCase()) ||
                          (usuario.correo && identificador.toLowerCase() === usuario.correo.toLowerCase());

        const matchPass = (!usuario.password || usuario.password === pass);

        if (matchUser && matchPass) {
            localStorage.setItem('sesionIniciada', JSON.stringify(usuario));
            localStorage.setItem('sesionActiva', 'true');
            formLogin.reset();
            checkEstado();
        } else {
            alert('Usuario, correo o contraseña incorrectos.');
        }
    });

    btnCerrarSesion.addEventListener('click', () => {
        if (confirm('¿Deseas cerrar tu sesión actual?')) {
            localStorage.removeItem('sesionIniciada');
            localStorage.removeItem('sesionActiva');
            checkEstado();
        }
    });
});

// modito oscurito
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