const helper = require('../helpers/helpersMethod');
const MemberHasCard = require('../config/db_connection').MemberHasCard

const List = require('../config/db_connection').List
const Card = require('../config/db_connection').Card

const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     *  req.body = {
     *      cardId: INT,
     *      memberId: INT
     *  }
     *
     *  return: The MHC object.
     */
    create(req, res, next) {
        MemberHasCard
            .create(req.body)
            .then(mhc => {
                req.body.result = mhc
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: Array of MHC objects with given attributes of the query.
     */
    findAll(req, res, next) {
        MemberHasCard
            .findAll({
                order : sequelize.col('cardId'),
                where: req.query,
                include: [{ all: true }]
            })
            .then(mhcs => {
                console.log('FOUND')
                console.log(mhcs.length)
                req.body.result = mhcs
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    findAllMembers(req, res, next) {
        MemberHasCard
            .findAll({
                order : sequelize.col('cardId'),
                where: {
                    cardId: req.query.cardId
                },
                include: [{ all: true }]
            })
            .then(mhcs => {
                req.body.result = helper.membersOnCardFilter(req.body.result, mhcs)
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: MHC object with given attributes of the query.
     */
    findOne(req, res, next) {
        MemberHasCard
            .findOne({
                where: req.query,
                include: [{ all: true }]
            })
            .then(mhc => {
                req.body.result = mhc
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  req.body = {
     *      cardId: INT, (optional)
     *      memberId: INT (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        MemberHasCard
            .update(req.body, {
                where: req.query
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**  ?cardId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        MemberHasCard
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    deleteAllFromProjectMember (req, res, next) {
        List
            .findAll({
                where: {projectId: req.query.projectId}
            })
            .then(lists => {
                let flatList = helper.listToArrayListId(lists)
                Card
                    .findAll({
                        where: {
                            [Sequelize.Op.or]: flatList
                        }
                    })
                    .then(cards => {
                        let flatCard = helper.cardToArrayCardId(cards)

                        MemberHasCard
                            .destroy({
                                where: {
                                    memberId: req.query.memberId,
                                    [Sequelize.Op.or]: flatCard
                                }
                            })
                            .then(isDeleted => {
                                req.body.result = isDeleted > 0
                                next()
                            })
                            .catch(error => { res.status(400).send(error) })
                    })
                    .catch(error => { res.status(400).send(error) })
            })
            .catch(error => { res.status(400).send(error) })

    },
}