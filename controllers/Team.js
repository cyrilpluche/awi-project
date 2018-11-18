const helper = require('../helpers/helpersMethod');
const Team = require('../config/db_connection').Team;
const TeamHasMember = require('../config/db_connection').TeamHasMember
const sequelize = require('../config/db_connection').sequelize;

module.exports = {

    /* ================= Team CONTROLLER ================= */

    /**
     * @typedef Team
     * @property {integer} teamId.required
     * @property {string} teamName.required
     *
     */

    /**
     * This function create a new Team.
     * @route POST /api/team/create
     * @group Team - Operations about team.
     * @param {string} teamName.required
     * @returns {Team.model} 200 - A new Team created.
     * @returns {Error}  500 - error
     *
     */
    create(req, res, next) {
        Team
            .create(req.body)
            .then(team => {
                req.body.result = team
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function find all the teams matching
     * @route GET /api/team/find_all
     * @group Team - Operations about team.
     * @param {string} teamName.optional
     * @returns {Array.<Team>} 200 - All the teams matching.
     * @returns {Error}  500 - error
     *
     */
    findAll(req, res, next) {
        Team
            .findAll({
                order : sequelize.col('teamId'),
                where: req.query
            })
            .then(teams => {
                req.body.result = teams
                next()
            })
            .catch(error => next(error));
    },

    /**
     * This function find all the teams of a member.
     * @route GET /api/team/find_all
     * @group Team - Operations about team.
     * @param {integer} memberId
     * @returns {Array.<Team>} 200 - All the teams of the given member.
     * @returns {Error}  500 - error
     *
     */
    findAllTeamMember (req, res, next) {
        TeamHasMember.findAll({
            where: {member_id: req.params.member},
            include: [
                {
                    model: Team,
                    as: 'Team'

                }
            ]
        })
            .then(result => {
                let teams = [];

                for (let i = 0; i < result.length; i++){
                    teams.push(
                        helper.flatTeams(result[i])
                    )
                }
                res.send(teams)
            })
    },

    /**
     * This function find a team.
     * @route GET /api/team/find_one/:id
     * @group Team - Operations about team.
     * @returns {Array.<Team>} 200 - The team found.
     * @returns {Error}  500 - error
     *
     */
    findOne(req, res, next) {
        Team
            .findOne({ where: req.query })
            .then(team => {
                req.body.result = team
                next()
            })
            .catch(error => next(error));
    },

    /**
     * This function update a team.
     * @route PUT /api/team/update/:id
     * @group Team - Operations about team.
     * @param {integer} teamId.required
     * @param {string} teamName.body.optional
     * @returns {boolean} 200 - Boolean, true if the team was updated.
     * @returns {Error}  500 - error
     *
     */
    update(req, res, next) {
        Team
            .update(req.body, {
                where: { teamId: req.params.id }
            })
            .then(isUpdated => {
                req.body.result = isUpdated[0] === 1
                next()
            })
            .catch(error => next(error))
    },

    /**
     * This function delete a team.
     * @route DELETE /api/team/delete/:id
     * @group Team - Operations about team.
     * @returns {boolean} 200 - Boolean, true if the team was deleted.
     * @returns {Error}  500 - error
     *
     */
    delete(req, res, next) {
        Team
            .destroy({
                where: {
                    teamId: req.params.id
                }
            })
            .then(isDeleted => {
                req.body.result = isDeleted === 1
                next()
            })
            .catch(error => next(error));
    }
}