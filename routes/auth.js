const Boom = require('boom')
const Bcrypt = require('bcrypt')
const db = require('../models')
const { cors } = require('../config')
const JWT = require('jsonwebtoken')
const secret = process.env.SECRET

const sign = (user) => JWT.sign({
  email: user.email,
  password: user.password
}, secret, {
  expiresIn: '2h'
})

module.exports = (server) => {

  /**
   * @api {post} /authenticate Authenticate and get token
   * @apiName PostAuthenticate
   * @apiGroup Auth
   * @apiVersion 0.1.0
   * @apiPermission none
   *
   * @apiParam {String} email Users unique Email.
   * @apiParam {String} password Users Password.
   *
   * @apiSuccess {String} token Access token.
   * 
   * @apiError InvalidCredentials Email or Password not valid.
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 401 Unauthorized
   *   {
   *     "statusCode": 401,
   *     "error": "Unauthorized",
   *     "message": "Invalid credentials"
   *   }
   */
  server.route({
    method: 'POST',
    path: '/v1/authenticate',
    config: {
      auth: false,
      cors
    },
    handler: async (request, reply) => {
      const { email, password } = request.payload

      try {
        const user = await db.User.findOne({
          where: {
            email
          }
        })

        if (!user) {
          reply(Boom.unauthorized('Invalid credentials'))
          return
        }

        Bcrypt.compare(password, user.password, (err, success) => {
          if (!success) {
            reply(Boom.unauthorized('Invalid credentials'))
            return
          }

          reply({ token: sign(user) })
        })
      } catch (err) {
        console.error(err.message)
        reply(Boom.badImplementation(err.message))
      }
    }
  })
}
