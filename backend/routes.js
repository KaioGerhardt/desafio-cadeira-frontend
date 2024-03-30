const express = require('express');
const router = express.Router();
const LoginModel = require('./models/Login.js');

// Defina suas rotas aqui
router.get('/', (req, res) => {
  res.send('Olá, mundo! Esta é uma rota definida em outro arquivo.');
});

//login
router.post ('/login', async (req, res) => {  
  const login = new LoginModel();
  const userLogin = await login.login(req.body);
  
  res.status(userLogin.code).send(userLogin);
});

//create new user
router.post ('/register', async (req, res) => {  
  const login = new LoginModel();
  const userLogin = await login.create(req.body);
  
  res.status(userLogin.code).send(userLogin);
});

module.exports = router;