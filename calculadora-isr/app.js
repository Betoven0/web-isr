const express = require('express');
const path = require('path'); // Módulo para manejar rutas
const app = express();
const port = 3000;

// Controladores (ajustar según tus archivos)
const isrController = require('./controllers/isrController');
const adminController = require('./controllers/adminController');

// Configurar el motor de vistas
app.set('view engine', 'ejs');

// Configurar la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Configurar carpeta de archivos estáticos (CSS, imágenes, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar datos enviados por formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas principales
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la vista principal (index.ejs)
});

app.post('/calcular', isrController.calcularISR);

// Rutas de administrador
app.get('/admin', adminController.mostrarAdmin);
app.post('/admin/add', adminController.agregarISR);
app.post('/admin/update', adminController.actualizarISR);
app.post('/admin/delete', adminController.eliminarISR);
app.post('/admin/update-formula', adminController.actualizarFormula);

// Manejar rutas no encontradas (opcional)
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
