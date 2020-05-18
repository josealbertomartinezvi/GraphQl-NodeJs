const express = require('express');
const mongoose = require('mongoose'); //ODM
const bodyParser = require('body-parser');

const auth = require('./libs/auth');

// const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServer } = require('apollo-server-express');

// importar utilidad
const { merge } = require('lodash');

const courseTypeDef = require('./types/course.types');
const userTypeDef = require('./types/user.types');

const courseResolvers = require('./resolvers/course.resolvers');
const userResolvers = require('./resolvers/user.resolvers');

mongoose.connect('mongodb://localhost/graphql_bd_course', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const typeDefs = `
    type Alert {
        message : String
    }

    type Query {
        _ : Boolean
    }

    type Mutation {
        _ : Boolean
    }
`;

const resolver = {};

// const schema = makeExecutableSchema({
//     typeDefs: [typeDefs, courseTypeDef, userTypeDef],
//     resolvers: merge(resolver, courseResolvers, userResolvers)
// });

// app.use('/graphql', bodyParser.json() ,graphqlExpress({ schema }));
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const server = new ApolloServer({
    typeDefs: [typeDefs, courseTypeDef, userTypeDef],
    resolvers: merge(resolver, courseResolvers, userResolvers),
    context: auth
});

server.applyMiddleware({ app }); //{ app: app }

app.listen(8080, () =>{
    console.log("Servidor Iniciado");
});