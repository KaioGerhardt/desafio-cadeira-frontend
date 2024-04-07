const express = require('express');
const router = express.Router();
const LoginModel = require('./models/Login.js');
const ClassModel = require('./models/Class.js');
const TeacherModel = require('./models/Teacher.js');
const StudentModel = require('./models/Student.js');

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
  const newUser = await login.create(req.body);

  res.status(newUser.code).send(newUser);
});

//create class
router.post ('/new-class', async (req, res) => {  

  console.log("data request ", req.body)

  const classModel = new ClassModel();
  const newClass = await classModel.create(req.body);

  res.status(newClass.code).send(newClass);
});

// get classes
router.get ('/classes', async (req, res) => {  
  const classModel = new ClassModel();
  const newClass = await classModel.get(req.body);

  res.status(newClass.code).send(newClass);
});


// get teachers
router.get ('/teachers', async (req, res) => {  

  const teacher = new TeacherModel();
  const teachers = await teacher.get(req.body);

  res.status(teachers.code).send(teachers);
});

// get students
router.get ('/students', async (req, res) => {  

  const student = new StudentModel();
  const students = await student.getWithClass(req.body);

  res.status(students.code).send(students);
});

module.exports = router;