module.exports = `

    type User {
        id: ID!
        email: String
        hashedPassword: String
        token: String
        courses: [Course]
    }

    input UserInput {
        email: String!
        password: String
    }

    extend type Query {
        getUsers: [User]
        getUsersPaginate(page: Int, limit: Int = 2): [User]
        getUser(id: ID!): User
    }

    extend type Mutation {
        signUp(input: UserInput): User
        logIn(input: UserInput): User
        signOut: Alert
    }

`;