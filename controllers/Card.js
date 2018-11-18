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

    /* ================= CARD CONTROLLER =============== */

    /**
     * @typedef Card
     * @property {integer} cardId.required
     * @property {string} cardTitle.required
     * @property {string} cardDescription.required
     * @property {integer} cardStatus.required
     * @property {date} cardDateTarget
     * @property {integer} listId
     * @property {integer} cardIdIsTheFather
     * @property {integer} cardIdIsTheChild
     */

    /**
     * This function create a new card.
     * @route POST /api/card/create
     * @group Card - Operations about cards.
     * @param {Card.model} card.body.required - the new card
     * @returns {Card.model} 200 - New card object
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the cards.
     * @route GET /api/card/find_all
     * @group Card - Operations about cards.
     * @param {string} cardTitle.optional
     * @param {string} cardDescription.optional
     * @param {integer} cardStatus.optional
     * @param {date} cardDateTarget.optional
     * @param {integer} listId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} cardIdIsTheChild.optional
     * @returns {Array.<Card>} 200 - An array of cards.
     * @returns {Error}  500 - error
     *
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



    /**
     * This function find all the cards matching to the keyword.
     * @route GET /api/card/find_all_searchbar
     * @group Card - Operations about cards.
     * @param {string} str.optional - the keyword
     * @returns {Array.<Card>} 200 - An array of cards.
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find all the cards of the specified list.
     * @route GET /api/card/find_all/:id
     * @group Card - Operations about cards.
     * @returns {Array.<Card>} 200 - An array of cards.
     * @returns {Error}  500 - error
     *
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

    /**
     * This function find one card matching to the parameters.
     * @route GET /api/card/find_one
     * @group Card - Operations about cards.
     * @param {string} cardTitle.optional
     * @param {string} cardDescription.optional
     * @param {integer} cardStatus.optional
     * @param {date} cardDateTarget.optional
     * @param {integer} listId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} cardIdIsTheChild.optional
     * @returns {Card.model} 200 - the first matching card.
     * @returns {Error}  500 - error
     *
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

    /**
     * This function update a card.
     * @route PUT /api/card/update/:id
     * @group Card - Operations about cards.
     * @param {string} cardTitle.optional
     * @param {string} cardDescription.optional
     * @param {integer} cardStatus.optional
     * @param {date} cardDateTarget.optional
     * @param {integer} listId.optional
     * @param {integer} cardIdIsTheFather.optional
     * @param {integer} cardIdIsTheChild.optional
     * @returns {boolean} 200 - A boolean, true if the card was updated.
     * @returns {Error}  500 - error
     *
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

    /**
     * This function update the order of the cards contained in the array.
     * @route PUT /api/card/update_card_order
     * @group Card - Operations about cards.
     * @param {Array.<Card>} cards.required - An array of cards.
     * @returns {Error}  500 - error
     *
     */
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

    /**
     * This function delete a card.
     * @route DELETE /api/card/delete/:id
     * @group Card - Operations about cards.
     * @returns {boolean} 200 - A boolean, true if the card was deleted.
     * @returns {Error}  500 - error
     *
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