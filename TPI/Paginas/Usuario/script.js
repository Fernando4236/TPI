document.addEventListener('DOMContentLoaded', () => {
  const seccionRegistro = document.getElementById('seccionRegistro');
  const seccionPerfil = document.getElementById('seccionPerfil');
  const form = document.getElementById('formRegistro');
  const btnCerrarSesion = document.getElementById('btnCerrarSesion');

 
  function mostrarEstado() {
    const usuarioGuardado = localStorage.getItem('usuarioRegistrado');

    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      // el registro sale y muestra su propio perfil, no borrar poque queda en bucle
      seccionRegistro.style.display = 'none';
      seccionPerfil.style.display = 'block';

      // esto serian los datos del usuario
      document.getElementById('perfilNombreCompleto').textContent = `${usuario.nombre} ${usuario.apellido}`;
      document.getElementById('perfilUsername').textContent = usuario.username;
      document.getElementById('perfilCorreo').textContent = usuario.correo;
      document.getElementById('perfilGenero').textContent = usuario.generoFavorito;
    } else {
     
      seccionRegistro.style.display = 'block';
      seccionPerfil.style.display = 'none';
    }
  }

  // Comprobar al iniciar la página
  mostrarEstado();

  // aca empiezan los lios y el registro
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm_password').value;
    const terminos = document.getElementById('terminos').checked;

    if (pass !== confirmPass) {
      alert('Las contraseñas no son iguales.');
      return;
    }

    if (!terminos) {
      alert('Debes aceptar los terminos y condiciones.');
      return;
    }

    const nuevoUsuario = {
      nombre: document.getElementById('nombre').value.trim(),
      apellido: document.getElementById('apellido').value.trim(),
      username: document.getElementById('username').value.trim(),
      fechaNacimiento: document.getElementById('fecha_nac').value,
      correo: document.getElementById('correo').value.trim(),
      generoFavorito: document.getElementById('genero_fav').value
    };

    // Guardar en LocalStorage
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

    
    // no tocar ni modificar o corto los dedos. Esto cambia la vista y no recarga ni redirije a algun lado
    form.reset();
    mostrarEstado();
  });

  // este es simple si el usuario quiere cerrar la sesion borra la cuenta.
  // si llegamos metemos un inicio de sesion y un registro 
  btnCerrarSesion.addEventListener('click', () => {
    if (confirm('¿Estas seguro que quieres cerrar la sesion, super mega seguro? Tendrás que registrarte otra vez.')) {
      localStorage.removeItem('usuarioRegistrado');
      mostrarEstado();
    }
  });
});