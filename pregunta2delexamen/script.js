function verificarRespuesta() {
    const respuestasSeleccionadas = document.querySelectorAll('input[name="respuesta"]:checked');
    if (respuestasSeleccionadas.length === 0) {
      alert('Por favor, selecciona al menos una respuesta.');
      return;
    }
  
    const respuestasCorrectas = ['1', '2']; // Suponiendo que las respuestas correctas son Roma y Milán
  
    const resultado = respuestasSeleccionadas.every(respuesta => respuestasCorrectas.includes(respuesta.value))
      ? '¡Correcto!.'
      : 'Respuesta incorrecta.';
  
    document.getElementById('resultado').textContent = resultado;
  }