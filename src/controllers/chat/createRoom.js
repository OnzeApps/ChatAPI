const yup = require('yup');
const { database } = require('../../database/database');

const schema = yup.object().shape({
  chatid: yup.string().required()
});

const createRoom = async (req, res) => {
  
  try {
    
    const {
      chatid
    } = await schema.validate(req.body, {
      abortEarly: true
    })
    
    const db = database();
    
    db.run('INSERT INTO chat (chatid) VALUES (?)', chatid, (error, chat) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Chat created'
      });
    });
    
  } catch(error) {
    
    return res.status(400).json({
      success: false,
      message: error.message
    });
    
  }
  
}