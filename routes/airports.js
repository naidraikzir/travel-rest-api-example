const Boom = require('boom')
const db = require('../models')
const { cors } = require('../config')

module.exports = (server) => {

  /**
   * @api {get} /airports Get airports
   * @apiName GetAirports
   * @apiGroup Airports
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiSuccess {Object[]} airports Collection of airports.
   */
  server.route({
    method: 'GET',
    path: '/v1/airports',
    config: {
      cors
    },
    handler: async (request, reply) => {
      try {
        const Airports = await db.Airport.all({
          include: [{
            model: db.City,
            as: 'city'
          }]
        })
        reply(Airports)
      } catch (err) {
        reply(Boom.conflict(err.errors[0].message))
      }
    }
  })

  /**
   * @api {post} /airports Create a airport
   * @apiName PostAirport
   * @apiGroup Airports
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiParam {String} name Airport's Name.
   *
   * @apiSuccess {Object} airport Created airport.
   * 
   * @apiError RequireCityId City id is required.
   * @apiError CityIdNotExist City id not exist.
   * 
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 422 Unprocessable Entity
   *   {
   *     "statusCode": 422,
   *     "error": "Unprocessable Entity",
   *     "message": "City is required"
   *   }
   */
  server.route({
    method: 'POST',
    path: '/v1/airports',
    config: {
      cors
    },
    handler: async (request, reply) => {
      try {
        const Airport = await db.Airport.create(request.payload)
        reply(Airport)
      } catch (err) {
        if (err.errors) {
          reply(Boom.badData(err.errors[0].message))
        } else if (err.parent.errno === 1452) {
          reply(Boom.badData('City id not exist'))
        }
      }
    }
  })
}
