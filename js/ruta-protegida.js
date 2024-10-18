
  // Verificar si el usuario está autenticado
  function checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    
    if (!accessToken) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      window.location.href = 'auth-login-cover.html';  // Ajusta la ruta según tu configuración
    } else {
      console.log("Nombre:"+name);
      console.log("Email:"+email);
    }
  }

  // Ejecutar la verificación al cargar la página
  window.onload = checkAuthentication;

