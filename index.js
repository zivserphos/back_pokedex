
const express = require('express');
const app = express();
const pokemonRouter = require('./src/routers/pokemonRouter')
const handleUsersReq = require('./handlers/handleUsersReq');
const port = 8080;

app.use(express.json())
app.use("/pokemon" , handleUsersReq , pokemonRouter)
//app.use("/users" )


// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  res.send('hello world!');
});
