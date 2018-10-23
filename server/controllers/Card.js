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
            .then(card => res.status(201).send(card))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/card/find_all
     *
     *  return: Array of Card objects.
     */
    findAll(req, res, next) {
        Card
            .findAll({ order : sequelize.col('cardId')})
            .then(cards => res.status(201).send(cards))
            .catch(error => res.status(400).send(error));
    },

    /*  localhost:4200/api/card/find_one/:id
     *
     *  return: Card object with the given id.
     */
    findOne(req, res, next) {
        Card
            .findOne({
                where: {
                    cardId : req.params.id
                }
            })
            .then(card => res.status(201).send(card))
            .catch(error => res.status(400).send(error));
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
                res.status(201).send(isUpdated[0] === 1)
            })
            .catch(error => res.status(400).send(error));
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
            .then(isDeleted => res.status(201).send(isDeleted === 1))
            .catch(error => res.status(400).send(error));
    }
}