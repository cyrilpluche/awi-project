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
                mw.Email.sendEmail(member, req.body.memberToken)
                res.status(201).send({token: req.body.memberToken})
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_all
     *
     *  return: Array of member objects.
     */
    findAll(req, res, next) {
        Member
            .findAll({ order : sequelize.col('memberId')})
            .then(members => res.status(201).send(members))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_one/2
     *
     *  return: Member object with the given id.
     */
    findOne(req, res, next) {
        var memberId = req.params.id
        if (memberId) {
            // We are searching for a member with the given Id
            Member
                .findOne({
                    where: {
                        memberId : req.params.id
                    }
                })
                .then(member => res.status(201).send(member))
                .catch(error => res.status(400).send(error));
        } else {
            // We are searching a member for a connexion
            Member
                .findOne({
                    where: {
                        memberEmail: req.body.memberEmail
                    }
                })
                .then(member => {
                    if (member.memberPassword === req.body.memberPassword) {
                        req.body = member
                        next()
                    } else res.status(400).send('Failed to log the member (1).')
                })
                .catch(error => res.status(400).send('Failed to log the member (0).'));
        }

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
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
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
            .then(isDeleted => res.status(201).send(isDeleted === 1))
            .catch(error => res.status(400).send(error));
    },

    /* ================= METHODS ================= */

    /*  localhost:4200/api/member/sign_in
     *
     *  req.body = {
     *      memberPseudo = pseudo || memberEmail = email,
     *      memberPassword = password
     *  }
     *
     *  return: A new token if the user matched, else an error.
     */
    signIn(req, res, next) {
        return res.status(201).send({token: req.body.memberToken})
    }
}