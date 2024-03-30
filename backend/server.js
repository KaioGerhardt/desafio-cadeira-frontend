const express = require('express');
const app = express();
const port = 3030;
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const optionsCors = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
}
app.use(cors(optionsCors));

app.use('/', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});