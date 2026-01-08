const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = 12345

const jwtAuth = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]   
    if(!token){
         return res.status(401).json({'Error' : 'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        console.error(err)
        res.status(401).json({error : 'Unauthorized'})  
    }
}

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET)
}

module.exports = {jwtAuth, generateToken}







































