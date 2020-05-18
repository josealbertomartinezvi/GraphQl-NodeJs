const jwt = require('jsonwebtoken');
const secret = require('./env').secret;
const User = require('../models/user');

module.exports = async ({ req }) =>{
    let token = null;
    let currentUser = null;
    
    token = req.headers['authorization'];
    if(!token) return {};

    const decodedInfo = jwt.verify(token, secret);
    if(token && decodedInfo){
        currentUser = await User.findById(decodedInfo.id);
        if(!currentUser) throw new Error('Invalid Token');
    }

    // definir que todas las operaciones necesitan usuario
    // if(!context.currentUser) 
    //     throw new Error('No LogoIn');

    return {
        token, // token: token
        currentUser // currentUser: currentUser
    }
} 