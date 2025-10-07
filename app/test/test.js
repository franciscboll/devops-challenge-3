// Importa el módulo HTTP y el servidor definido en index.js
const http = require('http');
require('./index'); // Levanta el servidor en 8080

// Espera un segundo para asegurarse de que el servidor esté corriendo
setTimeout(() => {
  // Crea una petición GET al endpoint raíz "/"
  const req = http.request({ hostname: 'localhost', port: 8080, path: '/', method: 'GET' }, res => {
    
    // Muestra el código de estado recibido
    console.log(`Response status code: ${res.statusCode}`);

    // Si responde 200, el test pasa
    if (res.statusCode === 200) {
      console.log('✅ Test passed!');
      process.exit(0);
    } else {
      // Si no, falla y detiene el pipeline
      console.error('❌ Test failed!');
      process.exit(1);
    }
  });

  // Captura errores de conexión
  req.on('error', err => {
    console.error('❌ Test failed:', err.message);
    process.exit(1);
  });

  req.end();
}, 1000);