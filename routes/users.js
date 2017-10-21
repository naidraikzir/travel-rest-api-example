const Boom = require('boom')
const Bcrypt = require('bcrypt')
const db = require('../models')
const { cors } = require('../config')
const saltRounds = 10

module.exports = (server) => {

  /**
   * @api {post} /users Create a user
   * @apiName PostUser
   * @apiGroup Users
   * @apiVersion 0.1.0
   * @apiPermission none
   *
   * @apiParam {String} name User's Name.
   * @apiParam {String} email User's unique Email.
   * @apiParam {String} password User's Password.
   *
   * @apiSuccess {Object} user Created user.
   * 
   * @apiError EmailMustBeUnique Email has been used.
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 409 Conflict
   *   {
   *     "statusCode": 409,
   *     "error": "Conflict",
   *     "message": "email must be unique"
   *   }
   */
  server.route({
    method: 'POST',
    path: '/v1/users',
    config: {
      auth: false,
      cors
    },
    handler: async (request, reply) => {
      const { name, email } = request.payload
      let password = await Bcrypt.hash(request.payload.password, saltRounds)

      try {
        const User = await db.User.create({
          name, email, password
        })
        reply(User)
      } catch (err) {
        reply(Boom.conflict(err.errors[0].message))
      }
    }
  })
}
