module.exports = `

    type Course {
        id: ID!
        title: String!
        views: Int
        user: User
    }

    input CourseInput {
        title: String
        views: Int
    }

    extend type Query {
        getCourses: [Course]
        getCoursesPaginate(page: Int, limit: Int = 2): [Course]
        getCourse(id: ID!): Course
    }

    extend type Mutation {
        addCourse(input: CourseInput, user: ID!): Course
        updateCourse(id: ID!, input: CourseInput): Course
        deleteCourse(id: ID!): Alert
    }

`;