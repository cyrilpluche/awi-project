var Member = require('../config/db_connection').Member;
var sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* =================

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
     *  return: Array with the Member object (size = 1).
     */
    create(req, res, next) {
        return Member
            .create(req.body)
            .then(member => res.status(201).send([member]))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_all
     *
     *  return: Array of member objects.
     */
    findAll(req, res, next) {
        return Member
            .findAll({ order : sequelize.col('memberId')})
            .then(members => res.status(201).send(members))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/find_one/2
     *
     *  return: Array with the member object (size = 1).
     */
    findOne(req, res, next) {
        return Member
            .findOne({
                where: {
                    memberId : req.params.id
                }
            })
            .then(members => res.status(201).send([members]))
            .catch(error => res.status(400).send(error));
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
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    update(req, res, next) {
        return Member
            .update(req.body, {
                where: { memberId: req.params.id }
            })
            .then(isUpdated => {
                res.status(201).send(isUpdated)
            })
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/member/delete/5
     *
     *  return: Array with a boolean. 1 = Updated, 0 = Not updated (size = 1).
     *
     *  Warning: If the id don't match, status 201 is returned with boolean = 0.
     */
    delete(req, res, next) {
        return Member
            .destroy({
                where: {
                    memberId: req.params.id
                }
            })
            .then(member => res.status(201).send([member]))
            .catch(error => res.status(400).send(error));
    }
}