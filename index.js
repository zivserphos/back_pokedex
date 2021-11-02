const path = require("path")
const express = require('express');
const app = express();
const cors = require('cors')
const pokemonRouter = require('./src/routers/pokemonRouter')
const handleUsersReq = require('./handlers/handleUsersReq');
const userRouter = require("./src/routers/userRouter")
const errorHandler = require('./handlers/errorHandler');

const port = process.env.PORT || 8080;


app.use(cors({origin: "*"}))
app.use(express.json())
app.use("/pokemon" , handleUsersReq , pokemonRouter)
app.use("/user" , userRouter)
app.use(errorHandler)


// start the server
app.listen(port, function() {
  console.log('app started');
});


app.use("/", express.static('./dist'));
app.get('/',(req,res)=>{
  res.sendFile(path.resolve('./dist/index.html'))
})
