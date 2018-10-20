var Member = require('../config/db_connection').Member;
var sequelize = require('../config/db_connection').sequelize;
var jwt    = require('jsonwebtoken');

module.exports = {

    /* ================= METHODS ================= */

    /*  localhost:4200/api/member/create
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
        var payload = req.body
        payload.memberPassword = null
        req.body.memberToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        next()
    }
}