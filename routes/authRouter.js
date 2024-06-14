const express = require('express')
const authRouter = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

//signup
authRouter.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username.toLowerCase()}) 
    if(user){
      res.status(403)
      return next(new Error('That username is already taken'))
    }
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
    return res.status(201).send({ token, user: savedUser.withoutPassword() })
  } catch (err) {
    res.status(500)
    return next(err)
  }
})

// login
authRouter.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username.toLowerCase()}) 
    if(!user){
      res.status(403)
      return next(new Error('Username or Password is incorrect'))
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if(err || !isMatch){
        res.status(403)
        return next(new Error('Username or Password is incorrect'))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })  
    })
  } catch (error) {
    res.status(500)
    return next(err)
  }
})

module.exports = authRouter