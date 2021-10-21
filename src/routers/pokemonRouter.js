const express = require("express");
const router = express.Router();
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();

router.get("/pokemon/query", (req, res) => {
  P.getPokemonByName(req.query) // with Promise
    .then(function (response) {
      res.json(response);
    });
});
router.get("/pokemon/get/:id", (req, res) => {
  return res.json();
});

module.exports = router;
