var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver
var root = {
    message: () => 'Hello World!',
    rootValue: root
};

router.get('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

router.post('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

module.exports = router;