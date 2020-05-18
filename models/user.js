const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../libs/env').secret;

const userSchema = new mongoose.Schema({
   email: String,
   hashedPassword: {
       type: String
   },
   token: String,
   courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

userSchema.virtual('password');

userSchema.pre('validate', async function(next){
    if(this.password === undefined) return;
    try{
        const hash = await bcrypt.hash(this.password, 10);
        this.hashedPassword = hash;
        next();
    }catch(error){
        console.log(error);
        throw error;
    }
});

// se llama User.authenticate()
userSchema.statics.authenticate = async function({email, password}){
    //this => User. Donde User es el model
    const user = await this.findOne({ email });
    if(!user) throw new Error('Email or Password are wrong');
    
    const result = await bcrypt.compare(password, user.hashedPassword);
    if(!result) throw new Error('Email or Password are wrong');

    //JSON Web Tokens
    user.token = jwt.sign({ id: user.id }, secret);
    user.save();

    return user;
};

module.exports = mongoose.model('User', userSchema);