const connection = require('../db');

// Otras funciones de `isrModel.js`
const getISR = (pais_id, periodo_id, callback) => {
    const query = 'SELECT * FROM isr_info WHERE pais_id = ? AND periodo_id = ?';
    connection.query(query, [pais_id, periodo_id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
};

const listISR = (callback) => {
  const query = 'SELECT isr_info.id, paises.nombre AS pais, periodos.nombre AS periodo, isr_info.calculo_isr ' +
                'FROM isr_info ' +
                'JOIN paises ON isr_info.pais_id = paises.id ' +
                'JOIN periodos ON isr_info.periodo_id = periodos.id';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const addISR = (pais_id, periodo_id, calculo_isr, callback) => {
  const query = 'INSERT INTO isr_info (pais_id, periodo_id, calculo_isr) VALUES (?, ?, ?)';
  connection.query(query, [pais_id, periodo_id, calculo_isr], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const updateISR = (id, pais_id, periodo_id, calculo_isr, callback) => {
    const query = 'UPDATE isr_info SET pais_id = ?, periodo_id = ?, calculo_isr = ? WHERE id = ?';
    connection.query(query, [pais_id, periodo_id, calculo_isr, id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, results);
    });
};



const deleteISR = (id, callback) => {
  const query = 'DELETE FROM isr_info WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

// Nueva función para obtener la fórmula
const getFormula = (callback) => {
  const query = 'SELECT formula FROM config_isr WHERE id = 1';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results[0].formula);
  });
};

// Nueva función para actualizar la fórmula
const updateFormula = (newFormula, callback) => {
  const query = 'UPDATE config_isr SET formula = ? WHERE id = 1';
  connection.query(query, [newFormula], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

module.exports = {
  getISR,
  listISR,
  addISR,
  updateISR,
  deleteISR,
  getFormula,
  updateFormula
};
