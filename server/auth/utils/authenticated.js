// middleware factory to ensure that
// requests going into current route are
// authenticated.
// if { adminOnly } is true, then route
// is accessible only to admins.
const authenticated = ({adminOnly} = {}) => (req, res, next) => {
  if (!req.user) {
    res.status(401).send('Must be logged in')
    return
  } else if (adminOnly && !req.user.adminStatus) {
    res.status(403).send('Unauthorized')
    return
  }

  next()
}

module.exports = {authenticated}
