
const express = require('express');
const app = express();
const router = require('./src/routers/pokemonRouter')
const handlePokemonReq = require("./handlers/handlePokemonReq")
const handleUsersReq = require("./handlers/handleUsersReq")
const port = 8080;

app.use(express.json())
app.use("/pokemon" , handlePokemonReq)
app.use("/pokemon" , router)
app.use("/users" , handleUsersReq)


// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});
