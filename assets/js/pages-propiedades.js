$(document).ready(function() {
  $('#agregarPropiedad').on('click', function() {
    
    // Cambiar el texto del botón
    $('#loginButtonText').text('Agregar');
    $('#offcanvasEndLabel').text('Agregar Nueva Propiedad');

    // Restablecer el formulario y el modo de edición
    $('#formPropiedad')[0].reset();
    isEditMode = false; // Resetear a modo creación

  });
});

document.getElementById('formPropiedad').addEventListener('submit', async function(event) {
  event.preventDefault();  // Evita el envío tradicional del formulario

  const owner = document.getElementById('owner').value.trim();
  const property_code = document.getElementById('property_code').value.trim();

  const errorAlert = document.getElementById('errorAlert');
  const ownerError = document.getElementById('ownerError');
  const property_codeError = document.getElementById('property_codeError');

  const loginButton = document.getElementById('loginButton');
  const loginButtonText = document.getElementById('loginButtonText');
  const loginSpinner = document.getElementById('loginSpinner');

  const offcanvasEnd = document.getElementById('offcanvasEnd');
  const backdropOffcanvasEnd = document.getElementsByClassName('offcanvas-backdrop')[0];

  // Limpiar mensajes de error previos
  errorAlert.classList.add('d-none');
  errorAlert.textContent = '';
  ownerError.classList.add('d-none');
  property_codeError.classList.add('d-none');

  // Validar que los campos no estén vacíos
  let isValid = true;

  if (!owner) {
    ownerError.classList.remove('d-none');
    isValid = false;
  } else if (owner.length < 1) {
    ownerError.textContent = 'El Owner no debe estar vacío.';
    ownerError.classList.remove('d-none');
    isValid = false;
  }

  if (!property_code) {
    property_codeError.classList.remove('d-none');
    isValid = false;
  } else if (property_code.length < 4) {
    property_codeError.textContent = 'El nombre no debe estar vacío.';
    property_codeError.classList.remove('d-none');
    isValid = false;
  }

  if (!isValid) {
    return;  // Si hay campos vacíos o inválidos, no proceder
  }

  // Deshabilitar el botón y mostrar spinner
  loginButton.disabled = true;
  loginButtonText.classList.add('d-none');
  loginSpinner.classList.remove('d-none');

  const newData = {
    owner: $('#owner').val(),
    property_code: $('#property_code').val(),
    type_of_property: $('#type_of_property').val(),
    physical_address: $('#physical_address').val(),
    building_complex: $('#building_complex').val(),
    town: $('#town').val(),
    map: $('#map').val(),
    bedrooms: $('#bedrooms').val(),
    bathrooms: $('#bathrooms').val(),
    king_bed: $('#king_bed').val(),
    queen_bed: $('#queen_bed').val(),
    twin_bed: $('#twin_bed').val(),
    sofa_bed: $('#sofa_bed').val(),
    access_information: $('#access_information').val(),
    cleaning_instructions: $('#cleaning_instructions').val(),
    inspection_instructions: $('#inspection_instructions').val(),
    maintenance_instructions: $('#maintenance_instructions').val(),
    owner_closet: $('#owner_closet').val(),
    documents: $('#documents').val(),
    payment_hskp: $('#payment_hskp').val(),
    client_charge: $('#client_charge').val(),
};

  if (isEditMode) {
    try {
      // Hacer la solicitud de login
      const response = await fetch(`https://back.dashboard.chatbot.mosquedacordova.com/api/property/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Reemplaza accessToken con el token real
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
  
      if (!response.ok) {
        // Manejar el caso de que la respuesta no sea exitosa (4xx o 5xx)
        const data = await response.json();
        throw new Error(data.message || 'Datos inválidos o información duplicada');
      }
  
      if (response.status === 200) {
        // Si la inserción es exitosa, cerrar el offcanvas
        offcanvasEnd.classList.remove('show');
        backdropOffcanvasEnd.classList.remove('show');
        document.getElementById('showToastAnimation').click();

        const updatedRow = document.querySelector(`tr[data-property-id="${propertyId}"]`);
        
        // Actualiza cada campo en la fila
        updatedRow.querySelector('td:nth-child(1)').innerText = owner; // Actualiza el owner
        updatedRow.querySelector('td:nth-child(2)').innerText = property_code; // Actualiza el property code
        updatedRow.querySelector('td:nth-child(3)').innerText = newData.type_of_property; // Actualiza el tipo de propiedad
        updatedRow.querySelector('td:nth-child(4)').innerText = newData.physical_address; // Actualiza la dirección física
        updatedRow.querySelector('td:nth-child(5)').innerText = newData.building_complex; // Actualiza el complejo de edificios
        updatedRow.querySelector('td:nth-child(6)').innerText = newData.town; // Actualiza el pueblo
        updatedRow.querySelector('td:nth-child(7)').innerText = newData.map; 
        updatedRow.querySelector('td:nth-child(8)').innerText = newData.bedrooms; // Actualiza el número de dormitorios
        updatedRow.querySelector('td:nth-child(9)').innerText = newData.bathrooms; // Actualiza el número de baños
        updatedRow.querySelector('td:nth-child(10)').innerText = newData.king_bed; // Actualiza el número de camas king
        updatedRow.querySelector('td:nth-child(11)').innerText = newData.queen_bed; // Actualiza el número de camas queen
        updatedRow.querySelector('td:nth-child(12)').innerText = newData.twin_bed; // Actualiza el número de camas twin
        updatedRow.querySelector('td:nth-child(13)').innerText = newData.sofa_bed; // Actualiza el número de camas sofa
        updatedRow.querySelector('td:nth-child(14)').innerText = newData.access_information; // Actualiza la información de acceso
        updatedRow.querySelector('td:nth-child(15)').innerText = newData.cleaning_instructions; // Actualiza las instrucciones de limpieza
        updatedRow.querySelector('td:nth-child(16)').innerText = newData.inspection_instructions; // Actualiza las instrucciones de inspección
        updatedRow.querySelector('td:nth-child(17)').innerText = newData.maintenance_instructions; // Actualiza las instrucciones de mantenimiento
        updatedRow.querySelector('td:nth-child(18)').innerText = newData.owner_closet; // Actualiza el closet del propietario
        updatedRow.querySelector('td:nth-child(19)').innerText = newData.documents; // Actualiza los documentos
        updatedRow.querySelector('td:nth-child(20)').innerText = newData.payment_hskp; // Actualiza la información de pago
        updatedRow.querySelector('td:nth-child(21)').innerText = newData.client_charge; // Actualiza el cargo del cliente
                
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
  }else{
    try {
      // Hacer la solicitud de login
      const response = await fetch('https://back.dashboard.chatbot.mosquedacordova.com/api/create/property', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Reemplaza accessToken con el token real
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
  
      if (!response.ok) {
        // Manejar el caso de que la respuesta no sea exitosa (4xx o 5xx)
        const data = await response.json();
        throw new Error(data.message || 'Datos inválidos o información duplicada');
      }
  
      if (response.status === 201) {
        // Si la inserción es exitosa, cerrar el offcanvas
        offcanvasEnd.classList.remove('show');
        backdropOffcanvasEnd.classList.remove('show');
        document.getElementById('showToastAnimation').click();
        
  
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
  }

  

  // Función para mostrar mensajes de error
  function showError(message) {
    errorAlert.textContent = message;
    errorAlert.classList.remove('d-none');  // Mostrar la alerta de error
  }
});
