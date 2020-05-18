const User = require('../models/user');
const Courses = require('../models/course');

module.exports = {
    Query: {
        async getUsers(parent){
            return await User.find();
        },
        async getUsersPaginate(parent, {page, limit}){
            let users = User.find();
            if(page != undefined){
                return users.limit(limit).skip((page - 1) * limit);
            }
            
            return await users;
        },
        async getUser(parent, { id }){
            const user = await User.findById(id);
            return user;
        }
    },
    Mutation: {
        async signUp(parent, { input }){
            const user = new User(input);
            return await user.save();
        },
        async logIn(parent, { input }){
            try{
                const user = User.authenticate(input);
                return user;
            }catch(error){
                console.log(error);
                return null;
            }


        },
        async signOut(parent){

            return {
                message: `El Curso con id ${id} fue eliminado`
            }
        }
    },
    User: {
        async courses(parent){
            return await Courses.find({ user: parent.id});
        }
    }
};