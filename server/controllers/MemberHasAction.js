const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Member = require('../config/db_connection').Member
const Action = require('../config/db_connection').Action

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      actionId: INT,
     *      memberId: INT,
     *      mhaStatus: INT,
     *  }
     *
     *  return: The object.
     */
    create(req, res, next) {
        MemberHasAction
            .create(req.body)
            .then(Mha => {
                req.body.result = Mha
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     *  req.body = {
     *      actionId: INT,
     *      members: [{memberId: id}, ...],
     *      mhaStatus: INT,
     *  }
     *
     *  return: true if all MHA are created, else false.
     */
    createFromArray (req, res, next) {
        let members = req.body.result
        for (let member of members) {
            MemberHasAction
                .create({
                    actionId: req.body.actionId,
                    memberId: member.Member.memberId,
                    mhaStatus: req.body.mhaStatus
                })
                .then(Mha => {
                    if (members.indexOf(member) === members.length - 1) {
                        req.body.result = true
                        next()
                    }
                })
                .catch(error => res.status(400).send(error))
        }

    },

    /**  ?actionId=id... (optional)
     *
     *  return: Array of MHA objects with given attributes of the query.
     */
    findAll(req, res, next) {
        MemberHasAction
            .findAll({
                order : sequelize.col('memberId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(mhas => {
                req.body.result = mhas
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  return: MHA object with given attributes of the query.
     */
    findOne(req, res, next) {
        MemberHasAction
            .findOne({
                where: req.query,
                include: [
                    { model: Member, as: 'Member' },
                    { model: Action, as: 'Action' }
                ]
            })
            .then(mha => {
                req.body.result = mha
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  req.body = {
     *      actionId: INT,
     *      memberId: INT,
     *      mhaStatus: INT,
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        MemberHasAction
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?actionId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        MemberHasAction
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    }
}