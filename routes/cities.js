const Boom = require('boom')
const db = require('../models')
const { cors } = require('../config')

module.exports = (server) => {

  /**
   * @api {get} /cities Get cities
   * @apiName GetCities
   * @apiGroup Cities
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiSuccess {Object[]} cities Collection of cities.
   */
  server.route({
    method: 'GET',
    path: '/v1/cities',
    config: {
      cors
    },
    handler: async (request, reply) => {
      try {
        const Cities = await db.City.all()
        reply(Cities)
      } catch (err) {
        reply(Boom.conflict(err.errors[0].message))
      }
    }
  })

  /**
   * @api {post} /cities Create a city
   * @apiName PostCity
   * @apiGroup Cities
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiParam {String} name City's Name.
   *
   * @apiSuccess {Object} city Created city.
   */
  server.route({
    method: 'POST',
    path: '/v1/cities',
    config: {
      cors
    },
    handler: async (request, reply) => {
      const { name } = request.payload

      try {
        const City = await db.City.create({ name })
        reply(City)
      } catch (err) {
        reply(Boom.conflict(err.errors[0].message))
      }
    }
  })
}
