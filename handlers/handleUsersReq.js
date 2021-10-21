const path = require("path")
const fs = require("fs")
const usersPath = "C:/Users/User/Music/תיקיית תכנות/back_pokedex/users"

function handleUsersReq(req , res , next) {
    // check if this user exist, if not open new directory if it is exits add pokemon to his catches
    const userName = req.headers.username
    console.log(userName)
    if (!userName) {
        throw {status: 401 , message: "no user name"}
    } 
    else{
        if (!fs.existsSync(`${usersPath}/${userName}`)) {
            fs.mkdirSync(`${usersPath}/${userName}`)
        }
        else {
            console.log(`${usersPath}/${userName}/${req.body.pokemon.id}`)
            if (fs.existsSync(`${usersPath}/${userName}/${req.body.pokemon.id}.json`)) {
                throw {status: 403 , message: "pokemon already exist"}
            }
        }
    }
    next()
}

module.exports = handleUsersReq