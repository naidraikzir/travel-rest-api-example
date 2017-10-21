const db = require('../models')

module.exports = async (decoded, request, callback) => {
  const { email, password } = decoded

  try {
    const user = await db.User.findOne({
      where: { email, password }
    })
    if (!user) {
      callback(null, false)
      return
    }

    callback(null, true)
  } catch (err) {
    console.error(err.message)
  }
}
