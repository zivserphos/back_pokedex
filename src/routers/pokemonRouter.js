const express = require("express");
const pokemonRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();


const types = (types) => {
    let typeNames = [];
    types.forEach((type) => {
        typeNames.push(type.type.name)
    })
    return typeNames;
} 

const abilities = (abilities) => {
    console.log("ffff")
    let abilitiesNames = [];
    abilities.forEach((ability) => {
        abilitiesNames.push(ability.ability.name)
    })
    return abilitiesNames
}

function generatePokemonDetails(pokemon) {
    console.log(pokemon)
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
    console.log("123")
    P.getPokemonByName(req.body.query) // with Promise
    .then((pokemon) => res.json(generatePokemonDetails(pokemon)));
    }
    catch {
        console.error("error")
    }
});
pokemonRouter.get("/get/:id", (req, res) => {
  P.getPokemonById(req.params.query)
  .then((pokemon) => res.json(generatePokemonDetails(pokemon)))
});

//pokemonRouter.put("/")

module.exports = pokemonRouter;