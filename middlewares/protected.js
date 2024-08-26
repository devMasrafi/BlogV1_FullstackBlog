const appErr = require("../utils/appErr")


const protected = (req, res, next) =>{
    // check user is loged in
    if(req.session.userAuth){
        next()
    }else{
        next("Not authorized, login again")
    }
}


module.exports = protected