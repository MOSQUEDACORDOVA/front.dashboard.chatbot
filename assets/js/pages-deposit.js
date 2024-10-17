document.getElementById('formOperation').addEventListener('submit', async function(event) {
  event.preventDefault();  // Evita el envío tradicional del formulario

  const operation = document.getElementById('operation').value.trim();
  
  const errorAlert = document.getElementById('errorAlert');
  const operationError = document.getElementById('operationError');
  
  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  // Limpiar mensajes de error previos
  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';

  // Validar que los campos no estén vacíos
  let isValid = true;

  if (!operation) { alert();
    operationError.classList.remove('d-none');
    isValid = false;
  } else if (operation.length < 3) { 
    operationError.textContent = 'Ingrese un número de operación valido.';
    operationError.classList.remove('d-none');
    isValid = false;
  }

  if (!isValid) {
    return;  // Si hay campos vacíos o inválidos, no proceder
  }

  // Deshabilitar el botón y mostrar spinner
  loginButton.disabled = true;
  loginButtonText.classList.add('d-none');
  loginSpinner.classList.remove('d-none');

  try {
    // Obtener el token de acceso desde localStorage
    const accessToken = localStorage.getItem('access_token');
    // Hacer la solicitud de login
    const response = await fetch('https://back.confia.mosquedacordova.com/api/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`  // Incluir el token en el encabezado
      },
      body: JSON.stringify({
        operation: operation
      })
    });

    if (!response.ok) {
      // Manejar el caso de que la respuesta no sea exitosa (4xx o 5xx)
      throw new Error( 'Perdona, no podemos procesar tu información.');
    }

    if (response.status === 201) {
      // Guardar el número de operación en localStorage
      localStorage.setItem('operation', operation);

      // Redirigir al usuario 
      window.location.href = '/nuevo-deposito.html'; 
    } else {
      throw new Error('Perdona, no podemos procesar tu información.');
    }

  } catch (error) {
    // Mostrar el mensaje de error al usuario
    showError(error.message);
  } finally {
    // Habilitar el botón y ocultar spinner
    loginButton.disabled = false;
    loginButtonText.classList.remove('d-none');
    loginSpinner.classList.add('d-none');
  }

  // Función para mostrar mensajes de error
  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');  // Mostrar la alerta de error
  }
});
