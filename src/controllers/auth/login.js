const { database } = require('../../database/database');
const yup = require('yup');
const crypto = require('crypto');

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = await schema.validate(req.body, {
        abortEarly: true
      }
    );
    
    const db = database();
    
    db.get('SELECT * FROM usuarios WHERE email = ? ', email, (error, row) => {
      
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      
      const VerifyPass = verifyPassword(password, row.password)
      
      if (row && VerifyPass) {
        return res.status(200).json({
          success: true,
          UID: row.id,
          message: 'Login successfully.'
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Login incorrect.'
        });
      }
    })

  } catch(error) {

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

function verifyPassword(password, original) {
  const parts = original.split(":");
  const salt = parts[0];
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === parts[1];
}

module.exports = {
  login
}