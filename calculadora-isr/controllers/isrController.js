const isrModel = require('../models/isrModel');

const calcularISR = (req, res) => {
  let { pais, periodo, sueldo } = req.body;
  sueldo = parseFloat(sueldo);  // Convertir sueldo a número

  if (isNaN(sueldo)) {
    return res.render('index', { error: 'Por favor, ingrese un sueldo válido.' });
  }

  isrModel.getISR(pais, periodo, (err, results) => {
    if (err) {
      console.error('Error obteniendo datos:', err.stack);
      return res.status(500).send('Error en el servidor');
    }

    if (results.length > 0) {
      const tasaISR = results[0].calculo_isr;
      const isr = sueldo * (tasaISR / 100);
      const sueldoNeto = sueldo - isr;
      res.render('index', { sueldoBruto: sueldo.toFixed(2), isr: isr.toFixed(2), sueldoNeto: sueldoNeto.toFixed(2) });
    } else {
      res.render('index', { error: 'No se encontró información para el país y periodo seleccionados.' });
    }
  });
};

module.exports = {
  calcularISR
};






