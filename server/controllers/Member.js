var Member = require('../config/db_connection').Member;
var sequelize = require('../config/db_connection').sequelize;
var mw = require('../middlewares')

module.exports = {

    /* ================= CRUD ================= */

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
     *  return: A new token specific for the member created.
     */
    create(req, res, next) {
        Member
            .create(req.body)
            .then(member => {
                member.memberPassword = null
                req.body.result = member
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/find_all --- ?memberId=id... (optional)
     *
     *  return: Array of member objects with given attributes.
     */
    findAll(req, res, next) {
        Member
            .findAll({
                order : sequelize.col('memberId'),
                where: req.query
            })
            .then(members => {
                req.body.result = members
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/find_one --- ?memberId=id... (optional)
     *
     *  return: Member object with given attributes.
     */
    findOne(req, res, next) {
        Member
            .findOne({ where: req.query })
            .then(member => {
                req.body.result = member
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/update/2
     *
     *  req.body = {
     *      memberFirstname = firstname, (optional)
     *      memberLastname = lastname, (optional)
     *      memberPseudo = pseudo, (optional)
     *      memberEmail = email, (optional)
     *      memberPassword = password, (optional)
     *      memberPicture = url, (optional)
     *      memberStatus = status, (optional)
     *      memberOauthGithub = url (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Member
            .update(req.body, {
                where: { memberId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/delete/5
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Member
            .destroy({
                where: {
                    memberId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error));
    },

    /* ================= METHODS ================= */

    /*  localhost:4200/api/member/sign_in
     *
     *  req.body = {
     *      memberPseudo = memberEmail,
     *      memberPassword = password
     *  }
     *
     *  return: Find the user and connect him if credentials matched.
     */
    findOneSignIn(req, res, next) {
        Member
            .findOne({
                where: {
                    memberEmail: req.body.memberEmail
                }
            })
            .then(member => {
                if (member && member.memberEmail === req.body.memberEmail) {
                    if (member.memberPassword === req.body.memberPassword) {
                        req.body.result = member
                        next()
                    }
                    else res.status(400).send('Email or password is incorrect.')
                }
                else res.status(400).send('Email or password is incorrect.')
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/member/sign_in
     *
     *  return: A new token of the user.
     */
    sign(req, res, next) {
        console.log(req.body.result)
        next()
    },

    /*  localhost:4200/api/member/sign_up
     *
     *  return: The member decrypted with the token.
     */
    signIn(req, res, next) {
        req.decoded.iat = null
        req.decoded.exp = null
        req.body.result = {member: req.decoded}
        next()
    }

}