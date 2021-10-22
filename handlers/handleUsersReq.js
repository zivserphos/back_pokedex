function handleUsersReq(req , res , next) {
    // check if this user exist, if not open new directory if it is exits add pokemon to his catches
    const userName = req.headers.username
    if (!userName){
        return res.status(401).send("no user name")
    }

    next()
}

module.exports = handleUsersReq