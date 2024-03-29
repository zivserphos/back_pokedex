const express = require("express");
const pokemonRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const fs = require("fs");
const path = require("path");
const usersPath = (`${__dirname.split("src")[0]}users`)

const types = (types) => {
  let typeNames = [];
  types.forEach((type) => {
    typeNames.push(type.type.name);
  });
  return typeNames;
};

const abilities = (abilities) => {
  let abilitiesNames = [];
  abilities.forEach((ability) => {
    abilitiesNames.push(ability.ability.name);
  });
  return abilitiesNames;
};

function generatePokemonDetails(pokemon) {
  const pokemonDetails = {
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    types: types(pokemon.types),
    frontImg: pokemon.sprites["front_default"],
    backImg: pokemon.sprites["back_default"],
    abilities: abilities(pokemon.abilities),
    id: pokemon.id
  };
  return pokemonDetails;
}

pokemonRouter.get("/query", async (req, res, next) => {

  if (!req.body.query) {
    next({ status: 400, message: { error: "Bad Pokemon Request" } });
  }
  try {
    const pokemon = await P.getPokemonByName(req.body.query); // with Promise
    res.json(generatePokemonDetails(pokemon));
  } catch (err) {
    next({ status: 404, message: { error: "Pokemon not found" } });
  }
});

pokemonRouter.get("/get/:id", async (req, res, next) => {
  try {
    const pokemon = await P.getPokemonByName(req.params.id);
    res.json(generatePokemonDetails(pokemon));
  } catch (err) {
    next({ status: 404, message: { error: "Pokemon Not Found" } });
  }
});

function createDirAndFiles(req) {
  const userName = req.headers.username;
  if (!fs.existsSync(`${usersPath}/${userName}`)) {
    try {
      fs.mkdirSync(`${usersPath}/${userName}`)
    }
    catch (err){
     throw {status:404 , message: "no Pokemons catched"}
  }
}
  
  if (fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
    return true;
  } else {
    req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`;
    fs.openSync(`${usersPath}/${userName}/${req.params.id}.json`, "w+");
  }
}

pokemonRouter.put("/catch/:id", async (req, res, next) => {
  const pokemon = await P.getPokemonByName(req.params.id);
  const pokemonDetails = {
    pokemon: generatePokemonDetails(pokemon),
  };
  try {
    if (createDirAndFiles(req)) {
      return next({ status: 403, message: { error: "pokemon already exists" } });
    }
  }
  catch(err) {
    next({status:404 , message: err.message})
  }
  fs.writeFile(req.headers.address, JSON.stringify(pokemonDetails), (err) => {
    if (err) {
      next({ status: 403, message: { error: "could not write file" } });
    }
  });
  res.send({ body: "Pokemon had been catched" });
});

pokemonRouter.delete("/release/:id", (req, res) => {
  const userName = req.headers.username;
  if (!fs.existsSync(`${usersPath}/${userName}/${req.params.id}.json`)) {
    throw {
      status: 403,
      message: { error: "THIS POKEMON IS NOT BEEN CATCHED" },
    };
  }
  req.headers.address = `${usersPath}/${userName}/${req.params.id}.json`;
  fs.unlinkSync(req.headers.address);
  return res.send({ body: "Pokemon is been released" });
});

pokemonRouter.get("/", (req, res) => {
  const userName = req.headers.username;
  const pokemonArr = [];
  fs.readdirSync(`${usersPath}/${userName}`).forEach((pokemonFile) => {
    pokemonArr.push(
      fs.readFileSync(`${usersPath}/${userName}/${pokemonFile}`).toString()
    );
  });
  res.send({ body: pokemonArr });
});

pokemonRouter.get("/getPokemonsList/:limit/:offset" , async (req, res) => {
  const interval  = {limit: req.params.limit , offset: req.params.offset}
  const pokemonList = await P.getPokemonsList(interval)
  return res.send(pokemonList.results.map((result) => result.name));
}) 

pokemonRouter.get("/getTypeByName/:name" , async (req , res) => {
  const pokemonsWithType = await P.getTypeByName(req.params.name)
  return res.send(pokemonsWithType.pokemon.map((pokemon) => pokemon.pokemon.name))
})

pokemonRouter.get("/getPokedex" , (req , res) => {
  let files = fs.readdirSync(`${usersPath}/${req.headers.username}`)
  const pokemons = files.map((file) => pokemonName(file , req.headers.username))
  res.send(pokemons)
  
})

function pokemonName(jsonFile , username) {
  const fileContent = (fs.readFileSync(`${usersPath}/${username}/${jsonFile}`))
  const pokemon = JSON.parse(fileContent.toString())
  return pokemon.pokemon.name
}

module.exports = pokemonRouter;
