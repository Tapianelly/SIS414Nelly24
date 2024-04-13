let usuarios = [];

const tablaUsuarios = document.getElementById('tablaUsuarios');
const formularioUsuario = document.getElementById('formularioUsuario');
const modalUsuario = document.getElementById('modalUsuario');
const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const fotoInput = document.getElementById('foto');
const idUsuarioInput = document.getElementById('idUsuario');


function crearUsuario() {
  idUsuarioInput.value = '';
  nombreInput.value = '';
  descripcionInput.value = '';
  fotoInput.value = '';
  modalUsuario.style.display = 'block';
}

function guardarUsuario() {
  const idUsuario = idUsuarioInput.value.trim();
  const nombre = nombreInput.value.trim();
  const descripcion = descripcionInput.value.trim();
  //conexion para subir foto
  const foto = fotoInput.files[0];

  if (idUsuario === '' || nombre === '' || descripcion === '' || !foto) {
    alert('Todos los campos son obligatorios');
    return;
  }

  const usuario = {
    id: parseInt(idUsuario),
    nombre,
    descripcion,
    foto
  };

  const index = usuarios.findIndex(u => u.id === usuario.id);
  if (index !== -1) {
    usuarios[index] = usuario;
  } else {
    usuarios.push(usuario);
  }

  actualizarTablaUsuarios();
  modalUsuario.style.display = 'none';
}

function cancelarModal() {
  modalUsuario.style.display = 'none';
}

function actualizarTablaUsuarios() {
  tablaUsuarios.innerHTML = `
    <thead>
      <tr>
        <th>Num</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Foto</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
    ${usuarios.map(usuario => `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.descripcion}</td>
        <td><img src="${URL.createObjectURL(usuario.foto)}" alt="Foto de perfil" style="max-width: 100px;"></td>
        <td>
          <button onclick="editarUsuario(${usuario.id})">Editar</button>
          <button onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </td>
      </tr>
    `).join('')}
    </tbody>
  `;
}

function eliminarUsuario(idUsuario) {
  const index = usuarios.findIndex(u => u.id === idUsuario);
  if (index !== -1) {
    usuarios.splice(index, 1);
    actualizarTablaUsuarios();
  }
}

function editarUsuario(idUsuario) {
  const usuario = usuarios.find(u => u.id === idUsuario);
  if (usuario) {
    idUsuarioInput.value = usuario.id;
    nombreInput.value = usuario.nombre;
    descripcionInput.value = usuario.descripcion;
    modalUsuario.style.display = 'block';
  }
}

function guardarUsuarios() {
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function cargarUsuarios() {
  const usuariosGuardados = localStorage.getItem('usuarios');
  if (usuariosGuardados) {
    usuarios = JSON.parse(usuariosGuardados);
  }
}
  