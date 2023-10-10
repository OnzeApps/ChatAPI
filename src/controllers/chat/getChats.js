const { database } = require('../../database/database');

const getUserChat = async (req, res) => {

  try {

    const {
      userid
    } = req.body;

    const db = database();

    db.all('SELECT * FROM chat WHERE UID1 = ? OR UID2 = ?', [userid, userid], function(error, chats) {

      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Erro ao carregar conversas.'
        });
      }

      if (chats.length > 0) {

        chats.forEach((chat) => {

          return res.status(200).json({
            success: true,
            conversas: chat
          });

        });
        
      } else {

        return res.status(200).json({
          success: true,
          message: 'Sem conversas disponíveis.'
        });

      }
    });

  } catch(error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }
}

module.exports = {
  getUserChat
}