function handleUsersReq(req , res , next) {
    // check if this user exist, if not open new directory if it is exits add pokemon to his catches
    const userName = req.headers.username
    if (!userName){
        throw {status: 401 , message: {error: "no user name"}}
    }

    next()
}

module.exports = handleUsersReq