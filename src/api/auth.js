const express = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const router = express.Router()

const User = require('../models/User')

// @route POST api/auth
// @desc authenticate the user
// @access public

router.post('/', (req, res) => {
  const { email, password } = req.body

  if (!password || !email) {
    res.status(400).json({ msg: 'Please enter all fields' })
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User does not exist' })

    // Validate pw
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })

      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err3, token) => {
          if (err3) throw err3
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          })
        }
      )
    })
  })
})

// @route GET api/auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user))
})

module.exports = router
