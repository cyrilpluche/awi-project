const helper = require('../helpers/helpersMethod');
var Card = require('../config/db_connection').Card;
var CardHasLabel = require('../config/db_connection').Cardhaslabel;
var Label = require('../config/db_connection').Label;
var MemberHasProject = require('../config/db_connection').MemberHasProject;
var Project = require('../config/db_connection').Project;
var List = require('../config/db_connection').List;

var sequelize = require('../config/db_connection').sequelize;
var Sequelize = require('../config/db_connection').Sequelize;

module.exports = {

    /* =================

    /*  localhost:4200/api/card/create
     *
     *  req.body = {
     *      cardTitle: String,
     *      cardDescription: String, (optional)
     *      cardStatus: Int,
     *      cardDateTarget: Date, (optional),
     *      cardDateEnd: Date, (optional),
     *      listId: Int,
     *      cardIdIsTheFather: Int, (optional)
     *      cardIdIsTheChild: Int (optional)
     *  }
     *
     *  return: New Card object.
     */
    create(req, res, next) {
        Card
            .create(req.body)
            .then(card => {
                req.body.result = card
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/card/find_all --- ?cardTitle=title... (optional)
     *
     *  return: Array of Card objects with given attributes.
     */
    findAll(req, res, next) {
        Card
            .findAll({
                order : sequelize.col('cardId'),
                where: req.query
            })
            .then(cards => {
                req.body.result = cards
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/card/find_all_searchbar?str=customStr. (optional)
     *
     *  return: Array of Cards objects with given attributes.
     */
    findAllSearchbar(req, res, next) {
        MemberHasProject
            .findAll({
                order : sequelize.col('project_id'),
                where: {
                    memberId: req.query.memberId
                },
                include: [{
                    model: Project,
                    as: 'Project',
                    attributes: [['project_id', 'id'], ['project_title', 'label']],
                    include: [{
                        model: List,
                        as: 'ListProjectFks',
                        attributes: [['list_id', 'id'], ['list_title', 'label']],
                        include: [{
                            model: Card,
                            as: 'CardListFks',
                            attributes: [['card_id', 'id'], ['card_title', 'label']],
                            where: {
                                cardTitle: {
                                    [Sequelize.Op.or]: [
                                        { [Sequelize.Op.like]: '%' + req.query.str + '%' },
                                        { [Sequelize.Op.like]: '%' + req.query.str.charAt(0).toUpperCase() + req.query.str.slice(1) + '%' }
                                    ]
                                },
                                cardStatus: 0
                            }
                        }]
                    }]
                }]
            })
            .then(cards => {
                req.body.result = helper.flatSearchCard(cards)
                next()
            })
            .catch(error => res.status(400).send(error));
    },
    
    /*  localhost:4200/api/card/find_all/:id
     *  
     *  return: Array of Card objects for a given list.
     */
    findAllOfList(req, res, next) {
        Card
            .findAll({
                order : sequelize.col('cardId'),
                where: {listId: req.params.id }
            })
            .then(cards => {
                req.body.result = cards
                next()
            })
            .catch(error => next(error));
    },


    /*  localhost:4200/api/card/find_one --- ?cardTitle=title... (optional)
     *
     *  return: Card object with given attributes.
     */
    findOne(req, res, next) {
        Card
            .findOne({
                where: req.query,
                include: [
                    { all: true },
                    {
                        model: CardHasLabel,
                        as: 'HaslabelCard0Fks',
                        include: [{ model: Label, as: 'Label' }]
                    }
                ],
            })
            .then(card => {
                req.body.result = card
                next()
            })
            .catch(error => next(error));
    },

    /*  localhost:4200/api/card/update/:id
     *
     *  req.body = {
     *      cardTitle: String, (optional)
     *      cardDescription: String, (optional)
     *      cardStatus: Int, (optional)
     *      cardDateTarget: Date, (optional),
     *      cardDateEnd: Date, (optional),
     *      listId: Int, (optional)
     *      cardIdIsTheFather: Int, (optional)
     *      cardIdIsTheChild: Int (optional)
     *  }
     *
     *  return: A boolean. true = Updated, false = Not updated.
     */
    update(req, res, next) {
        Card
            .update(req.body, {
                where: { cardId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error));
    },

    updateFromArray (req, res, next) {
        for (let card of req.body.cards) {
            Card
                .update({cardFather: card.cardFather}, {
                    where: { cardId: card.cardId }
                })
                .then(isUpdated => {

                    if (req.body.cards.indexOf(card) === req.body.cards.length - 1) next()
                })
                .catch(error => next(error))
        }
    },

    /*  localhost:4200/api/card/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Card
            .destroy({
                where: req.query
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error))
    }
}