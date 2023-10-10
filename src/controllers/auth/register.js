const {
  database
} = require('../../database/database');
const yup = require('yup');
const crypto = require('crypto');

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = await schema.validate(req.body,
      {
        abortEarly: true
      }
    )

    const db = database();

    const cryptoPass = hashPassword(password)
    const UserID = GetUID();

    db.run('INSERT INTO usuarios (id, name, email, password) VALUES(?, ?, ?, ?)', [UserID, name, email, cryptoPass], function(error) {

      if (error) {

        return res.status(400).json({
          success: false,
          message: 'Account not registered.'
        });

      }

      return res.status(200).json({
        success: true,
        message: 'Account registered successfully.'
      });

    });

  } catch (error) {

    if (error instanceof yup.ValidationError) {
      return res.status(400).json(
        {
          success: false,
          message: error.message
        }
      )
    }

    return res.status(400).json({
      success: false,
      message: error.message
    });

  }

}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return salt + ':' + hash;
}

function GetUID() {
  const caracteres = '0123456789';
  let id = '';
  
  for (let i = 0; i < 13; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    id += caracteres.charAt(indiceAleatorio);
  }
  return id;
}

module.exports = {
  register
}