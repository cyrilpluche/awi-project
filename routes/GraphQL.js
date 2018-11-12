var express = require('express');
var router = express.Router();
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

router.use('/graphql', (req, res, next) =>
    graphqlExpress({
        schema,
        context: { user: req.user }
    })(req, res, next)
);

module.exports = router;