const Boom = require('boom')
const db = require('../models')
const { cors } = require('../config')

module.exports = (server) => {

  /**
   * @api {get} /flights Get flights
   * @apiName GetFlights
   * @apiGroup Flights
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiSuccess {Object[]} flights Collection of flights.
   */
  server.route({
    method: 'GET',
    path: '/v1/flights',
    config: {
      cors
    },
    handler: async (request, reply) => {
      try {
        const Flights = await db.Flight.all({
          include: [{
            model: db.Airport,
            as: 'origin'
          }, {
            model: db.Airport,
            as: 'destination'
          }]
        })
        reply(Flights)
      } catch (err) {
        reply(Boom.conflict(err.errors[0].message))
      }
    }
  })

  /**
   * @api {post} /flights Create a flight
   * @apiName PostFlight
   * @apiGroup Flights
   * @apiVersion 0.1.0
   * @apiPermission token
   *
   * @apiParam {String} name Flight's Name.
   *
   * @apiSuccess {Object} flight Created flight.
   * 
   * @apiError RequireAirportId Airport id is required.
   * @apiError AirportIdNotExist Airport id not exist.
   * @apiError RequireDepartureDate Departure date is required.
   * 
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 422 Unprocessable Entity
   *   {
   *     "statusCode": 422,
   *     "error": "Unprocessable Entity",
   *     "message": "Airport is required"
   *   }
   */
  server.route({
    method: 'POST',
    path: '/v1/flights',
    config: {
      cors
    },
    handler: async (request, reply) => {
      try {
        const Flight = await db.Flight.create(request.payload)
        reply(Flight)
      } catch (err) {
        console.log(err)
        if (err.errors) {
          reply(Boom.badData(err.errors[0].message))
        } else if (err.parent.errno === 1452) {
          reply(Boom.badData('Airport id not exist'))
        }
      }
    }
  })
}
