// Importa el módulo HTTP nativo (sin dependencias externas)
const http = require('http');

// Crea el servidor y define la lógica de respuesta
const server = http.createServer((req, res) => {
  // Endpoint principal: usado para tests y readinessProbe
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ CI/CD Challenge 3 App Running!');
  } 
  // Respuesta por defecto para rutas inexistentes
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Define el puerto (usa variable de entorno o 8080 por defecto)
const PORT = process.env.PORT || 8080;

// Inicia el servidor y muestra un log al arrancar (visible en kubectl logs)
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});