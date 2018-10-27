var Member = require('../config/db_connection').Member;
var sequelize = require('../config/db_connection').sequelize;
var jwt    = require('jsonwebtoken');

module.exports = {

    /* ================= METHODS ================= */

    /*  into route : localhost:4200/api/member/create
     *
     *  req.body = {
     *      memberFirstname = firstname,
     *      memberLastname = lastname,
     *      memberPseudo = pseudo,
     *      memberEmail = email,
     *      memberPassword = password,
     *      memberPicture = url, (optional)
     *      memberStatus = status,
     *      memberOauthGithub = url (optional)
     *  }
     *
     *  return: Token generated with member informations. Stored in req.body.memberToken.
     */
    generateToken(req, res, next) {
        // We copy the object because we don't want to encrypt the token with the user's password.
        var payload = Object.assign({}, req.body.result.dataValues)
        payload.memberPassword = null
        req.body.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        next()
    },

    /*  before all routes
     *
     *  return: If the token is valid, continue to next action, else send an error.
     */
    verifyToken(req, res, next) {
        // We can activate or disable token checking for development purposes.
        if (false) {
            var token = req.body.memberToken || req.query.memberToken || req.headers['x-access-token'];
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        res.status(400).send('Failed to authenticate token.');
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                })
            } else {
                res.status(400).send('No token provided.');
            }
        } else {
            next()
        }

    }
}