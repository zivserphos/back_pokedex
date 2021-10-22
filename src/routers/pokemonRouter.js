const express = require("express");
const pokemonRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const fs = require("fs");
const path = require("path");
const usersPath = "C:/Users/User/Music/תיקיית תכנות/back_pokedex/users"


const types = (types) => {
    let typeNames = [];
    types.forEach((type) => {
        typeNames.push(type.type.name)
    })
    return typeNames;
} 

const abilities = (abilities) => {
    let abilitiesNames = [];
    abilities.forEach((ability) => {
        abilitiesNames.push(ability.ability.name)
    })
    return abilitiesNames
}

function generatePokemonDetails(pokemon) {
    const pokemonDetails = {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        types: types(pokemon.types),
        front_pic: pokemon.sprites["front_default"],
        back_pic: pokemon.sprites["back_default"],
        abilities: abilities(pokemon.abilities)
    }
    return pokemonDetails;
}

pokemonRouter.get("/query", (req, res) => {
    const userName = req.headers.username
    try {

    P.getPokemonByName(req.body.query) // with Promise
    .then((pokemon) => res.json(generatePokemonDetails(pokemon)));
    }
    catch {
        console.error("error")
    }
});
pokemonRouter.get("/get/:id", (req, res) => {
  P.getPokemonByName(req.params.id)
  .then((pokemon) => res.json(generatePokemonDetails(pokemon)))
});

pokemonRouter.put("/catch/:id" , (req ,res) => {
    const userName = req.headers.username
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
    P.getPokemonByName(req.params.id).then((pokemon) => {
       const pokemonDetails = {
           pokemon: generatePokemonDetails(pokemon)
       } 
       fs.writeFileSync(req.headers.address , JSON.stringify(pokemonDetails))
       res.send({body: "Pokemon had been catched"})
    })
});

pokemonRouter.delete("/release/:id" , (req,res) => {
    const userName = req.headers.username
    if (!fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
        console.log("something is wrong")
        return res.status(403).send("THIS POKEMON IS NOT BEEN CATCHED")
    }
    req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`
    fs.unlinkSync(req.headers.address)
    res.send({body: "Pokemon is been released"})
})

pokemonRouter.get("/" , (req,res) => {
    const userName = req.headers.username
    const pokemonArr = [];
    fs.readdirSync(`${usersPath}/${userName}`).forEach((pokemonFile) => {
        pokemonArr.push(fs.readFileSync(`${usersPath}/${userName}/${pokemonFile}`).toString())
    })
    res.send(pokemonArr)
})

module.exports = pokemonRouter;