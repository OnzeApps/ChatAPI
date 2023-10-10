const { database } = require('../../database/database');

const usuarios = async (req, res) => {
  
  try {
    
    const db = database();
    
    db.all('SELECT name, id FROM usuarios', [], function(error, row) {
      return res.status(200).json(row);
    });
    
    
  } catch(error) {
    
    return res.status(400).json({
      success: false,
      message: error.message
    });
    
  }
  
}

module.exports = { usuarios }