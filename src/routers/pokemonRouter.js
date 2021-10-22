const express = require("express");
const pokemonRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const fs = require("fs");
const path = require("path");


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
    console.log(req.params)
    P.getPokemonByName(req.params.id).then((pokemon) => {
       const pokemonDetails = {
           pokemon: generatePokemonDetails(pokemon)
       } 
       fs.writeFileSync(req.headers.address , JSON.stringify(pokemonDetails))
       res.send({body: "Pokemon had been catched"})
    })
});

pokemonRouter.delete("/release/:id" , (req,res) => {
    //console.log(req.headers)
    fs.unlinkSync(req.headers.address)
    res.send({body: "Pokemon is been released"})
})

pokemonRouter.get("/" , (req,res) => {
    const pokemonArr = [];
    fs.readdirSync(req.headers.address).forEach((pokemonFile) => {
        pokemonArr.push(fs.readFile(`${req.headers,address}/${pokemonFile}`))
    })
    res.send({body: pokemonArr})
})

module.exports = pokemonRouter;