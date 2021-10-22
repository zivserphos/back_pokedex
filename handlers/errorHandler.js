function errorHandler(req , res , next , err) {
    if (err.message === "404") {
       return res.status(404).send("NOT FOUND POKEMON")
    }
    if (err.message === "403") {
        return res.status(403).send("Realsing an uncaught pokemon or catching a caught pokemon") 
    }
    if (err.messsge === "500") {
        return res.status(500).send("SERVER ERRORS")
    }
    if (err.message === "401") {
        return res.send(401).send("unauthenticated user request")
    }


};


module.exports = errorHandler