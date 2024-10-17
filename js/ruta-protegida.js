
  // Verificar si el usuario está autenticado
  function checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');
    const full_name = localStorage.getItem('full_name');
    const phone = localStorage.getItem('phone');
    
    if (!accessToken) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      window.location.href = 'auth-login-cover.html';  // Ajusta la ruta según tu configuración
    } else {
      console.log("Usuario:"+full_name);
      console.log("WhatsApp:"+phone);
    }
  }

  // Ejecutar la verificación al cargar la página
  window.onload = checkAuthentication;

