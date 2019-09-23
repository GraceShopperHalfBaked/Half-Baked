const {Order} = require('../../db/models')

// [TO-DO]: break this middleware generator up.
const validateOwnership = ({
  validateCurrentOwner,
  validateCurrentOrder
  // eslint-disable-next-line complexity
} = {}) => async (req, res, next) => {
  if (!validateCurrentOrder && !validateCurrentOwner) {
    throw new Error(
      'validateOwnership(...) middleware generator must specify at least one of its parameters (validateCurrentOwner, validateCurrentOrder) to be true.'
    )
  }

  const {id: userId, adminStatus} = req.user || {}

  if (!userId) {
    // if no userId is specified
    // probably throw a 401
    res.status(401).send('Must be logged in')
    return
  }

  // for now, give admins access to everything
  if (adminStatus) {
    next()
    return
  }

  // use this for routes that take userId as a parameter in the
  // url. checks to see that the current user is in fact the user
  // specified in the parameter.
  // NOTE: this assumes the user parameter is called :userId
  if (validateCurrentOwner) {
    if (+req.params.userId !== userId) {
      // current user is trying to access user information that
      // isn't their own.
      res.status(403).send('Unauthorized')
      return
    }

    next()
    return
  }

  // test to see if current user owns the order
  // if not :(
  const {orderId} = req.params

  if (!orderId) {
    // if an orderId is not specified
    // probably throw a 400
    res.status(400).send('Must specify orderId')
    return
  }

  const order = await Order.findOne({
    where: {
      id: orderId,
      userId
    }
  })

  if (!order) {
    // if user does not own current order
    // throw a 403
    res.status(403).send('Unauthorized')
    return
  }

  next()
}

module.exports = {validateOwnership}
