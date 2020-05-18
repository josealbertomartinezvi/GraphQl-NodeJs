const Course = require('../models/course');
const User = require('../models/user');

module.exports = {
    Query: {
        async getCourses(parent, {}, context){
            console.log(context);
            const courses = await Course.find().populate('user');
            return courses;
        },
        async getCoursesPaginate(parent, {page, limit}){
            // opcion 1
            // if(page != undefined){
            //     const courses = await Course.find();
            //     return courses.slice((page - 1) * limit, page * limit);
            // }
            // return courses;

            //opcion 2
            let courses = Course.find().populate('user');
            if(page != undefined){
                return courses.limit(limit).skip((page - 1) * limit);
            }
            
            return await courses;
        },
        async getCourse(parent, { id }){
            const courses = await Course.findById(id);
            return courses;
        }
    },
    Mutation: {
        async addCourse(parent, { input, user }, context){
            // definir que operaciones necesitan usuario logged
            // if(!context || !context.currentUser) return null;
            const foundUser = await User.findById(user);
            const course = new Course({ ...input, user });
            await course.save();
            await foundUser.courses.push(course);
            await foundUser.save();
            return course;
        },
        async updateCourse(parent, { id, input }){
            const courseUpdated = await Course.findByIdAndUpdate(id, input);
            return courseUpdated;
        },
        async deleteCourse(parent, { id }){
            await Course.deleteOne({ _id: id });
            return {
                message: `El Curso con id ${id} fue eliminado`
            }
        }
    },
    Course: {
        async user(parent){
            return await User.findById(parent.user);
        }
    }
};