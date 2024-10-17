const accessToken = localStorage.getItem('access_token');

fetch('https://back.confia.mosquedacordova.com/api/deposit?page=1', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  }
})
  .then(response => response.json())
  .then(data => {
    const noTransactionsMessage = document.getElementById('no-transactions-message');
    
    // Verifica si los datos fueron recibidos correctamente
    if (data.data && data.data.length > 0) {
      populateTransactionsTable(data.data);
      noTransactionsMessage.style.display = 'none'; // Ocultar mensaje si hay transacciones
    } else {
      noTransactionsMessage.style.display = 'block'; // Mostrar mensaje si no hay transacciones
      console.error('Aún no has comprado dólares 😔');
    }
  })
  .catch(error => {
    console.error('Error al obtener las transacciones:', error);
  });

function populateTransactionsTable(transactions) {
  const tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = ''; // Limpiar el contenido previo de la tabla

  transactions.forEach(transaction => {
    // Crear una fila para cada transacción
    const row = document.createElement('tr');

    // Columna de Monto
    const amountCell = document.createElement('td');
    amountCell.classList.add('pt-5');

    // Verificar si el monto es null o vacío
    const amountDisplay = transaction.monto ? `+$${transaction.monto}` : 'Por confirmar';
    amountCell.innerHTML = `<p class="mb-0 text-heading">${amountDisplay}</p>`;
    row.appendChild(amountCell);

    // Columna de Fecha
    const dateCell = document.createElement('td');
    dateCell.classList.add('pt-5');
    const date = new Date(transaction.created_at).toLocaleDateString(); // Convertir la fecha al formato deseado
    dateCell.innerHTML = `<small class="text-body text-nowrap">${date}</small>`;
    row.appendChild(dateCell);

    // Columna de Estado
    const statusCell = document.createElement('td');
    statusCell.classList.add('pt-5');

    // Determinar el estado y el estilo de la etiqueta
    let statusClass = '';
    let statusText = '';

    switch (transaction.status) {
      case 1: // Aprobado
        statusClass = 'bg-label-success';
        statusText = 'Aprobado';
        break;
      case 2: // Pendiente
        statusClass = 'bg-label-secondary';
        statusText = 'Pendiente';
        break;
      case 3: // Rechazado
        statusClass = 'bg-label-danger';
        statusText = 'Rechazado';
        break;
      default:
        statusClass = 'bg-label-secondary'; // Estado desconocido
        statusText = 'Desconocido';
    }

    statusCell.innerHTML = `<span class="badge ${statusClass}">${statusText}</span>`;
    row.appendChild(statusCell);

    // Agregar la fila a la tabla
    tableBody.appendChild(row);
  });
}

  
