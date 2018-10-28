var Card = require('../config/db_connection').Card;
var sequelize = require('../config/db_connection').sequelize;

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

    /*  localhost:4200/api/card/find_one --- ?cardTitle=title... (optional)
     *
     *  return: Card object with given attributes.
     */
    findOne(req, res, next) {
        Card
            .findOne({ where: req.query })
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

    /*  localhost:4200/api/card/delete/:id
     *
     *  return: A boolean. true = deleted, false = no deleted.
     */
    delete(req, res, next) {
        Card
            .destroy({
                where: {
                    cardId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error))
    }
}