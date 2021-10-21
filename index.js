const express = require('express');
const router = require('./src/routers/pokemonRouter')
const app = express();
const port = 8080;

app.use(express.json())
app.use("/pokemon" , router)


// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});
