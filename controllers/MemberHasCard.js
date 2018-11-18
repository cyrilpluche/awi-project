const helper = require('../helpers/helpersMethod');
const MemberHasCard = require('../config/db_connection').MemberHasCard

const List = require('../config/db_connection').List
const Card = require('../config/db_connection').Card

const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     * @typedef MemberHasCard
     * @property {integer} cardId.required
     * @property {integer} memberId.required
     */

    /**
     * This function create a new MemberHasCard.
     * @route POST /api/card/create_member_has_card
     * @group Card - Operations about cards.
     * @param {MemberHasCard.model} MemberHasCard.body.required
     * @returns {CardHasLabel.model} 200 - New MemberHasCard object.
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the member of a card.
     * @route GET /api/card/find_all_members
     * @group Card - Operations about cards.
     * @param {integer} cardId.required
     * @returns {Array.<Member>} 200 - All the member of the card.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
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

    /*  ?cardId=id... (optional)
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

    /*  ?cardId=id... (optional)
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

    /**
     * This function delete a MemberHasCard
     * @route DELETE /api/card/delete_member_has_card
     * @group Card - Operations about cards.
     * @param {integer} cardId.optional
     * @returns {boolean} 200 - A boolean, true if the MemberHasCard was deleted.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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
    }
}