const isrModel = require('../models/isrModel');

const mostrarAdmin = (req, res) => {
  isrModel.listISR((err, results) => {
    if (err) {
      console.error('Error obteniendo datos:', err.stack);
      return res.status(500).send('Error en el servidor');
    }
    isrModel.getFormula((err, formula) => {
      if (err) {
        console.error('Error obteniendo fórmula:', err.stack);
        return res.status(500).send('Error en el servidor');
      }
      res.render('admin', { isrs: results, formula });
    });
  });
};

const agregarISR = (req, res) => {
  const { pais, periodo, calculo_isr } = req.body;

  isrModel.addISR(pais, periodo, calculo_isr, (err, results) => {
    if (err) {
      console.error('Error agregando datos:', err.stack);
      return res.status(500).send('Error en el servidor');
    }
    res.redirect('/admin');
  });
};

const actualizarISR = (req, res) => {
    const { id, pais, periodo, calculo_isr } = req.body;

    console.log('Datos recibidos en actualizarISR:', req.body); // Verifica los datos recibidos

    if (!id || !pais || !periodo || !calculo_isr) {
        console.error('Datos incompletos:', req.body);
        return res.status(400).send('Datos incompletos');
    }

    isrModel.updateISR(id, pais, periodo, calculo_isr, (err, results) => {
        if (err) {
            console.error('Error actualizando datos:', err.stack);
            return res.status(500).send('Error en el servidor');
        }
        res.redirect('/admin');
    });
};

const eliminarISR = (req, res) => {
  const { id } = req.body;

  isrModel.deleteISR(id, (err, results) => {
    if (err) {
      console.error('Error eliminando datos:', err.stack);
      return res.status(500).send('Error en el servidor');
    }
    res.redirect('/admin');
  });
};

// Nueva función para actualizar la fórmula
const actualizarFormula = (req, res) => {
  const { formula } = req.body;

  isrModel.updateFormula(formula, (err, results) => {
    if (err) {
      console.error('Error actualizando fórmula:', err.stack);
      return res.status(500).send('Error en el servidor');
    }
    res.redirect('/admin');
  });
};

module.exports = {
  mostrarAdmin,
  agregarISR,
  actualizarISR,
  eliminarISR,
  actualizarFormula
};
