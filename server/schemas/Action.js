const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLString
} = require('graphql');

const { attributeFields } = require('graphql-sequelize');
const Action = require('../config/db_connection').Action;

module.exports = new GraphQLObjectType({
    name: 'Action',
    description: 'A prello notification',
    fields: attributeFields(Action)
});