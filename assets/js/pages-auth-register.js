document.getElementById('formAuthenticationRegister').addEventListener('submit', async function(event) {
  event.preventDefault();  // Evita el envío tradicional del formulario

  const operation = document.getElementById('operation').value.trim();
  const full_name = document.getElementById('full-name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();
  
  const errorAlert = document.getElementById('errorAlert');
  const operationError = document.getElementById('operationError');
  const fullNameError = document.getElementById('fullNameError');
  const phoneError = document.getElementById('phoneError');
  const passwordError = document.getElementById('passwordError');
  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  // Limpiar mensajes de error previos
  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';
  phoneError.classList.add('d-none');
  passwordError.classList.add('d-none');

  // Validar que los campos no estén vacíos
  let isValid = true;

  if (!operation) {
    operationError.classList.remove('d-none');
    isValid = false;
  } else if (operation.length < 1) {
    operationError.textContent = 'El número de operación no debe estar vacío.';
    operationError.classList.remove('d-none');
    isValid = false;
  }

  if (!full_name) {
    fullNameError.classList.remove('d-none');
    isValid = false;
  } else if (full_name.length < 4) {
    fullNameError.textContent = 'El nombre no debe estar vacío.';
    fullNameError.classList.remove('d-none');
    isValid = false;
  }

  if (!phone) {
    phoneError.classList.remove('d-none');
    isValid = false;
  } else if (phone.length < 9) {
    phoneError.textContent = 'El número de teléfono debe tener al menos 9 dígitos.';
    phoneError.classList.remove('d-none');
    isValid = false;
  }

  if (!password) {
    passwordError.classList.remove('d-none');
    isValid = false;
  } else if (password.length < 4) {
    passwordError.textContent = 'La contraseña debe tener al menos 4 caracteres.';
    passwordError.classList.remove('d-none');
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
    // Hacer la solicitud de login
    const response = await fetch('https://back.confia.mosquedacordova.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name:full_name,
        phone: phone,
        password: password,
        password_confirmation:password,
        operation: operation
      })
    });

    if (!response.ok) {
      // Manejar el caso de que la respuesta no sea exitosa (4xx o 5xx)
      const data = await response.json();
      throw new Error(data.message || 'Datos inválidos o información duplicada');
    }

    if (response.status === 201) {
      // Guardar el número de operación en localStorage
      localStorage.setItem('operation', operation);

      // Redirigir al usuario 
      window.location.href = '/nuevo-deposito.html'; 
    } else {
      throw new Error('Error de conexión o Datos inválidos');
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
