const Helper = require('../helpers/helpersMethod');

const Action = require('../config/db_connection').Action;
const MemberHasAction = require('../config/db_connection').MemberHasAction;
const Card = require('../config/db_connection').Card;

const sequelize = require('../config/db_connection').sequelize;
const Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* ================= SEQUELIZE METHODS ================= */
    /* ================= SEQUELIZE METHODS ================= */

    /**
     *  req.body = {
     *      actionType: Int,
     *      actionTitle: String,
     *      actionDescription: String
     *      memberId: Int,
     *      actionDateCreation: Date,
     *      cardId: Int, (optional)
     *      listId: Int, (optional)
     *      projectId: Int, (optional)
     *      teamId: Int (optional)
     *  }
     *
     *  return: New Action object.
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

    /*  localhost:4200/api/action/find_all --- ?actionTitle=title... (optional)
     *
     *  return: Array of Action objects with given attributes sorted by actionDateCreation.
     */
    findAll(req, res, next) {
        Action
            .findAll({
                order : sequelize.col('actionDateCreation'),
                where: req.query
            })
            .then(actions => {
                req.body.result = actions
                next()
            })
            .catch(error => next(error));
    },

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

    /*  localhost:4200/api/action/find_one --- ?actionTitle=title... (optional)
     *
     *  return: Action object with given attributes.
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

    /*  localhost:4200/api/action/update/:id
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
     *  return: A boolean. true = Updated, false = Not updated.
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


    /*  localhost:4200/api/action/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
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