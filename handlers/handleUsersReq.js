const path = require("path")
const fs = require("fs")
const usersPath = "C:/Users/User/Music/תיקיית תכנות/back_pokedex/users"

function handleUsersReq(req , res , next) {
    // check if this user exist, if not open new directory if it is exits add pokemon to his catches
    const userName = req.headers.username
    if (req.method !== "PUT" && req.method !== "DELETE") {
        return;
    }
    if (req.method === "PUT") {
        if (!userName) {
            throw {status: 401 , message: "no user name"}
        } 
        else{
            if (!fs.existsSync(`${usersPath}/${userName}`)) {
                fs.mkdirSync(`${usersPath}/${userName}`)
            }
            if (fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
                throw {status: 403 , message: "pokemon already exists"}
            }
            else {
                req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`
                fs.openSync(`${usersPath}/${userName}/${req.params.id}.json` , 'w+')
            }
        }
        next()
    }
    console.log("z")
    if (req.method === "DELETE"){
        if (!fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
            throw {status: 403 , message: "THIS POKEMON IS NOT BEEN CATCHED"}
        }
    }
    
    next()
}

module.exports = handleUsersReq