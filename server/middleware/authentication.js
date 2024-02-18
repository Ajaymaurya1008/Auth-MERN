const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authHeader = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("Authentication invalid");
    }
    const token = authHeader.split(" ")[1];
    // console.log(authHeader);
    if(!token){
        throw new UnauthenticatedError("Authentication invalid");
    }
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {userId:payload.userId,name:payload.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid");
    }
}

module.exports = authHeader;