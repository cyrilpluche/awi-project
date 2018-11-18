const CardHasLabel = require('../config/db_connection').Cardhaslabel
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= CRUD ================= */

    /**
     * @typedef CardHasLabel
     * @property {integer} actionId.required
     * @property {integer} memberId.required
     */

    /**
     * This function create a new CardHasLabel.
     * @route POST /api/card/create_card_has_label
     * @group Card - Operations about cards.
     * @param {integer} actionId.body.required
     * @param {integer} memberId.body.required
     * @param {integer} mhaStatus.body.required
     * @returns {CardHasLabel.model} 200 - New CardHasLabel object.
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        CardHasLabel
            .create(req.body)
            .then(Chl => {
                req.body.result = Chl
                next()
            })
            .catch(error => res.status(400).send(error))
    },

    /**
     * This function delete a CardHasLabel.
     * @route DELETE /api/card/delete_card_has_label
     * @group Card - Operations about cards.
     * @param {integer} actionId.optional
     * @param {integer} memberId.optional
     * @param {integer} mhaStatus.required
     * @returns {CardHasLabel.model} 200 - New CardHasLabel object.
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        CardHasLabel
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