const router = require('express').Router();
const { register } = require('../controllers/auth/register');
const { login } = require('../controllers/auth/login');
const { usuarios } = require('../controllers/usuarios/user');
const { getUserChat } = require('../controllers/chat/getChats');

router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/usuarios', usuarios);
router.post('/user/conversas', getUserChat);

module.exports = { router }