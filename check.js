// Cambia este texto por la URL real que te dio Google al implementar tu Apps Script
const URL_API = 'https://script.google.com/macros/s/AKfycby0meMISQL5_gheWm_fjPv51ddoe5ejnd13FrdOy9YVbDWhTclteGMF4jKSwZ-sLUHvHw/exec';

// Referencias a los elementos del DOM
const btnBuscar = document.getElementById('btn-buscar');
const inputBusqueda = document.getElementById('input-busqueda');
const contenedorResultados = document.getElementById('resultados-busqueda');
const pasoBusqueda = document.getElementById('paso-busqueda');
const pasoConfirmacion = document.getElementById('paso-confirmacion');
const formRsvp = document.getElementById('form-rsvp');
const selectPases = document.getElementById('select-pases');
const seccionPases = document.getElementById('seccion-pases');
const btnEnviar = document.getElementById('btn-enviar');

// =================================================================
// Flujo 1: Búsqueda del invitado por Nombre, Grupo o Código
// =================================================================
btnBuscar.addEventListener('click', ejecutarBusqueda);
inputBusqueda.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') ejecutarBusqueda();
});

function ejecutarBusqueda() {
  const query = inputBusqueda.value.trim().toLowerCase();
  
  if (query.length < 2) {
    alert('Por favor, escribe al menos 2 caracteres de tu nombre o el código de tu invitación.');
    return;
  }

  contenedorResultados.innerHTML = '<p class="loading">Buscando en la lista de invitados...</p>';

  fetch(`${URL_API}?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      contenedorResultados.innerHTML = '';
      
      // Si el backend no devuelve registros, significa que no existe o ya confirmó
      if (data.length === 0) {
        contenedorResultados.innerHTML = `
          <div class="no-results">
            <p>No encontramos invitaciones pendientes con esos datos.</p>
            <small>Si ya confirmaste anteriormente, tu registro ya se encuentra guardado de forma segura.</small>
          </div>`;
        return;
      }
      
      // Renderizar los resultados encontrados
      data.forEach(invitado => {
        const div = document.createElement('div');
        div.className = 'item-resultado';
        div.innerHTML = `
          <div class="invitado-info">
            <strong>${invitado.nombre}</strong>
            <span>${invitado.grupo}</span>
          </div>
          <span class="btn-select">Seleccionar</span>
        `;
        div.onclick = () => abrirFormularioConfirmacion(invitado);
        contenedorResultados.appendChild(div);
      });
    })
    .catch(err => {
      contenedorResultados.innerHTML = '<p class="error">Ocurrió un error al conectar con el sistema. Inténtalo de nuevo.</p>';
      console.error('Error en la búsqueda:', err);
    });
}

// =================================================================
// Flujo 2: Despliegue y personalización del formulario de pases
// =================================================================
function abrirFormularioConfirmacion(invitado) {
  // Animación / Cambio de pantalla
  pasoBusqueda.style.display = 'none';
  pasoConfirmacion.style.display = 'block';
  
  // Setear textos personalizados e inyectar la fila correspondiente
  document.getElementById('txt-familia').innerText = invitado.grupo;
  document.getElementById('txt-invitado-principal').innerText = `Hola ${invitado.nombre}, gestiona tus pases aquí:`;
  document.getElementById('input-fila').value = invitado.fila;

  // Limpiar y llenar el selector con el número estricto de pases asignados
  selectPases.innerHTML = '';
  const maxPases = parseInt(invitado.pases) || 1; 
  
  for (let i = 1; i <= maxPases; i++) {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = `${i} ${i === 1 ? 'Persona' : 'Personas'}`;
    selectPases.appendChild(opt);
  }

  // Ocultar la sección de cuántos van si marcan que "No asistirán"
  const radiosAsistencia = document.getElementsByName('asistira');
  radiosAsistencia.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'No') {
        seccionPases.style.display = 'none';
      } else {
        seccionPases.style.display = 'block';
      }
    });
  });
}

// =================================================================
// Flujo 3: Envío de datos al Google Sheet
// =================================================================
formRsvp.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const seleccionAsistencia = document.querySelector('input[name="asistira"]:checked').value;
  
  const datosEnvio = {
    fila: document.getElementById('input-fila').value,
    asistira: seleccionAsistencia,
    // Si no asiste, guardamos automáticamente 0 pases ocupados
    pasesConfirmados: seleccionAsistencia === 'No' ? 0 : selectPases.value
  };

  btnEnviar.innerText = 'Guardando confirmación...';
  btnEnviar.disabled = true;

  // Ejecución del POST hacia Google Sheets
  fetch(URL_API, {
    method: 'POST',
    mode: 'no-cors', // Evita bloqueos de CORS en servidores estáticos como GitHub Pages
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosEnvio)
  })
  .then(() => {
    // Éxito visual
    pasoConfirmacion.style.display = 'none';
    const msgFinal = document.getElementById('mensaje-final');
    msgFinal.style.display = 'block';
    msgFinal.innerHTML = `
      <div class="success-box">
        <h3>¡Tu asistencia ha sido registrada!</h3>
        <p>Gracias por actualizar tus datos. Nos vemos muy pronto en este gran día.</p>
      </div>`;
  })
  .catch(err => {
    alert('Tuvimos un problema al guardar tu respuesta. Por favor, inténtalo de nuevo.');
    btnEnviar.innerText = 'Confirmar mi lugar';
    btnEnviar.disabled = false;
    console.error('Error al guardar:', err);
  });
});