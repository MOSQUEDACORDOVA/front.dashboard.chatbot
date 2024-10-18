document.getElementById('formAuthenticationLogin').addEventListener('submit', async function(event) {
  event.preventDefault();  // Evita el envío tradicional del formulario


  const password = document.getElementById('password').value.trim();
  const errorAlert = document.getElementById('errorAlert');

  //para auth con telefono
  //const phone = document.getElementById('phone').value.trim();
  //const phoneInput = document.getElementById('phone');
  //const phoneError = document.getElementById('phoneError');

  //para auth con email
  const email = document.getElementById('email').value.trim();
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  // Limpiar mensajes de error previos
  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';

  //para auth con telefono
  //phoneError.classList.add('d-none');
  //phoneError.classList.add('d-none');

  emailError.classList.add('d-none');
  emailError.classList.add('d-none');
  passwordError.classList.add('d-none');

  // Validar que los campos no estén vacíos
  let isValid = true;

  if (!email) {
    emailError.classList.remove('d-none');
    isValid = false;
  }

  /*if (!phone) {
    phoneError.classList.remove('d-none');
    isValid = false;
  } else if (phone.length < 9) {
    phoneError.textContent = 'El número de teléfono debe tener al menos 9 dígitos.';
    phoneError.classList.remove('d-none');
    isValid = false;
  }*/

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
    const response = await fetch('https://back.dashboard.chatbot.mosquedacordova.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      // Manejar el caso de que la respuesta no sea exitosa (4xx o 5xx)
      const data = await response.json();
      throw new Error(data.message || 'Datos inválidos');
    }

    const data = await response.json();

    if (data.access_token) {
      // Guardar el token en localStorage
      localStorage.setItem('access_token', data.access_token);
      
      // Guardar el nombre del usuario en localStorage (si la API lo devuelve)
      if (data.user && data.user.name && data.user.email) {
        //localStorage.setItem('full_name', data.user.full_name);
        //localStorage.setItem('phone', data.user.phone);

        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);

        // Redirigir al usuario al dashboard
        window.location.href = '/propiedades.html';  // Ajusta la ruta según tu configuración
      }else{
        alert("Tenemos un problema inesperado comunícante con soporte por favor.");
      }

      
    } else {
      throw new Error('Error: Datos inválidos');
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
