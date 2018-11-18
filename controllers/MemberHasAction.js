const MemberHasAction = require('../config/db_connection').MemberHasAction
const sequelize = require('../config/db_connection').sequelize;

const Member = require('../config/db_connection').Member
const Action = require('../config/db_connection').Action

const memberFilter = ['memberId', 'memberFirstname', 'memberLastname', 'memberPseudo', 'memberEmail', 'memberStatus', 'memberPicture']

module.exports = {

    /* ================= MemberHasAction CONTROLLER ================= */


    /**
     * @typedef MemberHasAction
     * @property {integer} memberHasActionId.required
     * @property {integer} actionId
     * @property {integer} memberId
     * @property {integer} mhaStatus
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
     * This function create a new member.
     * @param {integer} actionId
     * @param {Array.<Member>} members
     * @returns {boolean} 200 - Boolean, true if all MHA are created.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    createFromArray (req, res, next) {
        let members = req.body.result
        console.log(req.decoded.memberId)
        for (let member of members) {
            let body = {
                actionId: req.body.actionId,
                memberId: member.Member.memberId,
                mhaStatus: req.body.mhaStatus
            }
            if (member.memberId === req.decoded.memberId) {
                body = {
                    actionId: req.body.actionId,
                    memberId: member.Member.memberId,
                    mhaStatus: 1
                }
            }
            MemberHasAction
                .create(body)
                .then(Mha => {
                    if (members.indexOf(member) === members.length - 1) {
                        req.body.result = true
                        next()
                    }
                })
                .catch(error => res.status(400).send(error))
        }

    },

    /**
     * This function find all the MemberHasAction matching.
     * @param {integer} actionId
     * @param {integer} memberId
     * @param {integer} mhaStatus
     * @returns {Array.<MembmerHasAction>} 200 - Array of MemberHasAction.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find the first MemberHasAction matching.
     * @param {integer} actionId
     * @param {integer} memberId
     * @param {integer} mhaStatus
     * @returns {MembmerHasAction.model} 200 - Array of MemberHasAction.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        MemberHasAction
            .findOne({
                where: req.query,
                include: [
                    { model: Member, as: 'Member', attributes: memberFilter },
                    { model: Action, as: 'Action' }
                ]
            })
            .then(mha => {
                req.body.result = mha
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function update a MemberHasAction.
     * @param {integer} actionId
     * @param {integer} actionId.body
     * @param {integer} memberId.body
     * @param {integer} mhaStatus.body
     * @returns {boolean} 200 - Boolean, true if the MemberHasAction was updated.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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

    /*  ?actionId=id... (optional)
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    /**
     * This function delete a MemberHasAction.
     * @param {integer} actionId
     * @param {integer} memberId
     * @returns {boolean} 200 - Boolean, true if the MemberHasAction was deleted.
     * @returns {Error}  400 - error message
     * @returns {Error}  500 - error
     *
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