const express = require("express");
const userRouter = express.Router();

userRouter.post("/info" , (req,res) => {
    const userName = req.headers.username
    if (userName) {
        res.send(userName)
    }
    res.status(404).send("Not found")
})

module.exports = userRouter