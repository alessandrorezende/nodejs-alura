const express = require('express');
const app = express();

require('marko/node-require').install();
require('marko/express');

app.use('/estatico', express.static('src/app/public'));

const bodyParser = require('body-parser'); //middleware
app.use(bodyParser.urlencoded({
    extended: true  //habilitado a receber objetos complexos em formato .json
}));

const methodOverride = require('method-override'); //middleware para trocar o METHOD
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


const rotas = require('../app/rotas/rotas.js');
rotas(app);


module.exports = app;