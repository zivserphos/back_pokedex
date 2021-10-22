const path = require("path")
const fs = require("fs")
const usersPath = "C:/Users/User/Music/תיקיית תכנות/back_pokedex/users"

function handleUsersReq(req , res , next) {
    console.log(req.params)
    // check if this user exist, if not open new directory if it is exits add pokemon to his catches
    const userName = req.headers.username
    if (!userName){
        return res.status(401).send("no user name")
    }
    if (req.method === "GET") {
        if (!fs.existsSync(`${usersPath}/${userName}`)) {
            next()
        }

    }
    if (req.method === "PUT") {
        if (!fs.existsSync(`${usersPath}/${userName}`)) {
            fs.mkdirSync(`${usersPath}/${userName}`)
        }
        if (fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
            return res.status(403).send("pokemon already exists")
            
        }
        else {
            req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`
            fs.openSync(`${usersPath}/${userName}/${req.params.id}.json` , 'w+')
        }
        
    }
    if (req.method === "DELETE"){
        if (!fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
            console.log("something is wrong")
            return res.status(403).send("THIS POKEMON IS NOT BEEN CATCHED")
            
        }
        req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`
    }
    
    next()
}

module.exports = handleUsersReq