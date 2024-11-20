const express = require('express');
const app = express();
const port = 3000;
const isrController = require('./controllers/isrController');
const adminController = require('./controllers/adminController');
const router = express.Router();
const connection = require('./db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

// Middleware para manejar solicitudes urlencoded (formulario POST)
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar solicitudes JSON (si es necesario para otras partes de tu app)
app.use(express.json());
// Ruta para actualizar ISR
router.post('/admin/update', adminController.actualizarISR);

app.post('/calcular', isrController.calcularISR);

app.get('/admin', adminController.mostrarAdmin);
app.post('/admin/add', adminController.agregarISR);
app.post('/admin/update', adminController.actualizarISR);
app.post('/admin/delete', adminController.eliminarISR);
app.post('/admin/update-formula', adminController.actualizarFormula); // Nueva ruta para actualizar fórmula

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
