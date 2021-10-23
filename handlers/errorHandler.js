function errorHandler(err , req , res , next) {
    if (!err.status) {
        console.log("2222")
        res.status = 500
        return res.send(err)
    }
    res.status(err.status)
    res.send(err.message)
};


module.exports = errorHandler