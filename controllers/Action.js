const Helper = require('../helpers/helpersMethod');

const Action = require('../config/db_connection').Action;
const MemberHasAction = require('../config/db_connection').MemberHasAction;
const Card = require('../config/db_connection').Card;

const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* ================= ACTION CONTROLLER ================= */

    /**
     * @typedef Action
     * @property {integer} actionType.required
     * @property {string} actionTitle.required
     * @property {string} actionDescription.required
     * @property {integer} memberId.required
     * @property {date} actionDateCreation.required
     * @property {integer} cardId
     * @property {integer} listId
     * @property {integer} projectId
     * @property {integer} teamId
     */

    /**
     * This function create a new action.
     * @route POST /api/action/create
     * @group Action - Operations about action
     * @param {Action.model} action.body.required - the new action
     * @returns {Action.model} 200 - New action object
     * @returns {Error}  400 - Action:create | error message
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Action
            .create(req.body)
            .then(action => {
                req.body.result = action
                req.body.actionId = action.actionId
                next()
            })
            .catch(error => res.status(400).send('Action:create | ' + error));
    },

    /**
     * This function find all the actions.
     * @route GET /api/action/find_all
     * @group Action - Operations about action
     * @param {integer} actionType.optional
     * @param {string} actionTitle.optional
     * @param {integer} memberId.optional
     * @param {date} actionDateCreation.optional
     * @param {integer} cardId.optional
     * @param {integer} listId.optional
     * @param {integer} projectId.optional
     * @param {integer} teamId.optional
     * @returns {Array.<Action>} 200 - An array of actions.
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Action
            .findAll({
                order : sequelize.literal('action_id DESC'),
                where: req.query
            })
            .then(actions => {
                req.body.result = actions
                next()
            })
            .catch(error => next(error));
    },

    /**
     * This function find all the comments corresponding to a card.
     * @route GET /api/action/find_all_comments/:card
     * @group Action - Operations about action
     * @returns {Array.<Action>} 200 - An array of actions.
     * @returns {Error}  500 - error
     *
     */
    findAllComments (req, res, next) {

        MemberHasAction.findAll({
            include: [
                {
                    model: Action,
                    as: 'Action',
                    where: {action_type: 3},
                    include: [
                        {
                            model: Card,
                            as: 'Card',
                            where: {
                                card_id: req.params.card
                            }
                        }
                    ]
                }
            ]
        }).then(r => {
            let results = []
            for (let i = 0; i < r.length; i++) {
                results.push(Helper.flatComents(r[i]))
            }
            res.send(results)
        }).catch(error => res.status(400).send(error))
        /*Action.findAll({
            where: {
                action_type: 3 // comments
            },
            include: [
                {
                    model: MemberHasAction,
                    as: 'MemberhasactionActionFks'
                },
                {
                    model: Card,
                    as: 'Card',
                    where: {
                        card_id: req.params.card
                    }
                }
            ]
        }).then(r => res.send(r)) */
    },

    /**
     * This function find a action.
     * @route GET /api/action/find_one
     * @group Action - Operations about action
     * @param {string} actionTitle.optional
     * @param {integer} memberId.optional
     * @param {date} actionDateCreation.optional
     * @param {integer} cardId.optional
     * @param {integer} listId.optional
     * @param {integer} projectId.optional
     * @param {integer} teamId.optional
     * @returns {Array.<Action>} 200 - An action
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Action
            .findOne({ where: req.query })
            .then(action => {
                req.body.result = action
                next()
            })
            .catch(error => next(error));
    },


    /**
     * This function update an action.
     * @route PUT /api/action/update/:id
     * @group Action - Operations about action
     * @param {integer} memberId.body.optional
     * @param {date} actionDateCreation.body.optional
     * @param {integer} cardId.body.optional
     * @param {integer} listId.body.optional
     * @param {integer} projectId.body.optional
     * @param {integer} teamId.body.optional
     * @returns {boolean} 200 - A boolean, true if the action was updated.
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Action
            .update(req.body, {
                where: { actionId: req.params.id }
            })
            .then(isUpdated => {
                console.log(isUpdated[0])
                console.log(isUpdated[0] === 0)
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/action/update_multiple
     *
     *  req.body = {
     *      actionType: Int, (optional)
     *      actionStatus: Int, (optional)
     *      actionTitle: String, (optional
     *      actionDescription: String (optional),
     *      actionDateCreation: Int, (optional)
     *      memberId: Int, (optional)
     *      teamId: Int, (optional)
     *      projectId: Int, (optional)
     *      listId: Int, (optional)
     *      cardId: Int (optional)
     *  }
     *
     *  return: A boolean. true = All updated, false = Not all updated.
     */
    updateMultiple(req, res, next) {
        let loop = 0
        let isAllUpdated = true
        for (let mha of req.body.memberHasAction) {
            MemberHasAction
                .update(mha, {
                    where: {
                        actionId: mha.Action.actionId,
                        memberId: mha.Member.memberId
                    }
                })
                .then(isUpdated => {
                    isAllUpdated = isUpdated[0] === 1
                    if (loop === req.body.memberHasAction.length - 1) {
                        req.body.result = isAllUpdated
                        next()
                    }
                    else loop += 1
                })
                .catch(error => next(error));
        }
    },


    /**
     * This function delete an action.
     * @route DELETE /api/action/delete/:id
     * @group Action - Operations about action
     * @returns {boolean} 200 - A boolean, true if the action was deleted.
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Action
            .destroy({
                where: {
                    actionId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error))
    },

    /*  localhost:4200/api/action/find_all_unarchived
     *
     *  return: Array of  unarchived Action objects with given attributes.
     */
    /**
     * This function find all the UNarchived actions.
     * @route GET /api/action/find_all_unarchived
     * @group Action - Operations about action
     * @returns {Array.<Action>} 200 - All the UNarchived actions.
     * @returns {Error}  500 - error
     *
     */
    findAllUnarchived(req, res, next) {
        let Op = Sequelize.Op
        let condition = {
            mhaStatus: {
                [Op.or]: [0, 1]
            },
            memberId: req.decoded.memberId
        }
        MemberHasAction
            .findAll({
                order: [sequelize.literal('action_id DESC')],
                where: condition,
                include: [{ all: true }]
            })
            .then(actions => {
                req.body.result = actions
                next()
            })
            .catch(error => res.status(400).render(error));
    },

    /* ================= MIDDLEWARE METHODS ================= */
    /* ================= MIDDLEWARE METHODS ================= */

    countUnreadAction(req, res, next) {
        MemberHasAction
            .findAndCountAll({
                where: {
                    mhaStatus: 0,
                    memberId: req.decoded.memberId
                }
            })
            .then(count => {
                req.body.result = {
                    notifications: req.body.result,
                    notificationsUnread: count.count
                }
                next()
            })
            .catch(err => res.status(400).render(err));
    }
}