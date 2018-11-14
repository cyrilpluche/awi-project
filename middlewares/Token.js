var Member = require('../config/db_connection').Member;
var sequelize = require('../config/db_connection').sequelize;
var jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    /* ================= METHODS ================= */

    /**  into route : localhost:4200/api/member/create
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
        req.body.result.dataValues.memberPassword = null
        // We copy the object because dataValues don't have memberToken field.
        var payload = Object.assign({}, req.body.result.dataValues)
        payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * 365 // expires in 1 year
        });

        req.body.result = payload
        next()
    },

    /*  before all routes
     *
     *  return: If the token is valid, continue to next action, else send an error.
     */
    verifyToken(req, res, next) {
        // We can activate or disable token checking for development purposes.
        if (true) {
            var token = req.headers['authorization'] || req.body.memberToken || req.query.memberToken;
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
    },

    /*
     *  return: Generate a random token for new password.
     */
    generateRandomToken(req, res, next) {
        let s = '';
        let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i=0; i < 15; i++) {
            s += r.charAt(Math.floor(Math.random()*r.length));
        }
        req.body.memberPassword = s
        next()

    },

    /**
     *  return: Create a token for invitation link of a Member on a Project (only if the member don't exist).
     */
    generateInvitationToken(req, res, next) {
    var payload = {
        memberEmail: req.body.memberEmail,
        projectId: req.body.projectId,
    }
    payload.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 365 // expires in 1 year
    });
    req.body.result = payload
    next()
},
}