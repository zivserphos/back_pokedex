var express = require('express');
var app = express();
var port = 8080;
var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

P.getPokemonByName('eevee') // with Promise
.then(function(response) {
  console.log(response.weight);
})

// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});
