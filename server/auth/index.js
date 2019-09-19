const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // console.log('before', req.user)
      req.login(user, err => (err ? next(err) : res.json(user)))
      // console.log('after', req.user)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  console.log('/me requser', req.user)
  console.log('/me reqses', req.session)
  if (req.session.passport) {
    res.json(req.user)
  } else {
    res.json(req.session.user)
  }
})

router.get('/guest', (req, res, next) => {
  console.log('req before', req.user)
  // req.session.user = 'guest'
  console.log('req after', req.user)
  console.log('req session', req.session)

  let guestUser = {guest: true}

  req.login(guestUser, err => (err ? next(err) : res.json(guestUser)))

  // res.send(req.session.user)
})

router.use('/google', require('./google'))
